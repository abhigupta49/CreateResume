import { createSlice } from "@reduxjs/toolkit";

const filterTemplateSlice = createSlice({
    name: 'Filter Slice',
    initialState: {
        FilterData: {Data:null,searchText:null}
    },
    reducers:{
        addFilterTag:(state,action)=>{
            state.FilterData = action.payload;
        }
    }
})

export const {addFilterTag} = filterTemplateSlice.actions;
export default filterTemplateSlice.reducer