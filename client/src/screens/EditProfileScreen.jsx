import React, { useState,useEffect } from 'react'
import { Form, Button ,Alert} from 'react-bootstrap'
import { updateUserDetails } from '../actions/user'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {getUserDetails,resetUserUpdate} from  '../actions/user'

const EditProfileScreen = () => {
    const {userDetails,message,error}=useSelector(state=>state.userProfileReducer)
    const {userInfo}=useSelector(state=>state.userReducer)
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [image, setImage] = useState('')
    const [website, setWebsite] = useState('')
    const [bio, setBio] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [Errormessage, setErrorMessage] = useState('')
  const navigate=useNavigate()
  useEffect(() => {
    if(userInfo){
    dispatch(getUserDetails())
    }
    else {
        navigate('/login')
    }
  }, [dispatch,userInfo])
  useEffect(() => {
    if (message || error) {
        const timeId = setTimeout(() => {
            dispatch(resetUserUpdate())
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }
}, [message, error]);
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUserDetails(name, username,image, website, bio,phone, gender))
        setErrorMessage('')
    
    }
    const handleFileChange=(e)=>{
        setImage(e.target.files[0])
    }
    return (
        <div className='container'>
            <div className='edit_profile' style={{ minHeight: '75vh' }}>
                <h4>Edit Profile</h4>
             {Errormessage && <Alert  variant='warning'>{Errormessage}</Alert>}
             {(!message && error) && <Alert variant='warning'>{error}</Alert>}
             {message && <Alert variant='success'>{message}</Alert>}
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e) => setName(e.target.value)} value={name||userDetails.name} name='name' type="text" placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>UserName</Form.Label>
                        <Form.Control onChange={(e) => setUsername(e.target.value)} value={username||userDetails.username} name='username' type="text" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Profile Image</Form.Label>
                    <Form.Control onChange={handleFileChange} name="profilePic" type="file" />
                </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicWebsite">
                        <Form.Label>Website</Form.Label>
                        <Form.Control onChange={(e) => setWebsite(e.target.value)} value={website||userDetails.website} name='website' type="text" placeholder="Enter website address" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicBio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control onChange={(e) => setBio(e.target.value)} value={bio||userDetails.bio} name='bio' as="textarea" style={{minHeight:'100px'}} type="text" placeholder="Write bio" />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone no.</Form.Label>
                        <Form.Control onChange={(e) => setPhone(e.target.value)} name='phone' value={phone||userDetails.phone} type="number" placeholder="Enter phone no" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicGender">
                        <Form.Label>Gender:</Form.Label>
                        <div onChange={(e) => setGender(e.target.value)}>
                            <input type="radio"
                            checked={(gender==='Male' || userDetails.gender==='Male')?true:false} 
                             value="Male" name="gender" /> Male
                            <input type="radio"
                             checked={(gender==='Female' ||userDetails.gender==='Female')?true:false} 
                             value="Female" name="gender" /> Female
                        </div>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default EditProfileScreen