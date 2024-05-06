import { configureStore } from "@reduxjs/toolkit";
import dataType from './dataSlice'
const appStore = configureStore(
    {
        reducer:{
            Data: dataType
        }
    }
)

export default appStore