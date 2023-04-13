import "./Profile.css";
import EthIcon from "../assets/ethereum.png"
import editIcon from "../assets/edit.png"
import doneIcon from "../assets/verify.png"
import { Link, useNavigate} from "react-router-dom";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { useEffect, useState, useRef } from "react";

import Table from 'react-bootstrap/Table';
// profile in editing mode
function EditingProtected(props){
  const [name_temp, setName_temp] = useState(props.name) ;
  const [des_temp, setDes_temp] = useState(props.des) ;
  const [imgUrl_temp, setImgUrl_temp] = useState(props.imageUrl) ;
  const [imgFile, setImgFile] = useState() ;
  const handleEdit = async () =>{
    console.log("edited... successfully") ;
    const formData = new FormData();
    formData.append('image', imgFile);
    formData.append('ethAddress', props.addr);
    formData.append('name', props.name_temp);
    formData.append('bio', props.des_temp);

    fetch('http://localhost:4000/updateAccount', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
    props.handleChangeEdit(name_temp, des_temp, imgUrl_temp) ;

  }
  const handleBioChange = (event) => {
    setDes_temp(() => event.target.value);
  }
  const handleNameChange = (event) => {
    setName_temp(() => event.target.value);
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    setImgFile(() => file) ;
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setImgUrl_temp(() => imageUrl);
    };

    reader.readAsDataURL(file);
  }
  return (
    <div className='EditingSection'>
      <div className='imageChose'>
        <h3 className="body-image-title" align="center">Image</h3>
        <img src={imgUrl_temp} alt="profile image" className="imgProfile-editing"/>
        <input type="file" accept="image/*" className='form-control select-image-form' onChange={handleFileChange}/>
      </div>
      <div className='imageChose '>
        <div className="lable-for-name  ">
          <label htmlFor="inputName" className="col-form-label">Name</label>   
        </div>
        
        <div >
          <input type="text" className="form-control input-for-name" id="inputName"  value={name_temp} onChange={handleNameChange}/>
        </div>
        <div className="bio-lable">
          <label htmlFor="boi-lable" className="col-form-label">Bio</label>  
        </div>
        
         <div >
          <textarea className="form-control bio-text-edit body-text"  id="boi-lable" style={{height: "10rem"}} value={des_temp} onChange={handleBioChange} ></textarea>
          
        </div>
      </div>
      
      <Link to="/profile" className="editButton" onClick={handleEdit}>
          <img src={doneIcon}  alt="nodd" />
          <span className="editSpan">Done</span>
      </Link>
    </div>
  )
}
// profile withOutEditing mode
function ProfileProtected(props){
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const copy = async () => {
    await navigator.clipboard.writeText(props.addr);
    setShow(true)
    setTimeout(()=> setShow(false), 1000);
  }
  
  return(
    <div className="container-fluid">
        {/* user Information */}
        <div className="row profile_details">
            
            <div className='d-flex juctify-content-left '>
                <Link to="/profile/Editing" relative="path" className="editButton">
                    <img src={editIcon}  alt="nodd" />
                    <span className="editSpan">Edit</span>
                </Link>
                <img src={props.imageUrl} alt='Profile pic' className='imgProfile' />
                {/* Name and crytpo address info */}
                <div className='profileText'>
                    <h1 className="heading_2 "> {props.name} </h1>
                    <div className='d-flex justify-content-left'>
                      <img src={EthIcon} alt='eth icon' className='ethIcon1'/>
                      <p className='text-muted address-text' onClick={copy} ref={target}>
                        {props.addr.substr(0,6)}...{props.addr.substr(-4, 4)}
                      </p>
                      <Overlay target={target.current} show={show} placement="top">
                        {(props) => (
                          <Tooltip id="overlay-example" {...props}>
                            copied!
                          </Tooltip>
                        )}
                      </Overlay>
                      
                        
                    </div>
                </div>
                
            
            </div>
            {/* descrition of user / bio */}
            <div className="ms-4 ">
                <div className="bioRapter mt-4">
                    <h1 className="subtitle-text">Bio</h1>
                    <p className="body-text">
                        {props.des}
                    </p>
                </div>
                
            
            </div>
        </div>
    </div>
  );
}
function Editing(props){
  const navi = useNavigate();
  useEffect(() => {
    if(props.auth == false) navi("/")
  })
  return props.auth ? (<EditingProtected addr={props.addr} imageUrl={props.imageUrl} name={props.userName} des={props.des} handleChangeEdit={props.handleChangeEdit}/>):(null) ;
}

function Profile(props){
  const navi = useNavigate();
  useEffect(() => {
    if(props.auth == false) navi("/")
  })
  return props.auth == true ? (
      <div>
        <ProfileProtected addr={props.addr} imageUrl={props.imageUrl} name={props.userName} des={props.des} />
        <OwnedContent/>
      </div>
      
  ):(null) ;
}
function OwnedContent(props){
  return(
    <div className="container-fluid mt-4">
      <div>
        <h3 className="heading_3 border-bottom pb-2">Content Owned</h3>
      </div>
      
      <div className="p-3 mb-5 border rounded">

        <Table striped  hover>
          <thead className="table-background">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Views</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>

      </div>
      
    </div>
  );
}


export {Profile, Editing}
