import "./Profile.css";
import EthIcon from "../assets/ethereum.png"
import editIcon from "../assets/edit.png"
import doneIcon from "../assets/verify.png"
import cancelIcon from "../assets/cancel.png"
import { Link, Outlet, useNavigate, useOutletContext, useParams} from "react-router-dom";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { useEffect, useState, useRef, useMemo } from "react";
import Web3 from "web3";
import {ContentCard} from "../Components/ContentCard"

// profile in editing mode
function EditingProtected(props){
  const [name_temp, setName_temp] = useState(props.name) ;
  const [des_temp, setDes_temp] = useState(props.des) ;
  const [imgUrl_temp, setImgUrl_temp] = useState(props.imageUrl) ;
  const [imgFile, setImgFile] = useState() ;

  const handleEdit = async () =>{
    
    if(name_temp !== props.name || des_temp !== props.des ){
      console.log("updating user details....");
      const userobj = {
        "ethAddress": props.addr,
        "details":{
          "bio": des_temp,
          "name": name_temp
        }
      };

      fetch('http://localhost:4000/updateDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userobj)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }
    
    if(imgFile){
      const formData = new FormData();
      formData.append('image', imgFile);
      formData.append('ethAddress', props.addr);
      fetch('http://localhost:4000/updateProfile', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }
    
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
      
      <Link to={`/profile/${props.addr}`} className="editButton" onClick={handleEdit}>
          <img src={doneIcon}  alt="edit button" />
          <span className="editSpan">Done</span>
      </Link>
      <Link to={`/profile/${props.addr}`} className="editButton1" >
          <img src={cancelIcon}  alt="edit button" />
          <span className="editSpan">Cancel</span>
      </Link>
    </div>
  )
}
// profile withOutEditing mode
function ProfileProtected(props){
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const copy = async () => {
    await navigator.clipboard.writeText(props.userData.ethAddress);
    setShow(true)
    setTimeout(()=> setShow(false), 1000);
  }
  useEffect(() =>{
    console.log("data :", props.userData)
  })
  
  return(
    <div className="container-fluid">
        {/* user Information */}
        <div className="row profile_details">
            
            <div className='d-flex juctify-content-left '>
                {props.isOwner ? 
                  <Link to={`/profile/${props.userData.ethAddress}/Editing`} relative="path" className="editButton">
                    <img src={editIcon}  alt="nodd" />
                    <span className="editSpan">Edit</span>
              </Link>
                : <></>}
                
                <img src={`http://localhost:4000/ProfileImgs/${props.userData.img}`} alt='Profile pic' className='imgProfile' />
                {/* Name and crytpo address info */}
                <div className='profileText'>
                    <h1 className="heading_2 "> {props.userData.name} </h1>
                    <div className='d-flex justify-content-left'>
                      <img src={EthIcon} alt='eth icon' className='ethIcon1'/>
                      <p className='text-muted address-text' onClick={copy} ref={target}>
                        {props.userData.ethAddress.substr(0,6)}...{props.userData.ethAddress.substr(-4, 4)}
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
                        {props.userData.bio}
                    </p>
                </div>
                
            
            </div>
        </div>
    </div>
  );
}
function Editing(props){
  const [isOwner] = useOutletContext();
  const navi = useNavigate();
  useEffect(()=>{
    if(!isOwner) navi("..")
  }, [])
  return isOwner ? (<EditingProtected addr={props.addr} imageUrl={props.imageUrl} name={props.userName} des={props.des} handleChangeEdit={props.handleChangeEdit}/>):(null) ;
}

function Profile(){
  const [isOwner, userData] = useOutletContext();
  
  return userData ? (
      <div>
        <ProfileProtected userData={userData} isOwner={isOwner}/>
      </div>
      
  ):(<></>) ;
}
function OwnedContent(props){
    async function getContentFromContracts(address){
      const web3 = new Web3(window.ethereum);
      const dAsset = JSON.parse(localStorage.getItem("Digital_Asset"))
      const contract = new web3.eth.Contract(dAsset.abi, dAsset.address);
      const result = await contract.methods.getContents(address).call()
      return result;
  }
  async function getContentDetailsFromContracts(contentAddress, senderAddress){
    const web3 = new Web3(window.ethereum);
    const asset = JSON.parse(localStorage.getItem("Asset"))
    const contract = new web3.eth.Contract(asset.abi, contentAddress);
    const cid = await contract.methods.getContent().call({from:senderAddress})
    console.log("cid ", cid)
    const prices = await contract.methods.getPrices().call()
    const licensors = await contract.methods.getLicensorHistory().call()
    const owners = await contract.methods.getOwnerHistory().call()
    console.log("owners: ",owners) ;
    console.log("price: ",prices)
    console.log("license: ", licensors)
    return ({cid, prices, licensors, owners})
}
const [ownedContentDetails, setOwnedContentDetails] = useState();
console.log("call details")
  useMemo(async()=>{
    const resContract = await getContentFromContracts(props.addr) ;
    console.log("contract result ",resContract);
    setOwnedContentDetails(await Promise.all(resContract.map(async (address) =>{
      
      const detailsContracts = await getContentDetailsFromContracts(address, props.addr) ;
      const detailsFromApi = await fetch('http://localhost:4000/content/'+address)
      .then(response => response.json()) ;
      // console.log("one: ",detailsContracts,"\ntwo: ",detailsFromApi)
      const owner = detailsContracts.owners[detailsContracts.owners.length-1]
      //request owner details
      const ownerDetail = await fetch("http://localhost:4000/userInfo", {
      method:"post"  ,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ethAddress:owner})
      
      }).then(res=>res.json())
      console.log("owner current ", detailsContracts.owners[detailsContracts.owners.length-1])
      return {...detailsContracts, ...detailsFromApi, ownerDetail} ;
    })))
    console.log("details: --> ",ownedContentDetails)
  },[])
  // useEffect(async()=>{
  //   const resContract = await getContentFromContracts(props.addr) ;
  //   console.log("contract result "+resContract);
  //   setOwnedContentDetails(await Promise.all(resContract.map(async (address) =>{
  //     const detailsContracts = await getContentDetailsFromContracts(address, props.addr) ;
  //     const detailsFromApi = await fetch('http://localhost:4000/content/'+address)
  //     .then(response => response.json()) ;
  //     console.log("one: "+detailsContracts[0]+"\ntwo: "+detailsFromApi[0])
  //     return {...detailsContracts, ...detailsFromApi} ;
  //   })))
  //   console.log("details: --> "+ ownedContentDetails)
  // },[]);
  return(
    <div className="container-fluid mt-4">
      <div>
        <h3 className="heading_3 border-bottom pb-2">Content Owned</h3>
      </div>
      
      <div className="row">
        { ownedContentDetails ? (ownedContentDetails.map((a,b)=>{
          return (
            <div className=" col-md-4 col-lg-3 my-4 " key={b}>
              <ContentCard type={a.data.type} img={`http://localhost:4000/thumbnail/${a.data.thumbnail}`} title={a.data.title} authorImg={`http://localhost:4000/profileImgs/${a.ownerDetail.data.img}`} author={a.ownerDetail.data.name} prices={a.prices} />
            </div>
          );
        })) : (
          <div className="container">
            <div className="d-flex flex-column justify-content-center align-items-center p-5 border my-3 ">
              <img src={noContent} alt="no content" width="200rem" className="m-1" />
              <h3>No Content Avalible</h3>
            </div>
          </div>
        )  }
          
          {/* <div className=" col-md-4 col-lg-3 mt-4 ">
           <ContentCard type="video" img="https://placehold.co/600x400" title="title of image is given" authorImg="https://placehold.co/400x400" author="Iqbal" price={122} /> 
          </div>
          <div className=" col-md-4 col-lg-3 mt-4 ">
           <ContentCard type="video" img="https://placehold.co/600x400" title="title of image is given" authorImg="https://placehold.co/400x400" author="Iqbal" price={122} /> 
         </div>
        <div className=" col-md-4 col-lg-3 mt-4 ">
          <ContentCard type="video" img="https://placehold.co/600x400" title="title of image is given" authorImg="https://placehold.co/400x400" author="Iqbal" price={122} /> 
        </div>
        <div className=" col-md-4 col-lg-3 mt-4 ">
          <ContentCard type="video" img="https://placehold.co/600x400" title="title of image is given" authorImg="https://placehold.co/400x400" author="Iqbal" price={122} /> 
        </div>
        <div className=" col-md-4 col-lg-3 mt-4 ">
          <ContentCard type="video" img="https://placehold.co/600x400" title="title of image is given" authorImg="https://placehold.co/400x400" author="Iqbal" price={122} /> 
        </div>
        <div className=" col-md-4 col-lg-3 mt-4 ">
          <ContentCard type="video" img="https://placehold.co/600x400" title="title of image is given" authorImg="https://placehold.co/400x400" author="Iqbal" price={122} /> 
        </div> */}
      </div>
      {ownedContentDetails?console.log("owned ",ownedContentDetails)
        :console.log("need time")
      }
    </div>
  );
}

function ProfileLayout(props){
  const [isOwner, setIsOwner] = useState(false) ;
  const [userData, setUserData] = useState(null) ;
  const {id} = useParams() ;
  const navi = useNavigate();
  useEffect(() => {
    async function fetchUserData() {
      if(id == null) return
      if (id === props.addr) {
        setIsOwner(true);
      }
      const ownerDetail = await fetch("http://localhost:4000/userInfo", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ethAddress: id }),
      });
      const data = await ownerDetail.json();
      if (data.data !== null) {
        setUserData(data.data);
      } else {
        navi("/");
      }
    }
  
    fetchUserData();
  }, [id, props.addr]);
  
  return(
    <div>
      <Outlet context={[isOwner, userData]}  />
      <OwnedContent addr={id}/>
    </div>
  )
}

export {Profile, Editing, ProfileLayout}
