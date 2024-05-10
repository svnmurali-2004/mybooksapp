
export const initialState={
    loader:false,
    data:null,
    error:null
}
export const dispatchFunction=(state,action)=>{
    switch (action.type) {
        case "FETCH_INIT":
            
            return {...state,loader:true,data:action.payload}
        case "FETCH_SUCCESS":
            return {...state,loader:false,data:action.payload}
        case "FETCH_ERROR":
            return {...state,loader:false,error:action.payload}
        default:
            return state
    }
}

export const loginDetails1=JSON.parse(sessionStorage.getItem('loginDetails'))||{email:"",xtoken:""}
export const dispatchLoginDetails1=(state,action)=>{
    switch (action.type) {
        case "SET_LOGINDETAILS":
            console.log("details updated")
            return {...state,...action.payload}
        case "RESET_LOGINDETAILS":
            sessionStorage.removeItem('loginDetails')
            return {}
        default:
            return state
    }
}

