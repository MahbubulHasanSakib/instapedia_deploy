import React from 'react'
import {useEffect} from 'react'
import {Row,Col,Spinner} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import Post from '../components/Post'
import {useNavigate} from 'react-router-dom'
import {fetchPosts,fetchStories} from '../actions/post'
import {getUserDetails} from '../actions/user'
import Stories from '../components/Stories'
const PostScreen = () => {
  const navigate=useNavigate()
  const dispatch =useDispatch()
  const {posts,loading}=useSelector((state)=>state.posts)
  const {stories,loading:storyLoading}=useSelector((state)=>state.storyReducer)
  const {userInfo}=useSelector((state)=>state.userReducer)
  useEffect(()=>
  {
    if(userInfo)
            {
              dispatch(fetchStories())
              dispatch(fetchPosts())

            }
             else
             {
                 navigate('/login')
             }
   
  },[dispatch,userInfo])
  return (
    <div className='post-screen container'>
      <Row>
     { storyLoading? <Spinner style={{width:"60px",height:"60px"}}  className='mx-auto' animation="border" variant="dark" />:
               
          <Stories stories={stories}/>
     }
     </Row>
            <Row>

           {
             
               loading? <Spinner style={{width:"60px",height:"60px"}}  className='mx-auto' animation="border" variant="dark" />:
               <>
              { (posts.length>0) && (posts.map((post,index)=>{
                return(
                 <Col sm={12}>
                <Post key={index}  post={post}/>
                </Col>
                )
            }))}
           
           </>
           }
           </Row>
          </div>
    )
}

export default PostScreen