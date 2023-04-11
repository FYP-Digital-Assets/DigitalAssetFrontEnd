
import './App.css'
import { useState } from 'react';

import  ProjectRoutes  from "./Routes" ;
function App() {
  var [userName, setUserName] = useState("Name") ;
  return (
    <div className="App"> 
      
        <ProjectRoutes userName={userName} setUserName={setUserName} / >  
      
     
    </div>
  ) ;
}

export default App
