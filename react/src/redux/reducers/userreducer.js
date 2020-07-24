import {LOADING_UI,SET_USER,SET_ERRORS,CLEAR_ERRORS,SET_AUTHENTICATED,SET_UNAUTHENTICATED,LOADING_USER,LIKE_STREAM,UNLIKE_STREAM, MARK_NOTIFICATIONS_READ} from '../type'

const initialState = {
  likes:[],notification:[],authenticated:false,credentials:{},loading:false
}

export default (state = initialState, action) => {
    switch (action.type) {

    case SET_AUTHENTICATED:
        return { ...state, authenticated:true}
    case SET_UNAUTHENTICATED:
        return initialState
    case SET_USER:
        return {authenticated:true,...action.payload}
    case LOADING_USER:
        return{...state,loading:true}
    case LIKE_STREAM:
        
        return {
            ...state,likes:[ ...state.likes ,{
                userhandle:state.credentials.handle,
                streamid:action.payload.streamid
            }]
        }
    case UNLIKE_STREAM:
       
        return {
            ...state,
            likes:state.likes.filter(like=>like.streamid!==action.payload.streamid)
        }
    case MARK_NOTIFICATIONS_READ:
        state.notification.forEach(not=>(not.read=true))
        console.log(state.notification)
        return {
            ...state
        }
    default:
        return state
    }
}

