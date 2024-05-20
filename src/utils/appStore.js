import { configureStore } from "@reduxjs/toolkit";
import userStore from './dataSlice'
import template from './templateSlice'
import filterTemplate from './filterTemplateSlice'
const appStore = configureStore(
    {
        reducer:{
            Data: userStore,
            Template: template,
            Filtertags: filterTemplate
        }
    }
)

export default appStore