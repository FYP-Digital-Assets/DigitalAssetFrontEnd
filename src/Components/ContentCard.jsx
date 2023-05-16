import {Card} from 'react-bootstrap';
import "./ContentCard.css"
import { Link } from 'react-router-dom';
export function ContentCard(prop){
  //styles objects
  
  

  const authorImgStyle = {borderRadius:"50%", width:"3rem", height:"3rem", marginRight:"0.5rem"};
  const priceTagStyle = {color:"red", float:"right"};
  const typeExt = prop.type.substr(0, prop.type.indexOf('/'))
  const type = !["audio", "video", "image"].includes(typeExt)?"document":typeExt;
    return (
      
      <Card  className='content_card_style border'>
        {type?<div className='card_typeDiv'>{type}</div>:<></>}
        <div >
          <div className='p-1'>
            <Card.Img variant="top" className='card_ImgStyle' src={prop.img} />
          </div>
          
          <Card.Body className='p-1 mb-2'>
            <Card.Title className='content_card_title'>{prop.title}</Card.Title>
            <img src={prop.authorImg}  className='card_authorImgStyle'/>
            <b>{prop.author}</b><br/>
          </Card.Body>
          <Card.Footer className='d-flex justify-content-between flex-column'>
            <small className='d-flex justify-content-between'><span>Purchase:</span>{prop.prices[0]}</small>
            <small className='d-flex justify-content-between'><span>License</span> {prop.prices[1]}</small>
            <small className='d-flex justify-content-between'><span>View:</span> {prop.prices[2]}</small>
          </Card.Footer>
        </div>
      </Card>
      
    );
  }
  