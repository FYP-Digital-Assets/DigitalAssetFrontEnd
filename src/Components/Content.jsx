import Accordion from 'react-bootstrap/Accordion';
export function Content({data, type, title, description}){
    
    return (
        <div className="content_of_content_details">
          <object data={data} type={type} >
            <p>Preview not available</p>  
          </object>
          <br/>
          <p className="title">{title}</p>
          <PurchaseButtons purchase={true} view={false} license={false} price_1={0} price_2={2.2} price_3={1.0} />
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
        <div className={props.purchase ? (props.price_1===0 ?"button-title button-two":"button-title button-one"): "button-title button-three"} >Purchase</div>
        <div className='px-3'>{props.purchase ? props.price_1 + "eth": "Not Avalible"}</div>
      </div>

      <div className='button-purchase'>
        <div className={props.view ? (props.price_2===0 ?"button-title button-two":"button-title button-one"): "button-title button-three"}>View</div>
        <div className='px-3'>{props.view ? props.price_2 +" eth": "Not Avalible"}</div>
      </div>

      <div className='button-purchase '>
        <div className={props.license ? (props.price_3===0 ? "button-title button-two":"button-title button-one"): "button-title button-three"}>License</div>
        <div className='px-3'>{props.license ? props.price_3 +" eth": "Not Avalible"}</div>
      </div>
      
      
    </div>
  );
}