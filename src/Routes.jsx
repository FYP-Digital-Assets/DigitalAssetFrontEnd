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
  const [isAuth, setAuth] = useState(false);
  //on load
  useEffect(() => {
    const checkConnection = async () => {
      if(isAuth) return;
      // Check if browser is running Metamask
      let web3;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      };

      // Check if User is already connected by retrieving the accounts
      const accounts = await web3.eth.getAccounts();
      if (accounts.length !== 0) {
        const address = accounts[0];
        console.log("addr: " + address);
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
            setAddr(account.data.ethAddress);
            console.log(account.data.ethAddress)
            if (account.data.profile) {
              setImageUrl("http://localhost:4000/uploads/" + account.data.profile);
            }
            props.setUserName(account.data.name);
            
           
            setUserBio(account.data.bio);
            setAuth(true)
            
            

          })
          .catch(error => {
            console.error('Error connecting account ', error);
          });
          const balance = await web3.eth.getBalance(address);
          setBal(web3.utils.fromWei(balance, 'ether'));
      }
      else{
        console.log("Not connected...")
      }
    };
    checkConnection();
  }, [] );

  // profile ediditng
  const [userBio, setUserBio] = useState("description");
 
 
  var [imageUrl, setImageUrl] = useState(profileIcon);
  


  
  const [addr, setAddr] = useState("43443");
  const handleChangeEdit = (n, b, i) => {
    setUserBio(() => b);
    setImageUrl(() => i) ;
    props.setUserName(() => n) ;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout auth={isAuth} setAuth={setAuth} setAddr={setAddr} addr={addr} imageUrl={imageUrl} setImageUrl={setImageUrl} setUserBio={setUserBio} setUserName={props.setUserName} bal={bal} setBal={setBal} />} >
            <Route index element={!isAuth ? (<Info />) : (<Profile addr={addr} auth={isAuth} imageUrl={imageUrl} userName={props.userName} des={userBio} />)} />
            <Route path="/info" element={<Info />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/Profile" element={<Profile addr={addr} auth={isAuth} imageUrl={imageUrl} userName={props.userName} des={userBio} />} />
            <Route path="/Profile/Editing" element={<Editing addr={addr} auth={isAuth} imageUrl={imageUrl} userName={props.userName} des={userBio} handleChangeEdit={handleChangeEdit} />} />
            <Route path="/auth" element={<ContentDetail img={profileIcon} name={props.userName} address={addr} />} />
          </Route>

        </Routes>

      </BrowserRouter>

    </>

  );
};
export default ProjectRoutes;
