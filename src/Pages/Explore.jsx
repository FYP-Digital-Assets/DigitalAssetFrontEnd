import { Link, Outlet } from "react-router-dom";
export default function Explore(){
    return (
        <div>
            <ExploreTop/>
            <Outlet/>
            <ExploreBottom/>
        </div>
    );
}
function ExploreBottom(){
    return(
        <div className="nav-background cursor-pointer p-3 mt-5">
            <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item"><a className="page-link" >Previous</a></li>
                <li className="page-item active"><a className="page-link" >1</a></li>
                <li className="page-item"><a className="page-link" >2</a></li>
                <li className="page-item"><a className="page-link" >3</a></li>
                <li className="page-item"><a className="page-link" >Next</a></li>
            </ul>
            </nav>
        </div>
    );
}
function ExploreTop(){
    
    return(
        <div className="nav-background p-3" >
            <ul className="nav ">
                <li className="nav-item ">
                    <Link to='./' className="nav-link ">
                        ALL
                    </Link>
                </li>
                <li className="nav-item" >
                    <Link to='./video' className="nav-link ">
                        Videos
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='./audio' className="nav-link ">
                        Audios
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='./image' className="nav-link ">
                        Images
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='./document' className="nav-link ">
                        Documents
                    </Link>
                </li>
                
            </ul>
        </div>
    );
}