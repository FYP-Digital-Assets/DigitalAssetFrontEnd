import React, { useState } from "react";
import {Outlet, useNavigate} from "react-router-dom" ;
import Navbar from "./Components/Navbar";
import Modal from "./Components/Modal";
import WalletOffcanvase from "./Components/WalletOffcanvase"
import { useRef } from "react";
import Web3 from 'web3';
const AppLayout = (props)=> {
    

    // wallet connecting
    const [bal, setBal] = useState(0);
    const ConnectToWallet = async() => {
        try{
          console.log("web3 start")
          const web3 = new Web3(window.ethereum);
          console.log("web3 done")
          const isMetaMask = web3.currentProvider.isMetaMask;
          console.log(web3.currentProvider)
          console.log("check for metamask")
          console.log(isMetaMask)
          if(isMetaMask){
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
            const balance = await web3.eth.getBalance(address);
            setBal(web3.utils.fromWei(balance, 'ether'));
            props.setAddr(address) ;
            props.setAuth(true) ;
            close_modal();
          }
          else{
            window.open('https://metamask.io/download/', '_blank', 'noreferrer');
          }
          
        }catch(err){
          console.log(err);
          console.log("hello")
        }
    }

    // offcanvase variables
    const [showOffcanvase, setShowOffcanvase] = useState(false);
    const handleShowOffcanvase = () => {
      setShowOffcanvase(true)
      close_modal()
    };

    const navigation = useNavigate();
    const close_reference_modal = useRef() ;
    const close_modal =()=>{
        close_reference_modal.current.style.display = "none" ;
    }
    const show_modal = () =>{
        if(props.auth){
            navigation("/Profile") ;
        }else{close_reference_modal.current.style.display = "block" }
        
    }
    return (<>
        <Navbar show_modal={show_modal} handleShowOffcanvase={handleShowOffcanvase} imageUrl={props.imageUrl} />
        <React.Suspense fallback={
          <div className="d-flex justify-content-center align-items-center loading">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        }>
            <WalletOffcanvase setShowOffcanvase={setShowOffcanvase} showOffcanvase={showOffcanvase} auth={props.auth} ConnectToWallet={ConnectToWallet} balance={bal} addr={props.addr}/>
            <Modal close_modal={close_modal} close_reference_modal={close_reference_modal} ConnectToWallet={ConnectToWallet}/>
            <Outlet/>
        </React.Suspense>
    </>
)}

export default AppLayout ;