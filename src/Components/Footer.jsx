import logo4 from "../assets/logo5.svg";
const Footer = ()=>{
    return(
        <div className="container-fluid footer-app p-4 ">
           <div className="row">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-center mb-5">
                        <img className="footer-logo"  src={logo4}/>
                    </div>
                    
                </div>
            </div>
            <div className="col-4">
                    <h3 className="text-light heding_3" >About-Us</h3>
                </div>
                <div className="col-4">
                    <h3 className="text-light heding_3">About-Us</h3>
                </div>
                <div className="col-4">
                    <h3 className="text-light heding_3">About-Us</h3>
                </div>
           </div>

        </div>
    );
}
export default Footer ;