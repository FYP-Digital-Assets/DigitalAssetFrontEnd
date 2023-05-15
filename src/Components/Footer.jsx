import logo4 from "../assets/logo5.svg";
import github from "../assets/github-logo.png"
import iba from "../assets/iba.png"
import { Link } from "react-router-dom";
const Footer = ()=>{
    return(
        <div className="container-fluid footer-app p-4 mt-5 text-light">
           <div className="row my-5">
                <div className="col-4">
                    <div className="">
                        <img className="footer-logo"  src={logo4}/>
                    </div>
                    <div className="text-light p-4" >
                    Digital Assets Provenance empowers you to recognize your true value by 
              acknowledging the unwavering effort and dedication that fuel your success. With our 
              cutting-edge blockchain technology, we pave the way for an unparalleled user experience
              that enables you to soar above limitations and bask in the vibrant hues of this 
              magnificent world. Join us on a mission to unlock limitless possibilities!
 
                    </div>
                </div>
                <div className="col-3 p-4">
                   <div className="d-flex flex-column gap-3 ">
                    <h3 className="text-light subtitle-text" >Quick links</h3>
                       <div className="d-flex flex-column gap-3 p-2 ">
                            <Link to="/content" className="removeLinkEffect" >
                                <div className=" text-light" >Explore</div>
                            </Link>
                            <Link to="/stat" className="removeLinkEffect" >
                                <div className=" text-light" >Stats</div>
                            </Link>
                            <Link to="/info" className="removeLinkEffect" >
                                <div className=" text-light" >Info</div>
                            </Link>
                            <Link to="/about" className="removeLinkEffect" >
                                <div className=" text-light" >About-us</div>
                            </Link>
                            <Link to="/history" className="removeLinkEffect" >
                                <div className=" text-light" >History</div>
                            </Link>
                       </div>
                   </div>
                </div>
                    <div className="col-5 p-4">
                    <h3 className="text-light subtitle-text" >Developers</h3>
                    <div className="d-flex flex-column gap-2 p-4 ">
                    <p className="text-light ">Iqbal</p>
                    <p className="text-light">Shanker</p>
                    <p className="text-light">Javeria</p>
                    </div>
                        <div className="d-flex justify-content-center align-items-center  border-top p-4">
                        <a href="https://github.com/FYP-Digital-Assets" className="mx-2" target="blank"><img height={40} src={github} alt="" /></a>
                        <a href="https://www.iba-suk.edu.pk/" className="mx-2" target="blank"><img height={40} src={iba} alt="" /></a>
                        </div>                
                        
    
                    </div>
           </div>

        </div>
    );
}
export default Footer ;