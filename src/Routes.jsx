import React,{ useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import profileIcon from "./assets/profile.svg"

import AppLayout from "./AppLayout.jsx";
import { Editing, Profile } from "./Pages/Profile.jsx";
const Info = React.lazy(() => import("./Pages/Info.jsx"));
const PageNotFound = React.lazy(() =>import("./Pages/PageNotFound.jsx")) ;
import ContentDetail from "./Pages/ContentDetail";

const ProjectRoutes = () => {

  
  // profile ediditng
  var [userName, setUserName] = useState("Name") ;
  const [userBio, setUserBio] = useState("description");
  const handleBioChange = (event) =>{
    setUserBio(() => event.target.value);
  }
  const handleNameChange = (event)=>{
    setUserName(()=> event.target.value) ;
  }
  var [imageUrl, setImageUrl] = useState(profileIcon);
  const handleFileChange = (event)=> {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setImageUrl(() => imageUrl);
    };

    reader.readAsDataURL(file);
  }


  const [isAuth, setAuth] = useState(false);
  const [addr , setAddr] = useState("43443") ;
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout auth = {isAuth} setAuth={setAuth} setAddr={setAddr} addr={addr} imageUrl={imageUrl} />} >
            <Route index element={!isAuth?(<Info />):(<Profile addr={addr} auth = {isAuth} imageUrl={imageUrl} userName={userName} des={userBio}/>) } />  
            <Route path="/info" element={<Info />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/Profile" element={<Profile addr={addr} auth = {isAuth} imageUrl={imageUrl} userName={userName} des={userBio} />} />
            <Route path="/Profile/Editing" element={<Editing auth = {isAuth} handleFileChange={handleFileChange} imageUrl={imageUrl} userName={userName} handleNameChange={handleNameChange} des={userBio} handleBioChange={handleBioChange}/>} />
            <Route path="/auth" element={<ContentDetail img={profileIcon} name={userName} address={addr} />} />
          </Route>
          
        </Routes>
        
      </BrowserRouter>
     
      </>
      
  );
};
export default ProjectRoutes;
