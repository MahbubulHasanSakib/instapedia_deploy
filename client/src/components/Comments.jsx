import React,{useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {addComment} from '../actions/post'
const Comments = ({post}) => {
    const [modalShow, setModalShow] =useState(false)
    const [comment,setComment]=useState('')
    const dispatch =useDispatch()
    const {posts:AllPosts,loading}=useSelector((state)=>state.posts)
    const handleSubmitComment=(e,postId)=>
    {
    e.preventDefault();
    console.log(comment)
    console.log(postId)
    dispatch(addComment(postId,comment))
    setComment('')
    }
    console.log(AllPosts)
  return (
      <div className='comment_section'>
      <p onClick={() => setModalShow(true)}>View all {post.comments.length} comments</p>
      {(!loading && post.comments.length>0) && 
      (
          <>
          <span style={{fontWeight:'bold'}}>{post.comments[post.comments.length-1]['commentedUsername']} </span>
          <span>{post.comments[post.comments.length-1]['comment']}</span>
          </>
      )
      }
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        comments={post.comments}
        thisPost={post}
      />
    <form className='comment' style={{marginTop:'5px'}} onSubmit={(e)=>handleSubmitComment(e,post._id)}>
    <div className="form-group commentbox">
      <input type="text" onChange={(e)=>setComment(e.target.value)} class="form-control" value={comment} id="commentBox" placeholder="Add a comment"/>
    </div>
    <button type="submit" class="btn btn-success">Post</button>
  </form>
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
           {props.thisPost.postedUser}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.comments.length} comments</h4>
          {props.comments.length>0?
           <>
           {props.comments.map((com)=>{
               return(
                <>
                <p style={{fontWeight:'bold'}}>{com.commentedUsername}</p>
                <p>{com.comment}</p>
                </>
               )
           })
            }
           </>:null
         }
        </Modal.Body>

      </Modal>
    );
  }
export default Comments