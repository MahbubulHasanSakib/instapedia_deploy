import {createStore,applyMiddleware, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { postsReducer,singleUserPostsReducer,storyReducer } from './reducers/post';
import {userReducer,registerReducer,getAllUsersReducer,
    userProfileReducer,friendProfileReducer,getFollowersReducer,getFollowingsReducer} from './reducers/user'

import {messageReducer} from './reducers/message'

const rootReducer=combineReducers({
    posts:postsReducer,
    userReducer:userReducer,
    registerReducer:registerReducer,
    getAllUsersReducer:getAllUsersReducer,
    userProfileReducer:userProfileReducer,
    friendProfileReducer:friendProfileReducer,
    singleUserPostsReducer:singleUserPostsReducer,
    getFollowersReducer:getFollowersReducer,
    getFollowingsReducer:getFollowingsReducer,
    messageReducer:messageReducer,
    storyReducer:storyReducer
})

const getUserFromStorage=localStorage.getItem('loggedUser')?JSON.parse(localStorage.getItem('loggedUser')):null
const initialState={
   userReducer:{userInfo:getUserFromStorage},
  }

 const store=createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(thunk)))
 export default store