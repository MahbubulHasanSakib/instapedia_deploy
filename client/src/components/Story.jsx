import React,{useState} from 'react'
import {Modal} from 'react-bootstrap'
const Story = ({sty}) => {
  const [modalShow, setModalShow] =useState(false);
  return (
    <div className='story'>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        imgSrc={sty.story_image}
        userName={sty.story_username}
      />
     <img onClick={()=>setModalShow(true)} src={sty.story_image}/>
     <p>{sty.story_username}</p>
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
         <p>{props.userName}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{maxHeight:'300px'}}>
        {
            <img style={{width:'100%',height:'100%'}} src={props.imgSrc}/>
        }
      </Modal.Body>

    </Modal>
  );
}

export default Story