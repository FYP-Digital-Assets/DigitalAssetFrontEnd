import {Button} from 'react-bootstrap';

import uploadIcon from "./uploadIcon.png"
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import Web3 from "web3";
export function Upload(props){
    const reader = new FileReader();
    const [file, setFile] = useState(null);
    const [preFile, setPreFile] = useState(null);
    const [thumbFile, setThumbFile] = useState(null);
    const [preFilename, setPreFilename] = useState(uploadIcon);
    const [thumbFilename, setThumbFilename] = useState(uploadIcon);
    const [show, setShow] = useState(null);
    const handleClose = () => setShow(false);
    const [filename, setFilename] = useState(uploadIcon);
    const [fileType, setFileType] = useState("image/png");
    const [preExt, setPreExt] = useState('')
    const [mainExt, setMainExt] = useState('')
    const [isPurchase, setIsPurchase] = useState(false);

    const navi = useNavigate();
    useEffect(()=>{
      if(props.auth == false) navi("/")
    }, []) ;

    const handlePurchaseChange = () => {
      setIsPurchase(!isPurchase);
    };
    const [isView, setIsView] = useState(false);

    const handleViewChange = () => {
      setIsView(!isView);
    };
    const [isLicense, setIsLicense] = useState(false);

    const handleLicenseChange = () => {
      setIsLicense(!isLicense);
    };

    const handleSubmit = async(event)=> {
        event.preventDefault();
        
        const mainContent = new FormData();
        const title = document.getElementById("titleTxt").value;
        const description = document.getElementById("descriptionTxt").value;
        
        // const price = Number(document.getElementById("priceTxt").value);
        mainContent.append('file', file);
        const response = await fetch("http://localhost:4000/uploadMainContent",{
          method: 'POST',
          body: mainContent,
          credentials:"include"
        });
        if(response.ok){
          const mainContentCid = await response.json();
          mainContentCid.cid ;
          const clipContent = new FormData();
          clipContent.append('file', preFile);

          const response1 = await fetch("http://localhost:4000/uploadClipContent",{
            method: 'POST',
            body: clipContent,
            credentials:"include"
          });
          if(response1.ok){
            const clipContentCid = await response1.json() ;
            console.log(clipContentCid) ;
            const contentDetails = new FormData();
            contentDetails.append('file', thumbFile);
            
            //contentDetails.append('clip', clipContentCid.cid) ;
            //contentDetails.append('description', description) ;
            //contentDetails.append('title', title) ;

              var pricePurchase = 0 ;
              var priceView = 0 ;
              var priceLicense = 0 ;
              if(isPurchase)
                pricePurchase = document.getElementById("pricePurchaseTxt").value;

              if(isView)
                pricePurchase = document.getElementById("priceViewTxt").value;
              
              if(isLicense)
                priceLicense = document.getElementById("priceLicenseTxt").value;
            
                if(mainContentCid.code != "200"){
              alert("Content already exist")
            }
            const addrofContract = await executeContract(props.addr, mainContentCid.cid, pricePurchase, priceView, priceLicense )
            //contentDetails.append('address', addrofContract) ;
            //contentDetails.append('type', fileType)
            //contentDetails.append('ext', [preFilename.substr(preFilename.lastIndexOf('.')+1),filename.substr(filename.lastIndexOf('.')+1)])
            const obj = {clip:clipContentCid.cid, description, title, address:addrofContract, type:fileType, ext:[preExt,mainExt]}
            console.log("req obj ", obj)
            //console.log("adderss:   ------ below")
            //console.log(addrofContract)
            contentDetails.append('obj', JSON.stringify(obj))
            
            const response3 = await fetch("http://localhost:4000/uploadContent",{
              method: 'POST',
              body: contentDetails,
              credentials:"include"
            });
            if(response3.ok){
              const mainContentCid1 = await response3.json();
              
             setShow(true)

            }
            else{
              alert("failed to upload content")
            }
            
          }else{
            alert("Faild to upload clip content")
          }
        }
        else{
          alert("Failed to upload content") ;
        }
        
        //store it on server and store record
      }
    const handleFileChange = (event) => {

      reader.onload = (event) => {
      
      setFilename(event.target.result);
      //image.style.width = "80%";
      };
      reader.readAsDataURL(event.target.files[0]);
      setFileType(event.target.files[0].type);
      let {name} = event.target.files[0]
      setMainExt(name.substr(name.lastIndexOf('.')+1))
      // Perform any other actions with the selected file
      setFile(event.target.files[0]);
    };

    const handlePreFileChange = (event) => {

      reader.onload = (event) => {
        setPreFilename(event.target.result);
        
      };
      reader.readAsDataURL(event.target.files[0]);
      let {name} = event.target.files[0]
      setPreExt(name.substr(name.lastIndexOf('.')+1))
      setPreFile(event.target.files[0]);
    };
    const handleThumbFileChange = (event) => {

      reader.onload = (event) => {
        setThumbFilename(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setThumbFile(event.target.files[0]);
    };
    
    if(props.auth == false)
      return alert("not loggedIn...")
    else{
    
    return (
      <div className='container '>
        <form className='row ' onSubmit={handleSubmit}>
            <div className='col col-md-10 offset-md-1 offset-xl-0 col-xl-7 my-5 '>
              <div className='mb-3 border rounded p-2'>
                <div className='d-flex justify-content-between p-2 align-items-center'>
                  <h2 className='heading_3'>Content</h2>
                  <div>
                    <input  required className="form-control" type="file" onChange={handleFileChange}/>
                  </div>
                </div>
                <object data={filename} type={fileType} className='w-100 border rounded p-1 backgound-light' style={{"minHeight": "30rem"}}  >
                  <p>Preview not available</p>
                </object>
                <div className='d-flex justify-content-between p-2 align-items-center'>
                  <h2 className='heading_3 mt-4'>Preview content</h2>
                  <div>
                    <input  required className="form-control" type="file" onChange={handlePreFileChange}/>
                  </div>
                </div>
                <object data={preFilename} type={fileType} className='w-100 border rounded p-1 backgound-light' style={{"minHeight": "30rem"}}  >
                  <p>Preview not available</p>
                </object>

                <div className='d-flex justify-content-between p-1 align-items-center'>
                  <h2 className='heading_3 mt-4'>Thumbnail Image</h2>
                  <div>
                    <input accept="image/*" required className="form-control" type="file" onChange={handleThumbFileChange}/>
                  </div>
                </div>
                <div className='border p-1  rounded'>
                  <img className='w-100' src={thumbFilename} alt="" />
                </div>
              </div>
             
              
            </div>
            
            <div className='col col-md-10 offset-md-1 col-xl-5 offset-xl-0 border rounded p-3 my-5 backgound-light'>
              
                <div className=' mb-3 '>
                  <div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="purchaseCheckbox" checked = {isPurchase} onChange={handlePurchaseChange} />
                      <label className="form-check-label" htmlFor="purchaseCheckbox">Purchase Content</label>
                      {isPurchase ? 
                        <div className="form-group mb-3">
                          <div className=' p-1' >
                            <label htmlFor="pricePurchaseTxt" className='mb-1'>Price</label>
                            <input required type="number" className="form-control col-9" id="pricePurchaseTxt" aria-describedby="PriceHelp1" placeholder="Enter Price in Wei" />
                            <small id="PriceHelp1" className="form-text text-muted">price must be in Wei.</small>
                            
                          </div>
                        </div>:<></>
                      }
                    </div>
                    
                    
                    
                  </div>
                  <div >
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="ViewCheckBox" checked = {isView}  onChange={handleViewChange} />
                      <label className="form-check-label" htmlFor="ViewCheckBox">View Content</label>
                      {isView ? 
                        <div className="form-group mb-3">
                          <div className='p-1' >
                            <label htmlFor="priceViewTxt" className='mb-1'>Price</label>
                            <input type="number" required className="form-control col-9" id="priceViewTxt" aria-describedby="PriceHelp2" placeholder="Enter Price in Wei" />
                            <small id="PriceHelp2" className="form-text text-muted">price must be in Wei.</small>
                          </div>
                        </div>:<></>
                      }
                    </div>
                    
                    
                    
                  </div>

                  <div >
                    <div className="form-check form-switch ">
                      <input className="form-check-input" type="checkbox" id="LicenseCheckBox" checked = {isLicense} onChange={handleLicenseChange} />
                      <label className="form-check-label" htmlFor="LicenseCheckBox">License Content</label>
                      {isLicense ? 
                        <div className="form-group mb-3">
                          <div className='p-1' >
                            <label htmlFor="priceLicenseTxt" className='mb-1'>Price</label>
                            <input type="number" required className="form-control col-9" id="priceLicenseTxt" aria-describedby="PriceHelp3" placeholder="Enter Price in Wei" />
                            <small id="PriceHelp3" className="form-text text-muted">price must be in Wei.</small>
                          </div>
                        </div>:<></>
                      }
                      
                    </div>
                    
                    
                  </div>
                </div>
                
                <div className="form-group mb-3">
                  <label htmlFor="titleTxt" className='mb-1'>Title</label>
                  <input type="text" className="form-control" id="titleTxt" placeholder="Title" required />             
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="descriptionTxt" className='mb-1'>Description</label>
                  <textarea type="text" className="form-control" style={{height: "10rem"}}  id="descriptionTxt" placeholder="Description" required/>               
                </div>
                
                
                <Button id="uploadBtn" type='submit' >Upload</Button>
                
            </div>
           
            
              
              
          
        </form>
        
        
        
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>"Uploaded"</Modal.Title>
            </Modal.Header>
            <Modal.Body>your image uploaded successfully!</Modal.Body>
            <Modal.Footer>
              <Link to='/'><Button variant="primary" onClick={handleClose}>
                OK
              </Button></Link>
            </Modal.Footer>
          </Modal>
      </div>
    );}
  }

  async function executeContract(account, content_ref, sellingPrice, licencePrice, viewFee){
    const web3 = new Web3(window.ethereum);
    const dAsset = JSON.parse(localStorage.getItem("Digital_Asset"))
    const contract = new web3.eth.Contract(dAsset.abi, dAsset.address);
    //call function to 
    // console.log("account ", account)
    console.log("ref ", content_ref)
    // console.log("sp ", sellingPrice)
    // console.log("lp ", licencePrice)
    // console.log("vp ", viewFee)
    let address = 0
    await contract.methods.addContent(content_ref, sellingPrice, licencePrice, viewFee).send({from:account, gas:2000000})
    .on('receipt', (receipt) => {
                    // Check if the event was emitted
                  if (receipt.events.MyEvent) {
                    // Get the return value from the event
                    address = receipt.events.MyEvent.returnValues.value;
                  // return address
                  // console.log("contract in ", address)
                    // return returnValue;
                  }
            })
            // console.log("contract ", address)
            return address;
    }