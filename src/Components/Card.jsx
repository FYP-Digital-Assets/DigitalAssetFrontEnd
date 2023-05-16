import React, { useState } from 'react';
import './AboutUs.css';


const Card = ({ user }) => {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleMouseEnter = () => {
    setShowPopUp(true);
  };

  const handleMouseLeave = () => {
    setShowPopUp(false);
  };

  return (
    <div className="about-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={user.picture} alt={user.name} />
      <div className="about-card-content">
      
        <h2>{user.name}</h2>
        
        <button>More</button>
      </div>
      {showPopUp && (
        <div className="pop-up1">
          <p>{user.bio}</p>  
          <p>{user.email}</p>
        </div>
        
      )}
    
    </div>
  );
};

export default Card;


