
import {SEND_MESSAGE_REQUEST,SEND_MESSAGE_SUCCES,SEND_MESSAGE_FAILED,
GET_MESSAGES_REQUEST,GET_MESSAGES_SUCCESS,GET_MESSAGES_FAILED} from '../types'
import {ADD_NEW_MESSAGE} from '../types'
export const messageReducer=(state={messages:[]},action)=>{
    switch (action.type) {
        case GET_MESSAGES_REQUEST:
            return { ...state, loading: true }
        case GET_MESSAGES_SUCCESS:
            return { ...state, messages: action.payload, loading: false }
        case GET_MESSAGES_FAILED:
            return { ...state, error: action.payload, loading: false }
        
        case SEND_MESSAGE_REQUEST:
            return { ...state }
        case SEND_MESSAGE_SUCCES:
            return { ...state, loading: false }
        case SEND_MESSAGE_FAILED:
            return { ...state, error: action.payload, loading: false }
        case ADD_NEW_MESSAGE:
            console.log("action"+action.payload)
            return {...state,messages:[...(state.messages),action.payload],loading:false}
        default: return state;
    }
}