import { Route, Routes, BrowserRouter, Link} from "react-router-dom";
export function ContentPage(){
    return (
        <>
            <BrowserRouter>
                <ContentTabButtons />
                <Routes>
                <Route path='/' element={<ContentPanel contentType="all" />} />
                <Route path='/video' element={<ContentPanel contentType="video" />} />
                <Route path='/audio' element={<ContentPanel contentType="audio" />} />
                <Route path='/image' element={<ContentPanel contentType="image" />} />
                <Route path='/document' element={<ContentPanel contentType="document" />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
/**
 * tabs button
 * 
 */
function ContentTabButtons(){
    return(
        <div>
            <Link to='/'><button>ALL</button> </Link>
            <Link to='/video'><button>Video</button> </Link>
            <Link to='/audio'><button>Audio</button> </Link>
            <Link to='/image'><button>Image</button> </Link>
            <Link to='/document'><button>Document</button> </Link>
        </div>
    );
}
/**
 * it will display cards
 */
function ContentPanel(props){
    return (
        
        <div>Here will cards of {props.contentType}</div>
        
    );
}