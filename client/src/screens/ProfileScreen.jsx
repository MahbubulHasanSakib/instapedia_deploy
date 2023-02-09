import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Spinner} from 'react-bootstrap'
import { useEffect,useState } from 'react'
import { Button,Modal } from 'react-bootstrap'
import {getUserDetails,showAllFollowers,showAllFollowings} from '../actions/user'
const ProfileScreen = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const [modalShowFollowings, setModalShowFollowings] = useState(false);
    
    const {userInfo}=useSelector((state)=>state.userReducer)
    const {userDetails,loading}=useSelector(state=>state.userProfileReducer)
    const { followers, loading: followersLoading } = useSelector(state => state.getFollowersReducer)
    const { followings, loading: followingsLoading } = useSelector(state => state.getFollowingsReducer)
    
  useEffect(()=>
  {
    if(!userInfo)
             {
                 navigate('/login')
             }
    else 
    {
        dispatch(getUserDetails())
    }
   
  },[dispatch,userInfo,navigate])
  const handleClick=()=>
  {
      navigate('/editProfile')
  }
  const showFollowers = () => {
    dispatch(showAllFollowers(userInfo._id))
    setModalShow(true)
}
const showFollowings = () => {
    dispatch(showAllFollowings(userInfo._id))
    setModalShowFollowings(true)
}
  return (
    <div className='container'>
        <div className='profile_div' style={{display:'flex',width:'100%'}}>
    <div className='profile_left' style={{width:'40%'}}>
    <img src={userDetails.profilePic}/>
    </div>
    <div className='profile_right' style={{width:'60%'}}>
    {loading?<Spinner style={{width:"60px",height:"60px"}}  className='mx-auto' animation="border" variant="dark" />:
    <>
        <h4>{userDetails.username}&nbsp;&nbsp;&nbsp;<span><Button onClick={handleClick} bgcolor='black' className='btn btn-success'>Edit Profile</Button></span></h4>
        <ul style={{display:'flex',listStyle:'none'}}>
            <li>{userDetails.number_of_posts} posts</li>
            <li onClick={showFollowers} style={{ cursor: 'pointer' }}>{userDetails.total_followers} followers</li>
            <li onClick={showFollowings} style={{ cursor: 'pointer' }}>{userDetails.total_followings} following</li>
        </ul>
        <p>{userDetails.name}</p>
        <p>{userDetails.bio}</p>
        <p>{userDetails.website}</p>
        </>
}
    </div>
    <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                allFollowers={followers}
                followersLoading={followersLoading}
            />
            <FollowingsModal
            show={modalShowFollowings}
                onHide={() => setModalShowFollowings(false)}
                allFollowings={followings}
                followingsLoading={followingsLoading}
            />
    </div>
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
                    <p>Followers..</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {
                   
                    props.followersLoading ? <Spinner style={{ width: "60px", height: "60px" }} className='mx-auto' animation="border" variant="dark" /> :
                        (
                            props.allFollowers.map((f) => {
                                return <p>{f.followerUsername}</p>
                            })
                        )
                
                }
                
            </Modal.Body>

        </Modal>
    );
}
function FollowingsModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <p>Followings..</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            {
                
                     
                    props.followingsLoading ? <Spinner style={{ width: "60px", height: "60px" }} className='mx-auto' animation="border" variant="dark" /> :
                        (
                            props.allFollowings.map((f) => {
                                return <p>{f.followedUsername}</p>
                            })
                        )
                    

            }
               
            </Modal.Body>

        </Modal>
    );
}

export default ProfileScreen