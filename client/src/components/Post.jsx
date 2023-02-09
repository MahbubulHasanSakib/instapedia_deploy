import React,{useState} from 'react'
import {Card} from 'react-bootstrap'
import Comments from './Comments'
import {useSelector,useDispatch} from 'react-redux'
import {likePost} from '../actions/post'
import {Modal,Form} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {showProfile} from '../actions/user'

const Post = ({post}) => {
  const navigate=useNavigate()
  const {userInfo}=useSelector((state)=>state.userReducer)
  const [modalShow, setModalShow] =useState(false);
  const extension=post.image.split(".").pop();
  console.log(extension)
  let isLiked;
  let profileImg;
  if(userInfo){
   isLiked=post.likedUsers.find(likedUser=>likedUser.userId.toString()===userInfo._id.toString())
  }
    
  const dispatch=useDispatch()
  const handleLike=(pid)=>
  {
    dispatch(likePost(pid))
  }
  const handleShow=(pid)=>
  {
    dispatch(showProfile(pid))
    navigate(`/friendsProfile/${post.postedUserId}`)
  }
  return (
    <div className='post' style={{ width: '50%',margin:'15px auto 10px auto'}}>
       <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        likedUsers={post.likedUsers}
      />
        <Card>
      <p  className='px-3 py-3 mx-0 my-0 text-left'><span onClick={()=>handleShow(post.postedUserId)}><img className='profile_pic' style={{border:'2px solid #E93875'}} src={post.postedUserImage}/></span> {post.postedUsername}</p>
      {
        (extension==='jpg'||extension==='jpeg'||extension=='png')?  <Card.Img className="post-image " style={{ width: '100%',height:'100%'}} variant="top" src={post.image} />
        :
        <video controls="controls">
          <source src={post.image} type="video/mp4"/>
        </video>
      }
  <Card.Body>
  <p><span style={{cursor:'pointer'}}>{!isLiked?<i onClick={()=>handleLike(post._id)} style={{fontSize:'20px'}} className="far fa-heart"></i>:<i onClick={()=>handleLike(post._id)} style={{fontSize:'20px',color:'red'}} className="fas fa-heart"></i>}</span></p>
    <p><span style={{cursor:'pointer'}} onClick={() => setModalShow(true)}>{`${post.totalLikes} likes`}</span></p>
    <p style={{marginBottom:'0px'}}>{post.description}</p>

  <Comments post={post}/>
  </Card.Body>
  
</Card>
    </div>
  )
}


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         <p>Who liked this post..</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          props.likedUsers.map(u=>
            {
              return <p>{u.likedUserName}</p>
            })
        }
      </Modal.Body>

    </Modal>
  );
}

export default Post