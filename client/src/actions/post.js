import {GET_POSTS_REQUEST_SUCCESS,GET_POSTS_REQUEST_FAILED,GET_POSTS_REQUEST_SEND} from '../types'
import {ADD_COMMENT_REQUEST,ADD_COMMENT_SUCCESS,ADD_COMMENT_FAILED} from '../types'
import {CREATE_POST_REQUEST,CREATE_POST_SUCCESS,CREATE_POST_FAILED} from '../types'
import {LIKE_REQUEST_SEND,LIKE_SUCCESS,LIKE_FAILURE} from '../types'
import {SINGLE_USER_POSTS_REQUEST,SINGLE_USER_POSTS_SUCCESS,SINGLE_USER_POSTS_FAILED} from '../types'
import {CREATE_STORY_REQUEST,CREATE_STORY_SUCCESS,CREATE_STORY_FAILED,
GET_STORIES_REQUEST,GET_STORIES_SUCCESS,GET_STORIES_FAILED} from '../types'

import axios from 'axios'

export const fetchPosts=()=>async(dispatch,getState)=>
{
    try {
        dispatch({type:GET_POSTS_REQUEST_SEND})
        const user=getState().userReducer.userInfo
        const config={
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        }
        const response=await axios.get('/api/posts',config);
        dispatch({type:GET_POSTS_REQUEST_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:GET_POSTS_REQUEST_FAILED,payload:error.message})
    }
}
export const fetchStories=()=>async(dispatch,getState)=>{
    try {
        dispatch({type:GET_STORIES_REQUEST})
        const user=getState().userReducer.userInfo
        const config={
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        }
        const response=await axios.get('/api/stories',config);
        dispatch({type:GET_STORIES_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:GET_STORIES_FAILED,payload:error.message})
    }
}
export const fetchSingleUserPosts=(uid)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    try {
        dispatch({type:SINGLE_USER_POSTS_REQUEST})
        const config={
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        }
        const response=await axios.get(`/api/posts/${uid}`,config);
        dispatch({type:SINGLE_USER_POSTS_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:SINGLE_USER_POSTS_FAILED,payload:error.message})
    }
}

export const addComment=(postId,commentText)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    try {
        dispatch({type:ADD_COMMENT_REQUEST})
     const config={
         headers:{
            'Content-Type':'application/json',
             Authorization:`Bearer ${user.token}`
         }
        }
        const response=await axios.post(`/api/posts/${postId}/comment`,{comment:commentText},config);
        dispatch({type:ADD_COMMENT_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:ADD_COMMENT_FAILED,payload:error.message})
    }
}

export const createPost=(formData)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    try {
        dispatch({type:CREATE_POST_REQUEST})
     const config={
         headers:{
            'Content-Type':'application/json',
             Authorization:`Bearer ${user.token}`
         }
        }
        const response=await axios.post('/api/posts/create',formData,config);
        dispatch({type:CREATE_POST_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:CREATE_POST_FAILED,payload:error.message})
    }
}

export const createStory=(formData)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    try {
        dispatch({type:CREATE_STORY_REQUEST})
     const config={
         headers:{
            'Content-Type':'application/json',
             Authorization:`Bearer ${user.token}`
         }
        }
        const response=await axios.post('/api/stories/',formData,config);
        dispatch({type:CREATE_STORY_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:CREATE_STORY_FAILED,payload:error.message})
    }
}

export const likePost=(postId)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    try {
        dispatch({type:LIKE_REQUEST_SEND})
     const config={
         headers:{
            'Content-Type':'application/json',
             Authorization:`Bearer ${user.token}`
         }
        }
        const response=await axios.post('/api/posts/like',{pid:postId},config);
        dispatch({type:LIKE_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:LIKE_FAILURE,payload:error.message})
    }
}