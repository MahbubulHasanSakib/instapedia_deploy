import axios from 'axios'
import Swal from 'sweetalert2'
const { LOGIN_FAILURE, LOGIN_REQUEST_SEND, LOGIN_SUCCESS, LOGOUT ,
REGISTER_FAILURE,REGISTER_SUCCESS,REGISTER_REQUEST_SEND,RESET_REGISTER_ALERTS} = require('../types')

const {USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_FAILED,
USER_DETAILS_RESET,USER_DETAILS_UPDATE_REQUEST,USER_DETAILS_UPDATE_SUCCESS,
USER_DETAILS_UPDATE_FAILED,RESET_UPDATE_ALERTS}=require('../types')

const {SHOW_PROFILE_REQUEST,SHOW_PROFILE_SUCCESS,SHOW_PROFILE_FAILED} =require('../types')

const {FOLLOW_UNFOLLOW_REQUEST_SEND,FOLLOW_UNFOLLOW_REQUEST_SUCCESS,
FOLLOW_UNFOLLOW_REQUEST_FAILED} =require('../types')

const {GET_USERS_REQUEST,GET_USERS_SUCCESS,GET_USERS_FAILED,SEARCH_USER}=require('../types')
const {GET_FOLLOWERS_REQUEST,GET_FOLLOWERS_SUCCESS,GET_FOLLOWERS_FAILED}=require('../types')

const {GET_FOLLOWINGS_REQUEST,GET_FOLLOWINGS_SUCCESS,GET_FOLLOWINGS_FAILED}=require('../types')

export const userLogin=(email,password)=>async(dispatch,getState)=>
{
    dispatch({type:LOGIN_REQUEST_SEND})
    try{
    
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const {data}=await axios.post('/api/users/login',{email,password},config)
    console.log(data)
    dispatch({type:LOGIN_SUCCESS,payload:data})
    localStorage.setItem('loggedUser',JSON.stringify(data))
}
catch(error)
{
    console.log(error.response.data)
    dispatch({type:LOGIN_FAILURE,
        payload:error.response.data
    })
}
}

export const userRegistration=(username,name,email,password)=>async(dispatch,getState)=>
{
    dispatch({type:REGISTER_REQUEST_SEND})
    try{
    
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const {data}=await axios.post('/api/users/register',{username,name,email,password},config)
    console.log(data)
    dispatch({type:REGISTER_SUCCESS,payload:data})
    Swal.fire('Congrats','Registration success','success').then(result=>{
        window.location.reload()
    })
}
catch(error)
{
    console.log(error.response.data)
    dispatch({type:REGISTER_FAILURE,
        payload:error.response.data
    })
}
}


export const getAllUsers=()=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:GET_USERS_REQUEST})
    try{
    
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.get('/api/users',config)
    console.log(data)
    dispatch({type:GET_USERS_SUCCESS,payload:data})
}
catch(error)
{
    console.log(error.response.data)
    dispatch({type:GET_USERS_FAILED,
        payload:error.response.data
    })
}
}


export const logout=()=>(dispatch)=>
{
    
    dispatch({type:LOGOUT})
    dispatch({type:USER_DETAILS_RESET})
    localStorage.removeItem('loggedUser')
    
}

export const getUserDetails=()=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:USER_DETAILS_REQUEST})
    try{
    
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.get('/api/users/userProfile',config)
    console.log(data)
    dispatch({type:USER_DETAILS_SUCCESS,payload:data})
}
catch(error)
{
    console.log(error.response.data)
    dispatch({type:USER_DETAILS_FAILED,
        payload:error.response.data
    })
}
}

export const showProfile=(id)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:SHOW_PROFILE_REQUEST})
    try{
    
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.get(`/api/users/showProfile/${id}`,config)
    console.log(data)
    dispatch({type:SHOW_PROFILE_SUCCESS,payload:data})
}
catch(error)
{
    console.log(error.response.data)
    dispatch({type:SHOW_PROFILE_FAILED,
        payload:error.response.data
    })
}
}

export const followUnfollowAction=(id)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:FOLLOW_UNFOLLOW_REQUEST_SEND})
    try{
    
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.get(`/api/users/followUnfollow/${id}`,config)
    console.log(data)
    dispatch({type:FOLLOW_UNFOLLOW_REQUEST_SUCCESS,payload:data})
    
}
catch(error)
{
    console.log(error.response.data)
    dispatch({type:FOLLOW_UNFOLLOW_REQUEST_FAILED,
        payload:error.response.data
    })
}
}



export const updateUserDetails=(name,username,image,website,bio,phone,gender)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:USER_DETAILS_UPDATE_REQUEST})
    try{
    
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.token}`
        }
    }
    const formData=new FormData()
    formData.append("name",name)
    formData.append("username",username)
    formData.append("profilePic",image)
    formData.append("website",website)
    formData.append("bio",bio)
    formData.append("phone",phone)
    formData.append("gender",gender)
    const {data}=await axios.post('/api/users/updateProfile',formData,config)
    console.log(data)
    dispatch({type:USER_DETAILS_UPDATE_SUCCESS,payload:data})
    const updatedUser=getState().userProfileReducer.userDetails;
    const newData={
        _id:updatedUser._id,
        name:updatedUser.name,
        username:updatedUser.username,
        profilePic:updatedUser.profilePic,
        website:updatedUser.website,
        bio:updatedUser.bio,
        phone:updatedUser.phone,
        gender:updatedUser.gender,
        token:user.token
    }
    localStorage.setItem('loggedUser',JSON.stringify(newData))
}
catch(error)
{
    console.log(error.response.data)
    dispatch({type:USER_DETAILS_UPDATE_FAILED,
        payload:error.response.data
    })
}
}

export const searchUser=(searchText)=>(dispatch)=>{
    dispatch({type:SEARCH_USER,payload:searchText})
  }

export const resetUserUpdate=()=>async(dispatch,getState)=>
{
    dispatch({type:RESET_UPDATE_ALERTS})
}

export const resetUserRegInfo=()=>async(dispatch,getState)=>
{
    dispatch({type:RESET_REGISTER_ALERTS})
}

export const showAllFollowers=(id)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:GET_FOLLOWERS_REQUEST})
    try{
    
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.get(`/api/users/getFollowers/${id}`,config)
    console.log(data)
    dispatch({type:GET_FOLLOWERS_SUCCESS,payload:data})
    
}
catch(error)
{
    console.log(error.response.data)
    dispatch({type:GET_FOLLOWERS_FAILED,
        payload:error.response.data
    })
}
}

export const showAllFollowings=(id)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:GET_FOLLOWINGS_REQUEST})
    try{
    
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.get(`/api/users/getFollowings/${id}`,config)
    console.log(data)
    dispatch({type:GET_FOLLOWINGS_SUCCESS,payload:data})
    
}
catch(error)
{
    console.log(error.response.data)
    dispatch({type:GET_FOLLOWINGS_FAILED,
        payload:error.response.data
    })
}
}