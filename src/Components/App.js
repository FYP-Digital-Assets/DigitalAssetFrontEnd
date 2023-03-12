import React, { useState } from "react";
import "./App.css";
import { Modal } from "./modalComponent";
import Dropdown from "./ddown";

export default function App() {
  
    const options = [
  
      {value: "Metamask", label: "Metamask"},
      {value: "exodus", label: "Exodus"},
      {value: "coinbase", label: "coinbase"},
      {value: "mist", label: "Mist"},
      {value: "electrum", label: "Electrum"},
    ];
  
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  return (
    <div className="App" id="portal">
      <h1>Popup Modal</h1>
      <button onClick={openModal}>Open Modal</button>
      {showModal ? <Modal setShowModal={setShowModal} />  : null} 
    </div>
  );
}
