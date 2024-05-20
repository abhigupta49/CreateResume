import React, { useEffect, useState } from 'react'
import {PuffLoader} from "react-spinners"
import { FaTrash, FaUpload } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import { db, storage } from '../config/firebase.config'
import { initialTags } from '../utils/Contstant'
import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import getTemplates from '../config/getTemplate'
import { useDispatch, useSelector } from 'react-redux'
import { addTemplate,removeTemplate } from '../utils/templateSlice'
import { adminIds } from '../Superusers/helpers'
import { useNavigate } from 'react-router-dom'

const CreateTemplate =  () => {
    const [formData,setFormData] = useState({title:"",imageURL: null})
    const [imageAsset,setImageAsset] = useState({isImageLoading:false,imageURl: null, progress: 0})
    const [selectedTags,setSelectedTags] = useState([])
    
    const dispatch = useDispatch()
    const templates = useSelector((store)=>store.Template.templates)
    const templatesLength = templates.Datalength

    const userData  = useSelector(store => store.Data.userLoggedData.data)
    const navigate = useNavigate()
    //fetch All templates Data
    useEffect(()=>{
        const fetchTemplates = async () =>{
            try{
                const templates = await getTemplates(dispatch);
                console.log("Received templates:", templates);
                
                dispatch(addTemplate({templatesData:templates,Datalength:templates.length}))
                
            }catch(error){
                toast.error(('Error fetching templates:', error));
            }
        };
        fetchTemplates()
    },[selectedTags])
    
    // handling the title input field change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prevRec) => ({ ...prevRec, [name]: value }));
    }

    // Handling Image
    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (file && isAllowed(file)) {
            console.log(file);
            setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: true }));
            const storageRef = ref(storage, `Templates/${Date.now()}-${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    setImageAsset((prevAsset) => ({ ...prevAsset, progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 }));
                },
                (error) => {
                    if (error.message.includes("storage/unauthorized")) {
                        toast.error(`Error: Authorization Revoked`);
                    } else {
                        toast.error(`Error: ${error.message}`);
                    }
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageAsset((prevAsset) => ({ ...prevAsset, imageURl: downloadURL }));
                    });
                    toast.success("Image uploaded");
                    setTimeout(() => {
                        setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: false }));
                    }, 2000);
                }
            );
        } else {
            toast.info("Invalid file format");
        }
    };

    // It will check file type validation
    const isAllowed = (file) => {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        return allowedTypes.includes(file.type);
    };

    // action to delete uploaded image
    const deleteImage = () => {
        setTimeout(() => {
            setImageAsset((prevAsset) => ({ ...prevAsset, imageURl: null, progress: 0 }));
            
        }, 1000);
        const deleteRef = ref(storage, imageAsset.imageURl);

        // coming from firebase
        deleteObject(deleteRef)
            .then(() => {
                toast.success("Image removed");
                
            })
            .catch((error) => {
            toast.error(`Error deleting image: ${error.message}`);
        });
    };


    // Selected tags
    const handleSelctedTags = (tag) =>{
        if(selectedTags.includes(tag)){
            setSelectedTags(selectedTags.filter((selected)=>selected!==tag));
        }else{
            setSelectedTags([...selectedTags,tag])
        }
    }
    
    // Save uploaded resume to cloud
    const pushToCloud = async () =>{
        const timeStamp = serverTimestamp()
        const id = `${Date.now()}`
        const _doc = {
            _id : id,
            title : formData.title,
            imageURL:imageAsset.imageURl,
            tags: selectedTags,
            name : templatesLength && templatesLength>0 ? 'Template'+templatesLength+1 : 'Template1',
            timeStamp : timeStamp
        }

        await setDoc(doc(db,"templates",id),_doc)
        .then(()=>{
            setFormData((prevData)=>({...prevData,title:"",imageURL:""}));
            setImageAsset((prevAsset)=>({...prevAsset,imageURl:null}));
            setSelectedTags([]);
            
            

            toast.success("Data pushed to the cloud")
        }).catch((error)=>{
            toast.error(`Error: ${error.message}`)
        })
    }


    // Function to remove data from the cloud
    const removeTemplateData = async (data) =>{
        
        const deleteRef = ref(storage, data?.imageURL);
        try {
            await deleteObject(deleteRef);
            await deleteDoc(doc(db, "templates", data?.id));
            toast.success("Template Deleted from the cloud");
            dispatch(removeTemplate(data.id)); // Dispatch the action to update Redux store
        } catch (err) {
            toast.error(`Error : ${err.message}`);
        }
    }

    useEffect(()=>{
        if(!adminIds.includes(userData?.uid)){
            navigate("/",{replace:true})
        }
    },[])
    
    return (
        <div className='w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12'>
            {/* Start Left Container  */}
            <div className='col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex-1 flex items-center justify-start flex-col gap-4 px-2'>
                <div className='w-full'>
                    <p className='text-lg '>Create a new Template</p>
                </div>

                {/* Template ID Section */}
                <div className='w-full flex items-center justify-end'>
                    <p className='text-base uppercase font-semibold'>
                        TempID: {""}
                    </p>
                    <p className='text-sm capitalize font-bold'>
                        {templatesLength && templatesLength>0 ? 'Template'+ (templatesLength+1) : 'Template1'}
                    </p>
                </div>

                {/* Template tile Section */}
                <input className='w-full px-4 py-3 rounded-md bg-transparent border border-gray-200 text-lg  focus:shadow-md outline-none' type="text" name='title' placeholder='Template Title' value={formData.title} onChange={handleInputChange}/>

                {/* File uploader section*/}
                <div className='w-full bg-gray-100 backdrop-blur-md h-[420px] lg:h-[420px] 2xl:h-[440px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center'>
                {imageAsset.isImageLoading ? (
                    <React.Fragment>
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <PuffLoader color="#36d7b7" />
                            <p>{imageAsset?.progress.toFixed(2)}%</p>
                        </div>
                    </React.Fragment>):(
                    <React.Fragment>
                        {!imageAsset?.imageURl ? (
                        <React.Fragment>
                            <label className='w-full cursor-pointer h-full'>
                                <div className='flex flex-col items-center justify-center h-full w-full'>
                                    <div className='flex items-center justify-center cursor-pointer flex-col gap-4'>
                                        <FaUpload />
                                        <p className='text-lg'>Click to upload</p>
                                    </div>
                                </div>

                                <input type='file' className='w-0 h-0' accept='.jpeg,.jpg.,.png' onChange={handleFileSelect}/>
                            </label>
                        </React.Fragment>):(
                        <React.Fragment>
                            <div className='relative w-full h-full overflow-hidden rounded-md'>
                                <img src={imageAsset?.imageURl} className='w-full h-full object-cover' loading='lazy' alt='uploaded img'/>
                            </div>

                            {/* Delete Button Action */}
                            <div className='absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer'>
                                <FaTrash className='text-sm text-white' onClick={deleteImage}/>
                            </div>
                        </React.Fragment>)}
                    </React.Fragment>
                    )
                }
                </div>

                {/* tags */}
                <div className='w-full flex items-center flex-wrap gap-2'>
                    {initialTags.map((tag,i)=>(
                        <div key={i} className={`border border-gray-300 px-2 py-1 rounded-md cursor-pointer ${selectedTags.includes(tag)?"bg-blue-500 text-white":""}`} onClick={()=>handleSelctedTags(tag)}>
                            <p className='text-xs'>{tag}</p>
                        </div>
                    ))}
                </div>

                {/* Button Action */}
                <button type='button' className='w-full bg-blue-700 text-white rounded-md py-3' onClick={pushToCloud}>Save</button>

            </div>
            
            {/* End Left Container  */}

            {/* Right Container  */}
            <div className='col-span-12 lg:col-span-8 2xl:col-span-9 px-2 w-full flex-1 py-4'>
                        {templates && templates.templatesData.length>0 ? (
                        <React.Fragment>
                            <div className='w-full h-full grid gird-cols-2 lg:grid-cols-2 2xl:grid-cols-2 gap-4'>
                                {templates.templatesData.map((template)=>
                                    <div key={template.id} className='w-[80%] h-[350px] 2xl:h-[400px] rounded-md bg-gray-200 overflow-hidden relative'>
                                        <img src={template.imageURL} alt='uploaded template' className='w-full h-full object-contain' />
                                        <div className='absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer' onClick={() => removeTemplateData(template)}>
                                            <FaTrash className='text-sm text-white' />
                                        </div>
                                    </div>
                                
                                
                                )}
                            </div>
                            
                        </React.Fragment>) : (
                        <React.Fragment>
                            <div className='w-full h-full flex flex-col gap-6 items-center justify-center'>
                                <PuffLoader color="#36d7b7" />
                                <p className='text-xl tracking-wider capitalize'>No Data</p>
                            </div>
                        </React.Fragment>)
                        }
            </div>
        </div>
    )
}

export default CreateTemplate