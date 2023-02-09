import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { showProfile, followUnfollowAction, showAllFollowers,showAllFollowings } from '../actions/user'
import { Button, Modal } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'

const FriendProfileScreen = () => {
    const { uid } = useParams();
    const [modalShow, setModalShow] = useState(false);
    const [modalShowFollowings, setModalShowFollowings] = useState(false);
    console.log(uid)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.userReducer)
    const { friendProfileDetails, loading, followUnfollowSuccess } = useSelector(state => state.friendProfileReducer)
    const { followers, loading: followersLoading } = useSelector(state => state.getFollowersReducer)
    const { followings, loading: followingsLoading } = useSelector(state => state.getFollowingsReducer)
    
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        else {
            dispatch(showProfile(uid))
        }

    }, [dispatch, userInfo, uid])


    const handleFollowUnfollow = () => {
        dispatch(followUnfollowAction(uid))

    }
    const showFollowers = () => {
        dispatch(showAllFollowers(uid))
        setModalShow(true)
    }
    const showFollowings = () => {
        dispatch(showAllFollowings(uid))
        setModalShowFollowings(true)
    }
    return (
        <div className='container'>
            <div className='profile_div' style={{ display: 'flex', width: '100%' }}>
                <div className='profile_left' style={{ width: '40%' }}>
                    <img src={friendProfileDetails.profilePic} />
                </div>
                <div className='profile_right' style={{ width: '60%' }}>
                    {(loading && followUnfollowSuccess) ? <Spinner style={{ width: "60px", height: "60px" }} className='mx-auto' animation="border" variant="dark" /> :
                        <>
                            <h4>{friendProfileDetails.username}&nbsp;&nbsp;<span>{!followUnfollowSuccess ? <Spinner style={{ width: "15px", height: "15px" }} animation="border" className="mx-auto" variant="dark" /> :
                               (uid.toString()!==userInfo._id.toString()) && <Button onClick={() => handleFollowUnfollow()} bgcolor='black' className='btn btn-success'>{friendProfileDetails.actionType === 'followed' ? 'Unfollow' : 'Follow'}</Button>}</span></h4>
                            <ul style={{ display: 'flex', listStyle: 'none' }}>
                                <li>{friendProfileDetails.number_of_posts} posts</li>
                                <li onClick={showFollowers} style={{ cursor: 'pointer' }}>{friendProfileDetails.total_followers} Followers</li>
                                <li onClick={showFollowings} style={{ cursor: 'pointer' }}>{friendProfileDetails.total_followings} Following</li>
                            </ul>

                            <p>{friendProfileDetails.name}</p>
                            <p>{friendProfileDetails.bio}</p>
                            <p>{friendProfileDetails.website}</p>
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
                {(!loading && friendProfileDetails.his_posts)&&<div className='users_posts'>
            {
                friendProfileDetails.his_posts.map((f,index)=>{
                    return <img key={index} style={{ width: '300px',height:'300px',marginRight:'15px'}} src={f.image} />
                })
            }
            </div>
                }
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


export default FriendProfileScreen