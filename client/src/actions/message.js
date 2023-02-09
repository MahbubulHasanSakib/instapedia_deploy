import axios from 'axios'
import Swal from 'sweetalert2'
import {SEND_MESSAGE_REQUEST,SEND_MESSAGE_SUCCES,SEND_MESSAGE_FAILED,
    GET_MESSAGES_REQUEST,GET_MESSAGES_SUCCESS,GET_MESSAGES_FAILED} from '../types'
import {ADD_NEW_MESSAGE} from '../types'
    
    export const getMessages=(rid,currentsender)=>async(dispatch,getState)=>{
        const user=getState().userReducer.userInfo
        try {
            dispatch({type:GET_MESSAGES_REQUEST})
            const config={
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
            const response=await axios.get(`/api/messages/${currentsender}/${rid}`,config)
            dispatch({type:GET_MESSAGES_SUCCESS,payload:response.data})
        } catch (error) {
            dispatch({type:GET_MESSAGES_FAILED,payload:error.message})
        }
    }

    export const sendMessage=(sid,rid,sender,receiver,msg)=>async(dispatch,getState)=>{
        const user=getState().userReducer.userInfo
        try {
            dispatch({type:SEND_MESSAGE_REQUEST})
            const config={
                headers:{
                   'Content-Type':'application/json',
                    Authorization:`Bearer ${user.token}`
                }
               }
               const response=await axios.post(`/api/messages/send/${sid}/${rid}`,{sender,receiver,message:msg},config);
               dispatch({type:SEND_MESSAGE_SUCCES})
        } catch (error) {
            dispatch({type:SEND_MESSAGE_FAILED,payload:error.message})
        }
    }

    export const add_new_message=(msg)=>async(dispatch,getState)=>{
        dispatch({type:ADD_NEW_MESSAGE,payload:msg})
    }