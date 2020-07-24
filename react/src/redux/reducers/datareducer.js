import {SET_STREAMS,LIKE_STREAM,UNLIKE_STREAM,LOADING_DATA,DELETE_STREAM, POST_STREAM,SET_STREAM, SUBMIT_COMMENT} from '../type'

const initialState = {
  loading:false,
  streams:[],
  stream:{}
}

export default (state = initialState, action ) => {
    switch (action.type) {

    case LOADING_DATA:
        return { ...state, loading:true }
    case SET_STREAMS:
     
        return {
            ...state,
            loading:false,
            streams:action.payload
        }
    case LIKE_STREAM,UNLIKE_STREAM:
        let index=state.streams.findIndex(stream=>stream.setid===action.payload.streamid)
        state.streams[index]=action.payload
      
        if (state.stream.streamid===action.payload.streamid){
               state.stream=action.payload
           
           }
        return{
            
            ...state
        }
    case DELETE_STREAM:
        let indexd=state.streams.findIndex(stream=>stream.setid===action.payload)
        state.streams.splice(indexd,1)
        return{
            
            ...state
        }
    case POST_STREAM:
        console.log(action.payload)
        return{
          ...state,
          streams:[action.payload,...state.streams]
        }
    case SET_STREAM:
       
        return {
            ...state,stream:action.payload
        }
    case SUBMIT_COMMENT:
        return {
            ...state,
            stream:{
                ...state.stream,
                comments:[
                    action.payload,...state.stream.comments
                ]
            }
        }
    
    default:
        return state
    }
}
