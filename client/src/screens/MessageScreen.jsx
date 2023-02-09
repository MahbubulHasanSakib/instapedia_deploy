import React from 'react'
import { useEffect,useState } from 'react'
import { showAllFollowings } from '../actions/user'
import {getMessages,sendMessage} from '../actions/message'
import {Spinner} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
const MessageScreen = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [message,setMessage]=useState('')
    const {userInfo}=useSelector((state)=>state.userReducer)
   const { followings, loading: followingsLoading } = useSelector(state => state.getFollowingsReducer)
    
  useEffect(()=>
  {
    if(!userInfo)
             {
                 navigate('/login')
             }
    else 
    {
        dispatch(showAllFollowings(userInfo._id))
    }
   
  },[dispatch,userInfo,navigate])
  const handleClick=(rId,runame)=>
  {
    navigate(`/message/${rId}/${runame}`)
  }
  
 
  return (
      <div className='container'>
    <div className='messageDiv'>
        <div className='message_div_left'>
        <h5 className='text-center'>{userInfo && userInfo.username}</h5>
        {
            followingsLoading?<Spinner style={{width:"60px",height:"60px"}}  className='mx-auto' animation="border" variant="dark" />:
        (
            followings.map((f)=><p style={{cursor:'pointer'}} onClick={()=>handleClick(f.followedId,f.followedUsername)}>{f.followedUsername}</p>)
        )
        }
         
        </div>
        <div className='message_div_right'>
        {

                <h2 className='text-center py-10'>Send Message</h2>
            
        }
        </div>
    </div>
    </div>
  )
}

export default MessageScreen