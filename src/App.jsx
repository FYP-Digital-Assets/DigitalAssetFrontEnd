
import './App.css'
import { useEffect, useState } from 'react';

import  ProjectRoutes  from "./Routes" ;
function App() {
  var [userName, setUserName] = useState("Name") ;
  const [addr, setAddr] = useState("43443");
  useEffect(()=>{
    const response = async() =>{
      const res1 = await fetch('http://localhost:4000/digitalAssetContract') ;
      const digital_asset = await res1.json() ;
      localStorage.setItem('Digital_Asset', JSON.stringify(digital_asset));
      const res2 = await fetch('http://localhost:4000/assetContract') ;
      const asset = await res2.json() ;
      localStorage.setItem('Asset', JSON.stringify(asset));
    }
    response();
   
  }) ;
  return (
    <div className="App"> 
      
        <ProjectRoutes userName={userName} setUserName={setUserName} addr={addr} setAddr={setAddr} / >  
      
     
    </div>
  ) ;
}

export default App
