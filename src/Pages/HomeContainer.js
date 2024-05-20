import React, { useEffect } from 'react';
import Filters from '../components/Filters';
import { toast } from 'react-toastify';
import getTemplates from '../config/getTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { PuffLoader } from 'react-spinners';
import TemplatesDesignPin from './TemplatesDesignPin';

const HomeContainer = () => {
    const dispatch = useDispatch();
    const templatesData = useSelector(store => store.Template.templates.templatesData);

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                await getTemplates(dispatch);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchTemplate();
    }, [dispatch]);

    return (
        <>
            {templatesData.length !== 0 ? (
                <div className='w-full px-4 lg:px-12 py-6 flex flex-col items-center justify-start'>
                    {/* Filter Section */}
                    <Filters />

                    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-2'>
                        <RenderTemplate templates={templatesData} />
                    </div>
                </div>
            ) : (
                <p>No Data Found</p>
            )}
        </>
    );
};

const RenderTemplate = React.memo(({ templates }) => {
    
    return (
        <React.Fragment>
            {templates && templates.length > 0 ? (
                <React.Fragment>
                    {templates.map((template, index) => {
                        // Here you can render each template item
                        return (
                            <TemplatesDesignPin key={templates?.id} data={template} index={index}/>
                        );
                    })}
                </React.Fragment>
            ) : (
                <p>No Data Found</p>
            )}
        </React.Fragment>
    );
});

export default HomeContainer;
