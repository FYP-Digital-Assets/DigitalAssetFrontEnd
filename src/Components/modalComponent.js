import React, { useRef } from "react";
import ReactDom from "react-dom";
import Dropdown from "./ddown";
import "./App.css";

const options = [
  
  {value: "Metamask", label: "Metamask"},
  {value: "exodus", label: "Exodus"},
  {value: "coinbase", label: "coinbase"},
  {value: "mist", label: "Mist"},
  {value: "electrum", label: "Electrum"},
 ];


export const Modal = ({ setShowModal }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  
  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2> <Dropdown placeHolder="Select your Wallet"  options={options}/></h2>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};