import {SET_STREAMS,LIKE_STREAM,UNLIKE_STREAM,LOADING_DATA,DELETE_STREAM,LOADING_UI, POST_STREAM,SET_ERRORS,CLEAR_ERRORS,SET_STREAM,STOP_LOADING_UI,SUBMIT_COMMENT} from '../type'
import axios from 'axios'

export const getstreams=()=>dispatch=>{
    dispatch({type:LOADING_DATA})
    axios.get('/streams').then(res=>{
        dispatch({
            type:SET_STREAMS,
            payload:res.data
        })
    }).catch((err)=>{
        dispatch({
            type:SET_STREAMS,
            payload:[]
        })
    })
}

export const likestream=id=>dispatch=>{
    axios.get(`/streams/${id}/like`).then(res=>{
        dispatch({
            type:LIKE_STREAM,
            payload:res.data
        })
     
    }).catch(err=>console.log(err))
}
export const unlikestream=id=>dispatch=>{
    axios.get(`/streams/${id}/unlike`).then(res=>{
        dispatch({
            type:UNLIKE_STREAM,
            payload:res.data
        })
    }).catch(err=>console.log(err))
}
export const commentstream=(id,commentdata)=>dispatch=>{
    axios.post(`/streams/${id}/comments`,commentdata).then(res=>{
        dispatch({
            type:SUBMIT_COMMENT,
            payload:res.data
        })
        dispatch({type:CLEAR_ERRORS})
    }).catch(err=> {dispatch({
        type:SET_ERRORS,
        payload:err.response.data
    })})
}
export const deletestream=id=>dispatch=>{
    axios.delete(`/streams/${id}`).then(res=>{
        dispatch({
            type:DELETE_STREAM,
            payload:id
        })
    }).catch(err=>console.log(err))}


export const poststream=data=>dispatch=>{
    dispatch({type:LOADING_UI})
  
    axios.post('/create',data).then(res=>{
        dispatch({
            type:POST_STREAM,
            payload:res.data
        })
        dispatch({type:CLEAR_ERRORS})
    }).catch(err=>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })



}
export const getstream=id=>dispatch=>{
    dispatch({type:LOADING_UI})
    axios.get(`/streams/${id}`).then(res=>{
        dispatch({
            type:SET_STREAM,
            payload:res.data
        })
        dispatch({type:STOP_LOADING_UI})
    }).catch(err=>console.log(err.response.data))
}
export const userdetails=handle=>dispatch=>{
    axios.get(`/user/${handle}`).then((res)=>{
        dispatch({
            type:SET_STREAMS,
            payload:res.data.stream
        })
    }).catch(err=>{
        dispatch({
            type:SET_STREAMS,
            payload:null
        })
    })
}