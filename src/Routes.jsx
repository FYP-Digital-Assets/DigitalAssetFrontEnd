import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import profileIcon from "./assets/profile.svg"

import AppLayout from "./AppLayout.jsx";
import { Editing, Profile, ProfileLayout } from "./Pages/Profile.jsx";
const Info = React.lazy(() => import("./Pages/Info.jsx"));
const PageNotFound = React.lazy(() => import("./Pages/PageNotFound.jsx"));
import ContentDetail from "./Pages/ContentDetail";
import Web3 from 'web3';
import { Upload } from "./Components/Upload";
import { ContentPage, ContentPanel } from "./Components/ContentPage";
import Explore from "./Pages/Explore";


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
            console.log(account.data.img)
            setImageUrl("http://localhost:4000/ProfileImgs/"+(account.data.img))
           
            props.setUserName(account.data.name)
            
           
            setUserBio(account.data.bio)
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
  window.ethereum.on('accountsChanged', async () => {
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
          console.log(account.data.img)
          setImageUrl("http://localhost:4000/ProfileImgs/"+(account.data.img))
         
          props.setUserName(account.data.name)
          
         
          setUserBio(account.data.bio)
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
  });
  const details = {
    content:{clip:"", title:"Content Title", 
    description:"Hello this is description", prices:[120, 10, 0], address:"cid",
    clip:"QmYog8dP2hJpgQXvfFes6CfhT64fgzoksG4K3CPAt3PMFC", type:"video/mp4", ext:["mp4","mp4"],
    view:100, licensor:20,
  },
  owners:[{name:"iqbal", img:"https://placehold.co/400x400/red/white", price:"121 eth", address:"12121212" },
      {name:"shankar", img:"https://placehold.co/400x400/blue/white", price:"121 eth", address:"12121212" },
      {name:"javeria", img:"https://placehold.co/400x400/yellow/white", price:"minted", address:"12121212" }]
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout auth={isAuth} setAuth={setAuth} setAddr={setAddr} addr={addr} imageUrl={imageUrl} setImageUrl={setImageUrl} setUserBio={setUserBio} setUserName={props.setUserName} bal={bal} setBal={setBal} />} >
            <Route index element={<Info />} />
            <Route path="info" element={<Info />} />
            <Route path="*" element={<PageNotFound />} />
            
            
            <Route path="auth" element={<ContentDetail {...details} />} />
            <Route path="upload" element={<Upload addr={addr} auth={isAuth}/>} />
            <Route path="content" element={<Explore/>} >
                <Route path='video' element={<ContentPanel addr={addr} contentType="video" />} />
                <Route path='audio' element={<ContentPanel addr={addr} contentType="audio" />} />
                <Route path='image' element={<ContentPanel addr={addr} contentType="image" />} />
                <Route path='document' element={<ContentPanel addr={addr} contentType="document" />} />
            </Route>
            {/* <Route path="profile" element={<ProfileLayout auth={isAuth} addr={addr}/>} >
              <Route index element={<Profile isOwner={true} addr={addr} auth={isAuth} imageUrl={imageUrl} userName={props.userName} des={userBio} />} />
              <Route path="Editing" element={<Editing addr={addr} auth={isAuth} imageUrl={imageUrl} userName={props.userName} des={userBio} handleChangeEdit={handleChangeEdit} />} />
            </Route> */}
            <Route path="profile/:id" element={<ProfileLayout isOwner={false} addr={addr}/>} >
              <Route index element={<Profile addr={addr} />} />
              <Route path="editing" element={<Editing addr={addr} auth={isAuth} imageUrl={imageUrl} userName={props.userName} des={userBio} handleChangeEdit={handleChangeEdit} />} />
            </Route>
            
          </Route>

        </Routes>

      </BrowserRouter>

    </>

  );
};
export default ProjectRoutes;
