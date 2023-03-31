import React, { useState } from "react";
import {Outlet, useNavigate} from "react-router-dom" ;
import Navbar from "./Components/Navbar";
import Modal from "./Components/Modal";
import { useRef } from "react";
const AppLayout = (props)=> {
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
        <Navbar show_modal={show_modal}/>
        <React.Suspense fallback={<>Loading...</>}>
            <Modal close_modal={close_modal} close_reference_modal={close_reference_modal}/>
            <Outlet/>
        </React.Suspense>
    </>
)}

export default AppLayout ;