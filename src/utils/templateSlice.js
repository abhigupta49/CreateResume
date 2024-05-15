import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
    name: 'Template',
    initialState:{
        templates: {templatesData:[],Datalength:0}
    },
    reducers:{
        addTemplate:(state,action)=>{
            state.templates = action.payload;
        },
        removeTemplate:(state,action)=>{
            const idToRemove = action.payload;
            state.templates.templatesData = state.templates.templatesData.filter(template => template.id !== idToRemove )
            state.templates.Datalength -= 1;
        }
    }
})

export const {addTemplate,removeTemplate} = templateSlice.actions
export default templateSlice.reducer