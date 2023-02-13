import React from 'react'
import { useEffect,useState,useRef } from 'react'
import { showAllFollowings } from '../actions/user'
import {getMessages,sendMessage,add_new_message} from '../actions/message'
import {Spinner} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {io} from 'socket.io-client'
import {v4 as uuidv4} from 'uuid'

const ChatScreen = () => {
    const socket=useRef()
    const {rid,runame}=useParams()
    const [arrivalMessage,setArrivalMessage]=useState(null)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const scrollRef=useRef()
    const [message,setMessage]=useState('')
    const {userInfo}=useSelector((state)=>state.userReducer)
   const { followings, loading: followingsLoading } = useSelector(state => state.getFollowingsReducer)
  const {messages,loading:messageLoading}=useSelector(state=>state.messageReducer)
   useEffect(()=>
  {
    if(!userInfo)
             {
                 navigate('/login')
             }
    else 
    {
        dispatch(showAllFollowings(userInfo._id))
        dispatch(getMessages(userInfo._id,rid))
    }
   
  },[dispatch,userInfo,navigate])

  useEffect(()=>{
if(userInfo)
{
    socket.current=io('https://instapedia-backend.onrender.com')
    socket.current.emit("add-user",userInfo._id)
}
  },[userInfo])

  
   const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(sendMessage(userInfo._id,rid,userInfo.username,runame,message))
    socket.current.emit('send-msg',{
        to:rid,
        from:userInfo._id,
        message:message
    })
    dispatch(add_new_message({fromSelf:true,message:message}))
    setMessage('')
  
}
useEffect(()=>{
  if(socket.current){
      socket.current.on("msg-receive",(msg)=>{
        console.log("receive")
          setArrivalMessage({fromSelf:false,message:msg})
      })
  }
},[])
useEffect(()=>{
  arrivalMessage && (
    dispatch(add_new_message(arrivalMessage))
  )
},[arrivalMessage])

useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
},[messages])

const handleClick=(rId,runame)=>
  {
    console.log(rId+" "+runame);
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
        

<div className='all_messages' style={{height:'550px',overflowY:'auto'}}>
    {
        messages.length>0 &&
       (
           messages.map(m=>{
               return <div ref={scrollRef} key={uuidv4()}>
                   <div className={`message ${m.fromSelf?"sended":"received"}`}>
                     <div className='content'>
              <p>{m.message}</p>
                     </div>
                   </div>
               </div>
           })
       )
    }
</div>
<form onSubmit={handleSubmit} style={{display:'flex',padding:'5px 10px',justifyContent:'space-between'}}>
    <input onChange={(e) => setMessage(e.target.value)} value={message} style={{width:'80%'}} type="text" name="message"/>
    <button type='send'>Send</button>
</form>



        </div>
    </div>
    </div>
  )
}

export default ChatScreen