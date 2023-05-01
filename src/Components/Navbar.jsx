import "../App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import logo from "../assets/logo2.svg"
import searchIcon from "../assets/Searchicon.svg"
import walletIcon from "../assets/wallet.svg"
import AddIcon from "../assets/addPlus.svg"

import { Link, useNavigate } from "react-router-dom"


export const Navbar = (props) => {
   
    return (
      <nav className="navbar1">
        <div className="navEle1">
            <Link to="/info" className="mx-4">
                <img src={logo} alt="Digital asset" width="220" />
            </Link>
            <div className="wrap">
                <div className="searchbar">
                    <input type="text" className="searchInput" placeholder="Search" name="search"/>
                    <button className="searchButton"><img src={searchIcon} alt="" width={20}/></button>
                </div>
            </div>
            <div className="d-flex align-items-center ">
                <Link to="/content" className="exploreLink" >
                    <div className="exploreLink1" >Explore</div>
                </Link>
            </div>
            
        </div>
        
        
        
        
        <div className="navlinks">
            
            <Link to="/upload">
                <img src={AddIcon} title="create" className="mx-2 imageNav" alt="hle"  />   
            </Link>
            
            
            <img src={walletIcon} title="wallet" className="mx-2 imageNav" alt="hle"  onClick={props.handleShowOffcanvase} />   
            <img src={props.imageUrl} title="profile" className="profileIcon imageNav mx-2" alt="hle" onClick={props.show_modal}/> 
            
            
            

        
        </div>
       
      </nav>

    )
  }
  
  export default Navbar ;
  