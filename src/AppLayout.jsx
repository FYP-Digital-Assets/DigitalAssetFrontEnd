import React, { useState } from "react";
import {Outlet, useNavigate} from "react-router-dom" ;
import Navbar from "./Components/Navbar";
import Modal from "./Components/Modal";
import WalletOffcanvase from "./Components/WalletOffcanvase"
import { useRef } from "react";
const AppLayout = (props)=> {
    // offcanvase variables
    const [showOffcanvase, setShowOffcanvase] = useState(false);
    const handleShowOffcanvase = () => setShowOffcanvase(true);

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
        <Navbar show_modal={show_modal} handleShowOffcanvase={handleShowOffcanvase} />
        <React.Suspense fallback={<>Loading...</>}>
            <WalletOffcanvase setShowOffcanvase={setShowOffcanvase} showOffcanvase={showOffcanvase} auth={props.auth} />
            <Modal close_modal={close_modal} close_reference_modal={close_reference_modal} setAddr={props.setAddr} auth={props.auth} setAuth={props.setAuth}/>
            <Outlet/>
        </React.Suspense>
    </>
)}

export default AppLayout ;