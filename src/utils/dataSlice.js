import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: 'User Data',
    initialState:{
        userLoggedData: {loading:true,data:[]}
    },
    reducers:{
        addData : (state,action)=>{
            state.userLoggedData = action.payload
        }
    }
});

export const {addData} = dataSlice.actions;

export default dataSlice.reducer;