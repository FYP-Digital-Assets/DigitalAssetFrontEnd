import Accordion from 'react-bootstrap/Accordion';
export function Content({data, type, title, description, prices, ext}){
    
    return (
        <div className="content_of_content_details">
          <object data={`http://localhost:4000/ipfs/${data}/${ext[0]}`} type={type} >
            <p>Preview not available</p>  
          </object>
          <br/>
          <p className="title">{title}</p>
          <PurchaseButtons price_1={prices[0]} price_2={prices[1]} price_3={prices[2]} />
          <Accordion >
            <Accordion.Item eventKey="0">
              <Accordion.Header >Description</Accordion.Header>
              <Accordion.Body>
                {description}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
    );
}

function PurchaseButtons(props){
  return(
    <div className='mb-4 d-flex justify-content-between '>
      <div className='button-purchase '>
        <div className={props.price_1 ? (props.price_1===0 ?"button-title button-two":"button-title button-one"): "button-title button-three"} >Purchase</div>
        <div className='px-3'>{props.price_1 ? props.price_1 + " wei": "Not Avalible"}</div>
      </div>

      <div className='button-purchase'>
        <div className={props.price_2 ? (props.price_2===0 ?"button-title button-two":"button-title button-one"): "button-title button-three"}>View</div>
        <div className='px-3'>{props.price_2 ? props.price_2 +" wei": "Not Avalible"}</div>
      </div>

      <div className='button-purchase '>
        <div className={props.price_3 ? (props.price_3===0 ? "button-title button-two":"button-title button-one"): "button-title button-three"}>License</div>
        <div className='px-3'>{props.price_3 ? props.price_3 +" wei": "Not Avalible"}</div>
      </div>
      
      
    </div>
  );
}
