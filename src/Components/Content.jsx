import Accordion from 'react-bootstrap/Accordion';
export function Content({data, type, title, description}){
    
    return (
        <div className="content_of_content_details">
          <object data={data} type={type} >
            <p>Preview not available</p>  
          </object>
          <br/>
          <p className="title">{title}</p>
          <Accordion defaultActiveKey="0">
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