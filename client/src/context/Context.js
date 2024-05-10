import { useContext,createContext,useReducer } from "react";
import {initialState,dispatchFunction} from "./reducers";
import { loginDetails1,dispatchLoginDetails1 } from "./reducers";

const LoaderContexts=createContext()

export const LoaderProvider=({children})=>{
    const [loader,loaderDispatcher]=useReducer(dispatchFunction,initialState)
    const [loginDetails,loginDetailsDispatcher]=useReducer(dispatchLoginDetails1,loginDetails1)

    return(
    <LoaderContexts.Provider value={{loader,loaderDispatcher,loginDetails,loginDetailsDispatcher}}>
        {children}
    </LoaderContexts.Provider>)


}

export const  useLoader = ()=>useContext(LoaderContexts)
