import { GET_POSTS_REQUEST_SUCCESS, GET_POSTS_REQUEST_FAILED, GET_POSTS_REQUEST_SEND } from '../types'
import { ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILED } from '../types'
import { CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILED } from '../types'
import { LIKE_REQUEST_SEND, LIKE_SUCCESS, LIKE_FAILURE } from '../types'
import {SINGLE_USER_POSTS_REQUEST,SINGLE_USER_POSTS_SUCCESS,SINGLE_USER_POSTS_FAILED} from '../types'
import {CREATE_STORY_REQUEST,CREATE_STORY_SUCCESS,CREATE_STORY_FAILED,
GET_STORIES_REQUEST,GET_STORIES_SUCCESS,GET_STORIES_FAILED} from '../types'
export const postsReducer = (state = { posts: [], loading: false }, action) => {
    switch (action.type) {
        case GET_POSTS_REQUEST_SEND:
            return { ...state, loading: true }
        case GET_POSTS_REQUEST_SUCCESS:
            return { ...state, posts: action.payload, loading: false }
        case GET_POSTS_REQUEST_FAILED:
            return { ...state, error: action.payload, loading: false }
        case ADD_COMMENT_REQUEST:
            return { ...state }
        case ADD_COMMENT_SUCCESS:
            console.log(action.payload)
            const tempPost = state.posts.find((p) => p._id.toString() === action.payload._id.toString())
            console.log(tempPost)
            const updatedPosts = state.posts.map((pst) => {
                if (pst._id.toString() === tempPost._id.toString()) return action.payload;
                else return pst;
            })
            return { ...state, posts: updatedPosts, loading: false }
        case ADD_COMMENT_FAILED:
            return { ...state, error: action.payload, loading: false }
        case CREATE_POST_REQUEST:
            return { ...state, loading: true }
        case CREATE_POST_SUCCESS:
            return { ...state, posts: action.payload, loading: false }
        case CREATE_POST_FAILED:
            return { ...state, loading: false, error: action.payload }
        case LIKE_REQUEST_SEND:
            return { ...state }
        case LIKE_SUCCESS:
            const temp = state.posts.find((p) => p._id.toString() === action.payload._id.toString())

            const updatedPostsAfterLike = state.posts.map((pst) => {
                if (pst._id.toString() === temp._id.toString()) return action.payload;
                else return pst;
            })
            return { ...state, posts: updatedPostsAfterLike, loading: false }
        case LIKE_FAILURE:
            return { ...state, loading: false, error: action.payload }

        default: return state;
    }
}


export const singleUserPostsReducer = (state = { posts: []}, action) => {
    switch (action.type) {
        case SINGLE_USER_POSTS_REQUEST:
            return { ...state, loading: true }
        case SINGLE_USER_POSTS_SUCCESS:
            return { ...state, posts: action.payload, loading: false }
        case SINGLE_USER_POSTS_FAILED:
            return { ...state, error: action.payload, loading: false }
        
        default: return state;
    }
}


export const storyReducer = (state = { stories: []}, action) => {
    switch (action.type) {
        case GET_STORIES_REQUEST:
            return { ...state, loading: true }
        case GET_STORIES_SUCCESS:
            return { ...state, stories: action.payload, loading: false }
        case GET_STORIES_FAILED:
            return { ...state, error: action.payload, loading: false }
        
        case CREATE_STORY_REQUEST:
            return { ...state, loading: true }
        case CREATE_STORY_SUCCESS:
            return { ...state, stories: action.payload, loading: false }
        case CREATE_STORY_FAILED:
            return { ...state, error: action.payload, loading: false }
        
        default: return state;
    }
}