import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: 'Test Data',
    initialState:{
        Testdata: null
    },
    reducers:{
        addData : (state,action)=>{
            state.Testdata = action.payload
        }
    }
});

export const {addData} = dataSlice.actions;

export default dataSlice.reducer;