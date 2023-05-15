
import './App.css'
import { useEffect, useState } from 'react';

import  ProjectRoutes  from "./Routes" ;
function App() {
  var [userName, setUserName] = useState("Name") ;
  const [addr, setAddr] = useState(null);
  useEffect(()=>{
    console.log(`first in app: `, `local ${localStorage.getItem('DAUserID')}`) ;
    const response = async() =>{
      const res1 = await fetch('http://localhost:4000/digitalAssetContract') ;
      const digital_asset = await res1.json() ;
      localStorage.setItem('Digital_Asset', JSON.stringify(digital_asset));
      const res2 = await fetch('http://localhost:4000/assetContract') ;
      const asset = await res2.json() ;
      localStorage.setItem('Asset', JSON.stringify(asset));
    }
    response();
    const handleTabClose = event => {
      event.preventDefault();
  
      console.log('beforeunload event triggered');
      if(localStorage.getItem('DAUserID')){
        fetch('http://localhost:4000/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ethAddress: localStorage.getItem('DAUserID')
          })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Logout failed');
          }
          else{
            localStorage.setItem('DAUserID', null) ;
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
  
      return (event.returnValue ='Are you sure you want to exit?');
    };
  
    window.addEventListener('beforeunload', handleTabClose);
  
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };

  }) ;
  return (
    <div className="App"> 
      
        <ProjectRoutes userName={userName} setUserName={setUserName} addr={addr} setAddr={setAddr} / >  
      
     
    </div>
  ) ;
}

export default App
