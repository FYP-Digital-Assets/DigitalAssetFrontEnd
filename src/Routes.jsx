import React,{ useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";


import AppLayout from "./AppLayout.jsx";
import { Editing, Profile } from "./Pages/Profile.jsx";
const Info = React.lazy(() => import("./Pages/Info.jsx"));
const PageNotFound = React.lazy(() =>import("./Pages/PageNotFound.jsx")) ;

const ProjectRoutes = () => {
  const [isAuth, setAuth] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout auth = {isAuth}/>} >
            <Route index element={<Info />} />  
            <Route path="/info" element={<Info />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/Profile" element={<Profile auth = {isAuth}/>} />
            <Route path="/Profile/Editing" element={<Editing auth = {isAuth}/>} />
          </Route>
          
        </Routes>
        
      </BrowserRouter>
     
      </>
      
  );
};
export default ProjectRoutes;
