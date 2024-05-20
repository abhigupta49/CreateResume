import {FaGoogle,FaGithub} from "react-icons/fa6"
import {easeInOut} from 'framer-motion'
export const AuthButton = {
    Google: {
        Icon: FaGoogle,
        label: "Signin with Google",
        provider: "GoogleAuthProvider"
    },
    Github:
    {
        Icon: FaGithub,
        label: "Signin with Github",
        provider: "GitHubAuthProvider"
    }
}

export const initialTags = [
    "Software Engineer",
    "Front-end Developer",
    "Back-end Developer",
    "Full-stack Developer",
    "Mobile App Developer",
    "Web Designer",
    "UI/UX Designer",
    "Product Manager",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Cloud Architect",
    "QA Engineer",
    "Game Developer",
    "Embedded Systems Engineer",
    "Cybersecurity Analyst",
    "Network Engineer",
    "Database Administrator",
    "IT Consultant",
    "System Administrator"
];

export const transformedTags = initialTags.map((tag, index) => ({
    id: index.toString(), // You can use index as id, but if you have unique ids for tags, use them instead
    label: tag,
    value: tag
}));

export const scaleInOut = (index) =>{
    return{
        initial:{opacity:0,scale:0.85},
        animate:{opacity:1,scale:1},
        exit:{opacity:0,scale:0.85}, 
        transition:{delay:index * 0.3, ease: easeInOut}
    }
}

export const FadeInOutMotion = () =>{
    return{
        initial:{opacity:0,scale:0.85},
        animate:{opacity:1,scale:1},
        exit:{opacity:0,scale:0.85}, 
        transition:{ease: easeInOut}
    }
}
