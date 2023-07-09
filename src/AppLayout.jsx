import React, { useState } from "react";
import {Outlet, useNavigate} from "react-router-dom" ;
import Navbar from "./Components/Navbar";
import Modal from "./Components/Modal";
import WalletOffcanvase from "./Components/WalletOffcanvase"
import { useRef} from "react";
import Web3 from 'web3';
import Footer from "./Components/Footer";
const AppLayout = (props)=> {
    
  
    
    // wallet connecting
    
    const ConnectToWallet = async() => {
        try{
          const web3 = new Web3(window.ethereum);
          const isMetaMask = web3.currentProvider.isMetaMask;
          if(isMetaMask){
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
            console.log(`in first log: addrwallet ${address} `, `local ${localStorage.getItem('DAUserID')}`, ` isAuth ${props.auth}`) ;
            const balance = await web3.eth.getBalance(address);
            const user = {user:address}
            fetch('http://localhost:4000/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
              credentials:"include"
            })
              .then(async account => {
                
                console.log(account)
                console.log("header : ", account.headers.has('Set-Cookie'));
                account = await account.json()
                console.log("next")
                if(account.code === 500){
                  console.log(alert(account.msg));
                  return;
                }
                //console.log(account._id);
                console.log(account)
                localStorage.setItem('DAUserID', account.data.ethAddress);
                props.setAddr(account.data.ethAddress);
                console.log(account.data.ethAddress)
                props.setImageUrl("http://localhost:4000/ProfileImgs/"+(account.data.img))
                props.setUserName(account.data.name);
                props.setUserBio(account.data.bio);
                props.setAuth(true)
              })
              .catch(error => {
                console.error('Error connecting account ', error);
              });
            props.setBal(web3.utils.fromWei(balance, 'ether'));
            close_modal();
          }
          else{
            window.open('https://metamask.io/download/', '_blank', 'noreferrer');
          }
          
        }catch(err){
          console.log(err);
          console.log("hello")
        }
        console.log(`after first log: `, `local ${localStorage.getItem('DAUserID')}`, ` isAuth ${props.auth}`) ;
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
            navigation(`profile/${props.addr}`) ;
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
            <WalletOffcanvase setShowOffcanvase={setShowOffcanvase} showOffcanvase={showOffcanvase} auth={props.auth} ConnectToWallet={ConnectToWallet} balance={props.bal} addr={props.addr}/>
            <Modal close_modal={close_modal} close_reference_modal={close_reference_modal} ConnectToWallet={ConnectToWallet}/>
            <Outlet/>
            <Footer />
        </React.Suspense>
    </>
)}

export default AppLayout ;