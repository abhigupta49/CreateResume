import { configureStore } from "@reduxjs/toolkit";
import userStore from './dataSlice'
const appStore = configureStore(
    {
        reducer:{
            Data: userStore
        }
    }
)

export default appStore