
import { toast } from "react-toastify";



export const success = (name) => toast.success(`Hi, ${name} You are in`, {
    style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#f1f1f1',
    },
    iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
    },
});