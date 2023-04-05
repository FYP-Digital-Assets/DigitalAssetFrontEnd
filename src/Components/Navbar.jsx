import "../App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import logo from "../assets/logo2.svg"
import searchIcon from "../assets/Searchicon.svg"
import walletIcon from "../assets/wallet.svg"


export const Navbar = (props) => {
    
    return (
      <nav className="navbar1">
        <div className="navEle1">
            <a className="mx-4" href="/">
                <img src={logo} alt="Digital asset" width="220" />
            </a>
            <div className="wrap">
                <div className="searchbar">
                    <input type="text" className="searchInput" placeholder="Search" name="search"/>
                    <button className="searchButton"><img src={searchIcon} alt="" width={20}/></button>
                </div>
            </div>
        </div>
        
        
        
        
        <div className="navlinks">
            <img src={walletIcon} className="mx-2 imageNav" alt="hle"  onClick={props.handleShowOffcanvase} />   
            <img src={props.imageUrl} className="profileIcon imageNav mx-3" alt="hle" onClick={props.show_modal}/> 
            
            

        
        </div>
       
      </nav>

    )
  }
  
  export default Navbar ;
  