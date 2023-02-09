import React from 'react'
import {userLogin} from '../actions/user'
import {useState,useEffect} from 'react'
import {Form,Button,Spinner,Alert} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import { useParams,useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
const LoginScreen = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate()
  const {loading,userInfo,message}=useSelector(state=>state.userReducer)

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    useEffect(()=>
    {
        if(userInfo)
        {
             navigate('/')
        }
    },[navigate,userInfo])
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        dispatch(userLogin(email,password))
    }
    return (
        <div>
            <h1>Login Form</h1>
        {
            loading?<Spinner style={{width:"60px",height:"60px"}}  className='mx-auto' animation="border" variant="dark" />:
            message?<Alert  variant='warning'>{message}</Alert>:null
               
        }
       <Form onSubmit={(e)=>handleSubmit(e)} >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control name="email" type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter email" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control name="password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  <p>Don't have an account?<Link to='/register'><span>sign up</span></Link></p>
</Form>
        </div>
    )
}

export default LoginScreen
