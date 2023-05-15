import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
export default function Explore(){
    const [pageNumber, setPageNumber] = useState(0); 
    const [isNext, setIsNext] = useState(true) ;
    const nextPage = () =>{
        setPageNumber((prev) => prev+1) ;
    }
    const previousPage = () =>{
        setPageNumber((prev) => prev-1) ;
        setIsNext(true);
    }
    return (
        <div>
            <ExploreTop/>
            <Outlet context={[pageNumber, setIsNext]} />
            <ExploreBottom isNext={isNext} nextPage={nextPage } previousPage={previousPage} pageNumber={pageNumber}/>
        </div>
    );
}
function ExploreBottom(props){
    return(
        <div className="nav-background cursor-pointer p-3 mt-5">
            <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item"><a className={`page-link ${props.pageNumber == 0? "disabled":""}`} onClick={props.previousPage} >Previous</a></li>
                <li className="page-item active"><a className="page-link" >{props.pageNumber}</a></li>
               
                <li className="page-item "><a className={`page-link ${props.isNext ? "":"d-none"}`} >{props.pageNumber+1}</a></li>
                <li className="page-item"><a className={`page-link ${props.isNext ? "":"disabled"}`} onClick={props.nextPage} >Next</a></li> 
                    
               
                
                
            </ul>
            </nav>
        </div>
    );
}
function ExploreTop(){
    
    return(
        <div className="nav-background p-3" >
            <ul className="nav nav-tabs">
                <li className="nav-item ">
                    <Link to='' className="nav-link ">
                        ALL
                    </Link>
                </li>
                <li className="nav-item" >
                    <Link to='video' className="nav-link ">
                        Videos
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='audio' className="nav-link ">
                        Audios
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='image' className="nav-link ">
                        Images
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='document' className="nav-link ">
                        Documents
                    </Link>
                </li>
                
            </ul>
        </div>
    );
}