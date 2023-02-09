import React,{useState,useEffect} from 'react'
import { Navbar,Nav,Container,Form,FormGroup,FormControl,Modal,Button,Dropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {createPost,createStory} from '../actions/post'
import {logout,getUserDetails,getAllUsers,searchUser,showProfile} from '../actions/user'
import {useNavigate} from 'react-router-dom'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
const Header = () => {
  const [modalShow, setModalShow] =useState(false);
  const [display,setDisplay]=useState('none')
  const [search,setSearch]=useState('')
  const {userInfo}=useSelector(state=>state.userReducer)
  const {userDetails}=useSelector(state=>state.userProfileReducer)

  const {users,loading}=useSelector(state=>state.getAllUsersReducer)

  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(() => {
    if(userInfo)
    dispatch(getUserDetails())
  }, [dispatch,userInfo])
  
  const handleLogOut=()=>
  {
    dispatch(logout())
  }
  const handleClick=()=>
  {
    navigate('/profile')
  }
   const getUsers=()=>{
    dispatch(getAllUsers())
   }
  const handleSearch=()=>
  {
    dispatch(searchUser(search))
  }
  console.log(users)
  const handleShow=(pid)=>
  {
    dispatch(showProfile(pid))
    navigate(`/friendsProfile/${pid}`)
    setDisplay('none')
  }
  const handleMessages=()=>{
    navigate('/messages')
  }
  return (
    <>
      <header>
        <Navbar  variant="dark" expand="lg" className='fixed-top' >
          <Container>
            <LinkContainer to='/'>
            <Navbar.Brand >Instapedia</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="ms-auto">
                {userInfo && 
              <Form className="d-flex">
                <FormGroup>
        <FormControl 
          type="search"
          onClick={()=>setDisplay('block')}
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        </FormGroup>

      </Form>
   }
      {userInfo ?<>
           <LinkContainer to='/'>
                <Nav.Link><i style={{fontSize:'20px'}} className="fas fa-home"></i></Nav.Link>
                </LinkContainer>
                 <Nav.Link ><i onClick={() => setModalShow(true)} style={{fontSize:'20px'}} className="fas fa-plus-square"></i></Nav.Link>
                <Nav.Link ><i onClick={handleMessages} style={{fontSize:'20px'}} className="fas fa-paper-plane"></i></Nav.Link>
                <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        showModal={()=>setModalShow(false)}
      />
  
               <ul style={{textDecoration:'none',listStyle:'none',display:'flex'}}>
                 <li style={{paddingTop:'4px'}}><img className='profile_pic' src={userDetails.profilePic||userInfo.profilePic}/></li>
               </ul>
               <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    {userDetails.username||userInfo.username}
  </Dropdown.Toggle>

  <Dropdown.Menu>
  <Dropdown.Item onClick={handleClick} >Profile</Dropdown.Item>
  <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
              
               </>:
               <LinkContainer to='/login'>
               <Nav.Link>Login</Nav.Link>
               </LinkContainer>
               }
                 
              </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <div  style={{display:display,color:'white',opacity:'0.9'}} className="search_results">
        <div className='container'>
      <div className='searchBox'  style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
      <Form className="d-flex">
                <FormGroup>
        <FormControl 
          type="search"
          style={{width:'100%',marginLeft:'auto'}}
          value={search}
          onClick={getUsers}
          onChange={(e)=>{setSearch(e.target.value)}}
          onKeyUp={handleSearch}
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        </FormGroup>
      </Form>
      <div>
      <i style={{fontSize:'30px',color:'white',fontWeight:'bold',cursor:'pointer'}} onClick={()=>setDisplay('none')} class="fas fa-times"></i>
      </div>
      </div>
      <div className='searchedName'>
        <ul>
          {!loading &&
          (
            users.map(u=><li style={{cursor:'pointer'}} onClick={()=>handleShow(u._id)}>{u.username}</li>)
          )
          }
        </ul>
      </div>
      </div>
      </div>
    </>
  )
}

function MyVerticallyCenteredModal(props) {
  const [postDescription,setPostDescription]=useState('')
  const [imageFileName,setImageFileName]=useState('')
  const dispatch=useDispatch()
  const handlePostSubmit=(e)=>
  {
    e.preventDefault();
    const formData=new FormData()
    formData.append('postDescription',postDescription)
    formData.append('postImg',imageFileName)
    dispatch(createPost(formData))
    setPostDescription('')
    setImageFileName('')
    props.showModal()
  }
  const handleStorySubmit=(e)=>{
    e.preventDefault();
    const formData=new FormData()
    formData.append('storyImg',imageFileName)
    dispatch(createStory(formData))
    setImageFileName('')
    props.showModal()
  }
  const onChangeFile=(e)=>
  {
    setImageFileName(e.target.files[0])
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
       {/* <Modal.Title id="contained-modal-title-vcenter">
         Create Post
  </Modal.Title>*/}
      </Modal.Header>
      <Modal.Body>
      <Tabs defaultActiveKey="1">
    <TabPane tab="Create Post" key="1">
    <Form onSubmit={(e)=>handlePostSubmit(e)} encType='multipart/form-data'>
  <Form.Group className="mb-3" controlId="formBasicPost">
    <Form.Control onChange={(e)=>setPostDescription(e.target.value)} value={postDescription} as="textarea" style={{minHeight:'200px'}} type='text' name='postDescription' placeholder="Write a post.." />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicImage">
    <Form.Label>Add an image</Form.Label>
    <Form.Control onChange={(e)=>onChangeFile(e)} type="file" name='postImg' />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
    </TabPane>
    <TabPane tab="Create Story" key="2">
    <Form onSubmit={(e)=>handleStorySubmit(e)} encType='multipart/form-data'>
  <Form.Group className="mb-3" controlId="formBasicStoryImage">
    <Form.Label>Add an image</Form.Label>
    <Form.Control onChange={(e)=>onChangeFile(e)} type="file" name='storyImg' />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
    </TabPane>
  </Tabs>
     
      </Modal.Body>
   
    </Modal>
  );
}

export default Header