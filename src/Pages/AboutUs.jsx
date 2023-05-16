import React from "react";
import '../Components/AboutUs.css';
import CardDisplay from "../Components/ContributorList";
import image from "../assets/view.png"

const TopSection = () => {
  return (
    <div className="about-top-section">
      
      <div class="aboutHead"> 
           
          <img src={image} alt="Image" />
          <h1>About Us</h1>
      
      </div>
      
      <div class="about-container">
        <p>
        We have developed Digital Assets Provenence using blockchain in order to give a sense of 
        security to content creators and content consumers. Free will is the power of 
        individuals to make choices that are not predetermined by fate or divine intervention. 
        In the digital age, free will can be exercised to utilize and consume digital assets to
        earn revenue. With the rise of cryptocurrencies and blockchain technology, it has 
        become easier than ever for individuals to participate in decentralized assets 
        ecosystems and earn passive income from their dedication,hardwork and struggle. By 
        embracing their free will to explore and invest in these emerging opportunities, 
        individuals can take control of their financial futures and potentially reap the 
        benefits of a growing digital economy. However, it is important to exercise caution and 
        do proper research before making any investments, as the volatility of digital assets 
        can also lead to significant losses.
        </p>

     </div>

      <h2>Let's get to know each other!</h2>
      <p>Meet our Team</p>
      
      <CardDisplay></CardDisplay>
      
       <p>Thank you for visiting</p>
    </div>

  );
};

export default TopSection;

