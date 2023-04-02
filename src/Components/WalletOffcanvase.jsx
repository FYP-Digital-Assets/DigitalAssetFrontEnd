import Offcanvas from 'react-bootstrap/Offcanvas';
export default function WalletOffcanvase(props) {
    
  
    const handleClose = () => props.setShowOffcanvase(false);
    
  
    return (
        <Offcanvas show={props.showOffcanvase} onHide={handleClose} placement="end" >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Wallet</Offcanvas.Title>
            </Offcanvas.Header>
            <hr/>
            <Offcanvas.Body >
                {props.auth ? (<Connected/>):(<NotConnected/>)}
            </Offcanvas.Body>
        </Offcanvas>
    );
  }
function Connected(props) {  
    return (
        <div className=''>
            connected....
        </div>
    );
}
function NotConnected(props) {  
    return (
        <div className=''>
            Not  connected....
        </div>
    );
}