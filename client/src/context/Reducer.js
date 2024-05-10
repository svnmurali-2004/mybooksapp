import axios from 'axios'
import React, { useEffect } from 'react'
import { useReducer } from 'react'
const initialState={
    loading:true,
    data:null,
    error:null
}

const dispatcher=(state,action)=>{
    switch (action.type) {
        case "FETCH_INIT":
            return {...state,loading:true,data:action.payload}
        case "FETCH_SUCCESS":
            return {...state,loading:false,data:action.payload,error:null}
        case "FETCH_ERROR":
            return {...state,loading:false,data:action.payload,error:action.payload}
        default:
            return state
    }
}



const Reducer = () => {
    const [state,dispatch]=useReducer(dispatcher,initialState)
    
    const run=async()=>{
        try{
            dispatch({type:"FETCH_INIT",payload:"fetching started"})
         axios.get("https://jsonplaceholder.tpicode.com/posts").then((response)=>{dispatch({type:"FETCH_SUCCESS",payload:response.data})}).catch((err)=>{dispatch({type:"FETCH_ERROR",payload:"error occured"})})
        }catch(error){
            dispatch({type:"FETCH_ERROR",payload:"error occured"})
        }
        
    }
useEffect(()=>{
    run();
},[])
  return (
    <div>
        {state.loading && (
    <div className=' absolute bg-black bg-opacity-50 h-screen w-screen flex justify-center items-center'>
        <div>
            <img className="h-24 mx-auto" src={"/1481.gif"} alt='loader' />
        </div>
    </div>
)}


        {!state.loading && !state.error &&(
    <div>
        {state.data.map(item => (
            <div key={item.id}>
                <p>User ID: {item.userId}</p>
                <p>Title: {item.title}</p>
                <p>Body: {item.body}</p>
            </div>
        ))}

        
    </div>
)}
        {!state.loading && state.error&&(
    <div>
        error occured

        
    </div>
)}

    </div>
  )
}

export default Reducer
