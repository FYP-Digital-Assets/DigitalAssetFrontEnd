import React from 'react';
import Card from './Card';
// import contributor1 from './images/javeria.png'
// import contributor2 from './images/shankar.png'
// import contributor3 from './images/iqbal.png'
import './AboutUs.css';


const users = [
  {
    name: 'Javeria Irfan',
    email: 'javeria.bscsf19@iba-suk.edu.pk',
    bio: 'I am Javeria Irfan. I am a passionate front-end developer with a creative and detail-oriented approach to building visually appealing and user-friendly websites. You may contact me at:',
    picture: "https://placehold.co/600x400"
  },
  {
    name: 'Shankar Lal',
    email: 'shankar.bscsf19@iba-suk.edu.pk',
    bio: 'I am Shankar Lal. I am a full stack developer with keen eye for detail and a desire to create high-quality software that delivers exceptional user experiences.You may contact me at:',
    picture: "https://placehold.co/600x400"
  },
  {
    name: 'Iqbal',
    email: 'iqbal.bscsf19@iba-suk.edu.pk',
    bio:'I am Iqbal. I am highly creative and detail-oriented front-end developer and UI designer with a passion for creating beautiful and intuitive websites.You may contact me at:',
    picture: "https://placehold.co/600x400"
  }
];

const CardDisplay = () => {
  return (
    <div >
      {users.map((user, index) => (
        <Card key={index} user={user} />
      ))}
    </div>
  );
};

export default CardDisplay;
