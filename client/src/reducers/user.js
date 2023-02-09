const { LOGIN_FAILURE, LOGIN_REQUEST_SEND, LOGIN_SUCCESS, LOGOUT,
    REGISTER_FAILURE, REGISTER_REQUEST_SEND, REGISTER_SUCCESS,RESET_REGISTER_ALERTS, FOLLOW_UNFOLLOW_REQUEST_SEND, FOLLOW_UNFOLLOW_REQUEST_SUCCESS, FOLLOW_UNFOLLOW_REQUEST_FAILED } = require('../types')
const { USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAILED,
    USER_DETAILS_RESET, USER_DETAILS_UPDATE_REQUEST, USER_DETAILS_UPDATE_SUCCESS,
    USER_DETAILS_UPDATE_FAILED ,RESET_UPDATE_ALERTS} = require('../types')
const { SHOW_PROFILE_REQUEST, SHOW_PROFILE_SUCCESS, SHOW_PROFILE_FAILED } = require('../types')

const {GET_USERS_REQUEST,GET_USERS_SUCCESS,GET_USERS_FAILED,SEARCH_USER}=require('../types')

const {GET_FOLLOWERS_REQUEST,GET_FOLLOWERS_SUCCESS,GET_FOLLOWERS_FAILED}=require('../types')

const {GET_FOLLOWINGS_REQUEST,GET_FOLLOWINGS_SUCCESS,GET_FOLLOWINGS_FAILED}=require('../types')

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST_SEND:
            return { ...state, loading: true }
        case LOGIN_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload }
        case LOGIN_FAILURE:
            return { ...state, loading: false, message: action.payload }
        case LOGOUT:
            return {}

        default: return state;
    }
}
export const registerReducer = (state = {}, action) => {
    switch (action.type) {

        case REGISTER_REQUEST_SEND:
            return { ...state, loading: true }
        case REGISTER_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload, message: 'Registration Successfull' }
        case REGISTER_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case RESET_REGISTER_ALERTS:
            return { ...state,error:'',message:''}
        default: return state;
    }
}
export const getAllUsersReducer = (state = {users:[],tempUsers:[]}, action) => {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return { ...state, loading: true }
        case GET_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload,tempUsers:action.payload}
        case GET_USERS_FAILED:
            return { ...state, loading: false, error: action.payload }
        case SEARCH_USER:
                const searchText = action.payload
                let matchedUsers =state.tempUsers.filter((p) => p.username.toLowerCase().includes(searchText.toLowerCase()))
                return { ...state, loading: false, users: matchedUsers }
        default: return state;
    }
}
export const userProfileReducer = (state = { userDetails: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { ...state, loading: false, userDetails: action.payload }
        case USER_DETAILS_FAILED:
            return { ...state, loading: false, error: action.payload }
        case USER_DETAILS_UPDATE_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_UPDATE_SUCCESS:
            return { ...state, loading: false, userDetails: action.payload, message: 'Profile Information Updated' }
        case USER_DETAILS_UPDATE_FAILED:
            return { ...state, loading: false, error: action.payload }
        case RESET_UPDATE_ALERTS:
            return { ...state,error:'',message:''}
        case USER_DETAILS_RESET:
            return { userDetails: {} }
        default: return state;
    }
}
export const friendProfileReducer = (state = { friendProfileDetails: {},followUnfollowSuccess:true,loading:false}, action) => {
    switch (action.type) {
        case SHOW_PROFILE_REQUEST:
            return { ...state, loading: true }
        case SHOW_PROFILE_SUCCESS:
            return { ...state, loading: false, friendProfileDetails: action.payload }
        case SHOW_PROFILE_FAILED:
            return { ...state, loading: false, error: action.payload }
        case FOLLOW_UNFOLLOW_REQUEST_SEND:
            return { ...state, loading: true,followUnfollowSuccess:false }
        case FOLLOW_UNFOLLOW_REQUEST_SUCCESS:
            return { ...state, loading: false, friendProfileDetails: action.payload,followUnfollowSuccess:true }
        case FOLLOW_UNFOLLOW_REQUEST_FAILED:
            return { ...state, loading: false, error: action.payload ,followUnfollowSuccess:false}
            
        default: return state;
    }
}


export const getFollowersReducer = (state = { followers:[],loading:false}, action) => {
    switch (action.type) {
        case GET_FOLLOWERS_REQUEST:
            return { ...state, loading: true }
        case GET_FOLLOWERS_SUCCESS:
            return { ...state, loading: false, followers: action.payload }
        case GET_FOLLOWERS_FAILED:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const getFollowingsReducer = (state = { followings:[],loading:false}, action) => {
    switch (action.type) {
        case GET_FOLLOWINGS_REQUEST:
            return { ...state, loading: true }
        case GET_FOLLOWINGS_SUCCESS:
            return { ...state, loading: false, followings: action.payload }
        case GET_FOLLOWINGS_FAILED:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}


/*module.exports = {
    userReducer, registerReducer, userProfileReducer, friendProfileReducer,
    getAllUsersReducer,getFollowersReducer,getFollowingsReducer
} */