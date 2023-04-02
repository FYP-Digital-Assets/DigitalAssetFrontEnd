import "./Profile.css";
import EthIcon from "../assets/ethereum.png"
import editIcon from "../assets/edit.png"
import { Link, useNavigate} from "react-router-dom";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { useEffect, useState, useRef } from "react";
// profile in editing mode
function EditingProtected(props){
  return (
    <div className='EditingSection'>
      <div className='imageChose'>
        <h3>profile image</h3>
        <img src="https://placehold.co/600x400" alt="profile image" className="imgProfile"/>
        <input type="file" accept="image/*" className='form-control' onChange={props.handleFileChange}/>
      </div>
      <div className='imageChose'>
        <div className="mb-3 row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputName"  value={props.name} onChange={props.handleNameChange}/>
          </div>
         </div>
      </div>
      <Link to="/profile"  className="editButton">Done</Link>
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
                    <span className="editSpan">edit</span>
                </Link>
                <img src="https://placehold.co/600x400" alt='Profile pic' className='imgProfile' />
                {/* Name and crytpo address info */}
                <div className='profileText'>
                    <h1 className="heading_2 ">Iqbal Baloch</h1>
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
            <div className="profileText ms-4 ">
                <div className="bioRapter mt-5">
                    <h1 className="subtitle-text">Bio</h1>
                    <p className="body-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Impedit ratione delectus quo a maiores soluta aspernatur 
                        pariatur quia accusamus odio, nihil asperiores sunt consequuntur 
                        laborum itaque veniam. Atque, nemo quos.
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
  return props.auth ? (<EditingProtected/>):(null) ;
}

function Profile(props){
  const navi = useNavigate();
  useEffect(() => {
    if(props.auth == false) navi("/")
  })
  return props.auth == true ? (
      <ProfileProtected addr={props.addr}/>
  ):(null) ;
}


export {Profile, Editing}
