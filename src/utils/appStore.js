import { configureStore } from "@reduxjs/toolkit";
import userStore from './dataSlice'
import template from './templateSlice'
const appStore = configureStore(
    {
        reducer:{
            Data: userStore,
            Template: template
        }
    }
)

export default appStore