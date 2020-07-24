import {LOADING_UI,SET_USER,SET_ERRORS,CLEAR_ERRORS,SET_UNAUTHENTICATED,LOADING_USER,MARK_NOTIFICATIONS_READ} from '../type'
import axios from 'axios'

export const loginuser=(userdata,history)=>dispatch=>{
    dispatch({type:LOADING_UI})
    axios.post('/login',userdata).then(res=>{
        const token=`Bearer ${res.data.id}`
        localStorage.setItem("FBidtoken",token)
        axios.defaults.headers.common['Authorization']=token
        dispatch({type:CLEAR_ERRORS})
        dispatch(getuser())
        history.push('/')
    }).catch(err=>{
        
       dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })
}
export const uploadimage=formdata=>dispatch=>{
    dispatch({type:LOADING_USER})
    axios.post('/user/image',formdata).then((res)=>{
      
        dispatch(getuser())
    }).catch(err=>{
        console.log(err)
    })
}
export const getuser=()=>dispatch=>{
    dispatch({type:LOADING_USER})
    axios.get('/user').then((res)=>{
        dispatch({
            type:SET_USER,
            payload:res.data
        })
    }).catch(err=>console.log(err))
}

export const signupuser=(newuserdata,history)=>dispatch=>{
    dispatch({type:LOADING_UI})
    axios.post('/signup',newuserdata).then(res=>{
        const token=`Bearer ${res.data.token}`
        localStorage.setItem("FBidtoken",token)
        axios.defaults.headers.common['Authorization']=token
        dispatch({type:CLEAR_ERRORS})
        dispatch({type:SET_USER})
        
        history.push('/')
    }).catch(err=>{
        
       dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })
}
export const logout=()=>dispatch=>{
    localStorage.removeItem('FBidtoken')
    delete axios.defaults.headers.common['Authorization']
     dispatch({type:SET_UNAUTHENTICATED})
}

export const editdetails=(userdetails)=>dispatch=>{
    dispatch({type:LOADING_USER})
    axios.post('/user',userdetails).then(res=>{
        dispatch(getuser())
    }).catch(err=>console.log(err))
}

export const marknotify=ids=>dispatch=>{
   
    axios.post('/notification',ids).then(res=>{(
        dispatch({type:MARK_NOTIFICATIONS_READ})
    )}).catch(err=>console.log(err))
    
}