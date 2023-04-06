import {Card, Col} from 'react-bootstrap';
export function ContentCard(prop){
  //styles objects
  const cardStyle ={ width: '30rem', border:"0.3rem solid gray", borderRadius:"0.5rem"}; 
  const typeDiv = {padding:"1rem", backgroundColor:"gray", fontSize:"2rem", textAlign:"center", fontWeight:"bold"};
  const coreDiv = {padding:"2rem"};
  const imgStyle = {width:"100%"};
  const authorImgStyle = {borderRadius:"50%", width:"3rem", height:"3rem", marginRight:"0.5rem"};
  const priceTagStyle = {color:"red", float:"right"};
    return (
      <Col md="4">
      <Card style={cardStyle}>
        {prop.type?<diV style={typeDiv}>{prop.type}</diV>:<></>}
        <div style={coreDiv}>
        <Card.Img variant="top" src={prop.img} style={imgStyle}/>
        <Card.Body>
          <Card.Title>{prop.title}</Card.Title>
          <img src={prop.authorImg} style={authorImgStyle}/>
          <b>{prop.author}</b><br/>
          <small style={priceTagStyle}>Price: {prop.price}</small>
        </Card.Body>
        </div>
      </Card>
      </Col>
    );
  }