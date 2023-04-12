import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import profileIcon from "./assets/profile.svg"

import AppLayout from "./AppLayout.jsx";
import { Editing, Profile } from "./Pages/Profile.jsx";
const Info = React.lazy(() => import("./Pages/Info.jsx"));
const PageNotFound = React.lazy(() => import("./Pages/PageNotFound.jsx"));
import ContentDetail from "./Pages/ContentDetail";
import Web3 from 'web3';

const ProjectRoutes = (props) => {
  const [bal, setBal] = useState(0);
  //on load
  useEffect(() => {
    const checkConnection = async () => {

      // Check if browser is running Metamask
      let web3;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      };

      // Check if User is already connected by retrieving the accounts
      const accounts = await web3.eth.getAccounts();
      console.log("hello 99");
      if (accounts.length !== 0) {
        const address = accounts[0];
        console.log("addr: " + address);
        const user = {user:"87498789749794797"}
        fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })
          .then(async account => {
            console.log(account)
            account = await account.json()
            console.log("next")

            //console.log(account._id);
            console.log(account)
            setAccount(account.ethAddress);
            if (account.profile) {
              setImageUrl("http://localhost:4000/uploads/" + account.profile);
            }
            if (account.name) {
              setName(account.name);
            }

          })
          .catch(error => {
            console.error('Error connecting account ', error);
          });

        const balance = await web3.eth.getBalance(address);

        setBal(web3.utils.fromWei(balance, 'ether'));
        setAddr(address);
        setAuth(true);

      }
    };
    checkConnection();
  }, []);

  // profile ediditng
  const [userBio, setUserBio] = useState("description");
  const handleBioChange = (event) => {
    setUserBio(() => event.target.value);
  }
  const handleNameChange = (event) => {
    props.setUserName(() => event.target.value);
  }
  var [imageUrl, setImageUrl] = useState(profileIcon);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setImageUrl(() => imageUrl);
    };

    reader.readAsDataURL(file);
  }


  const [isAuth, setAuth] = useState(false);
  const [addr, setAddr] = useState("43443");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout auth={isAuth} setAuth={setAuth} setAddr={setAddr} addr={addr} imageUrl={imageUrl} bal={bal} setBal={setBal} />} >
            <Route index element={!isAuth ? (<Info />) : (<Profile addr={addr} auth={isAuth} imageUrl={imageUrl} userName={props.userName} des={userBio} />)} />
            <Route path="/info" element={<Info />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/Profile" element={<Profile addr={addr} auth={isAuth} imageUrl={imageUrl} userName={props.userName} des={userBio} />} />
            <Route path="/Profile/Editing" element={<Editing auth={isAuth} handleFileChange={handleFileChange} imageUrl={imageUrl} userName={props.userName} handleNameChange={handleNameChange} des={userBio} handleBioChange={handleBioChange} />} />
            <Route path="/auth" element={<ContentDetail img={profileIcon} name={props.userName} address={addr} />} />
          </Route>

        </Routes>

      </BrowserRouter>

    </>

  );
};
export default ProjectRoutes;
