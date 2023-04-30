import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
// images imports
import ledger from "../assets/ledger-icon.png"
import metamask_icon from "../assets/metamask-icon.svg"
import Phantom from "../assets/Phantom.svg"
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Web3 from 'web3';

export default function WalletOffcanvase(props) {   
    const handleClose = () => props.setShowOffcanvase(false);
    
  
    return (
        <Offcanvas show={props.showOffcanvase} onHide={handleClose} placement="end" >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Wallet</Offcanvas.Title>
            </Offcanvas.Header>
            <hr/>
            <Offcanvas.Body >
                {props.auth ? (<Connected balance={props.balance} addr={props.addr}/>):(<NotConnected ConnectToWallet={props.ConnectToWallet } />)}
            </Offcanvas.Body>
        </Offcanvas>
    );
  }
function Connected(props) {  
    const copy = async () => {
        await navigator.clipboard.writeText(props.addr);
        setShow(true)
        setTimeout(()=> setShow(false), 1000);
      }
      const target = useRef(null);
      const [show, setShow] = useState(false);
      const [modalShow, setModalShow] = useState(false);
    return (
        <div className=''>
            <div>
                <div className='text-muted address-text d-flex justify-content-between align-items-center'  >
                    <span className='btn btn-info btn-sm' >logout</span>
                    <div onClick={copy} ref={target}>{props.addr.substr(0,6)}...{props.addr.substr(-4, 4)}</div>
                    
                </div>
                <Overlay target={target.current} show={show} placement="top">
                    {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                            copied!
                        </Tooltip>
                    )}
                </Overlay>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center border border-secondary rounded mt-5 p-2'>
                <div className='text-muted mb-2'>Total Balances</div>
                
                <p className='body-text-bold'>{props.balance} eth</p>
            </div>
            <div className='rounded p-2 body-text-bold text-light add-fund-btn' align="center" onClick={() => setModalShow(true)}> Add Fund</div>
            <MyVerticallyCenteredModal
                addr={props.addr}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
}
function NotConnected(props) {  
    const walletList = [];
    walletList.push({name:"Metamask", icon:metamask_icon});
    walletList.push({name:"Ledger", icon:ledger});
    walletList.push({name:"Phantom", icon:Phantom});
    walletList.push({name:"Core", icon:Phantom});   
    return (
        <div className=''> 
        <p align="center">If you don't have a <span className='text-primary'>wallet</span> yet, you can select a provider and create one now.</p>      
        <br />     
            {walletList.map((wallet, i)=>{
                return (
                    // each row of modal body
                    <div className="modal_table_row2" key={wallet.name} onClick={props.ConnectToWallet}>
                        <div className="modal_wallet_img3">{<img className="modal_wallet_img2" src={wallet.icon}/>}</div>
                        <div>{wallet.name}</div>
                    </div>
                );
            })}
            
        </div>
    );
}

function MyVerticallyCenteredModal(props) {
    const copy = async ()=>{
        await navigator.clipboard.writeText(props.addr);
    }
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Fund
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4></h4>
          <p align="center">
          Transfer funds from an exchange or another wallet to your wallet address below:
          </p>
        </Modal.Body>
        <Modal.Footer>
            <p className='border border-secondary rounded py-2 px-1 text-muted'>{props.addr}</p>
          <Button onClick={copy}>Copy</Button>
        </Modal.Footer>
      </Modal>
    );
  }