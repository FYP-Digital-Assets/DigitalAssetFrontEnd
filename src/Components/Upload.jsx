import {Button} from 'react-bootstrap';
import { useRef } from 'react';
import uploadIcon from "./uploadIcon.png"
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
export function Upload(prop){
    const fileInputRef = useRef(null);
    const reader = new FileReader();
    const [file, setFile] = useState(null);
    const [show, setShow] = useState(null);
    const handleClose = () => setShow(false);
    const [filename, setFilename] = useState(uploadIcon);
    const [fileType, setFileType] = useState("image/png");

    const [isPurchase, setIsPurchase] = useState(false);

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

    const handleClick = () => {
      fileInputRef.current.click();
    };
    const handleSubmit = async(event)=> {
        event.preventDefault();
        
        const formData = new FormData();
        // const title = document.getElementById("titleTxt").value;
        // const description = document.getElementById("descriptionTxt").value;
        // const price = Number(document.getElementById("priceTxt").value);
        formData.append('file', file);
        const response = await fetch("http://localhost:4000/uploadMainContent",{
          method: 'POST',
          body: formData,
          credentials:"include"
        });
        if(response.ok){
          const jsonData = await response.json();
          console.log(jsonData);
          setShow(true)
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
      // Perform any other actions with the selected file
      setFile(event.target.files[0]);
    };
    
    return (
      <div className='container d-flex flex-column p-5 '>
        <div className='row'>
          <div className='col col-md-10 offset-md-1 col-xl-8 offset-xl-2 border  rounded p-2 my-2'>
            <object data={filename} type={fileType} className='w-100 border' style={{"minHeight": "30rem"}} >
              <p>Preview not available</p>
            </object>
            <Button onClick={handleClick} id="uploadBtn">Browse</Button>
          </div>
          
          <div className='col col-md-10 offset-md-1 col-xl-8 offset-xl-2 border rounded p-3 mb-5 backgound-light'>
            {file?<>
              <div className='d-flex justify-content-between mb-3'>
                <div >
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="purchaseCheckbox" checked = {isPurchase} onChange={handlePurchaseChange} />
                    <label className="form-check-label" htmlFor="purchaseCheckbox">Purchase Content</label>
                  </div>
                  
                  {isPurchase ? 
                    <div className="form-group mb-3">
                      <div className=' p-1' >
                        <label htmlFor="pricePurchaseTxt" className='mb-1'>Price</label>
                        <input type="number" className="form-control col-9" id="pricePurchaseTxt" aria-describedby="PriceHelp1" placeholder="Enter Price in Wei" />
                        <small id="PriceHelp1" className="form-text text-muted">price must be in Wei.</small>
                      </div>
                    </div>:<></>
                  }
                  
                </div>
                <div >
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="ViewCheckBox" checked = {isView} onChange={handleViewChange} />
                    <label className="form-check-label" htmlFor="ViewCheckBox">View Content</label>
                  </div>
                  
                  {isView ? 
                    <div className="form-group mb-3">
                      <div className='p-1' >
                        <label htmlFor="priceViewTxt" className='mb-1'>Price</label>
                        <input type="number" className="form-control col-9" id="priceViewTxt" aria-describedby="PriceHelp2" placeholder="Enter Price in Wei" />
                        <small id="PriceHelp2" className="form-text text-muted">price must be in Wei.</small>
                      </div>
                    </div>:<></>
                  }
                  
                </div>

                <div >
                  <div className="form-check form-switch ">
                    <input className="form-check-input" type="checkbox" id="LicenseCheckBox" checked = {isLicense} onChange={handleLicenseChange} />
                    <label className="form-check-label" htmlFor="LicenseCheckBox">License Content</label>
                  </div>
                  
                  {isLicense ? 
                    <div className="form-group mb-3">
                      <div className='p-1' >
                        <label htmlFor="priceLicenseTxt" className='mb-1'>Price</label>
                        <input type="number" className="form-control col-9" id="priceLicenseTxt" aria-describedby="PriceHelp3" placeholder="Enter Price in Wei" />
                        <small id="PriceHelp3" className="form-text text-muted">price must be in Wei.</small>
                      </div>
                    </div>:<></>
                  }
                  
                </div>
              </div>
              
              <div className="form-group mb-3">
                <label htmlFor="titleTxt" className='mb-1'>Title</label>
                <input type="text" className="form-control" id="titleTxt" placeholder="Title" />               
              </div>
              <div className="form-group mb-2">
                <label htmlFor="descriptionTxt" className='mb-1'>Description</label>
                <textarea type="text" className="form-control" style={{height: "10rem"}}  id="descriptionTxt" placeholder="Description" />               
              </div>
              
              
              <Button id="uploadBtn" onClick={handleSubmit} >Upload</Button>
              </>:<></>
            }
          </div>
          
          <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            
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
      
      </div>
    );
  }
