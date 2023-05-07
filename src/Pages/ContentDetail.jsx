import {Content} from "../Components/Content"
import {CommentBox} from "../Components/CommentBox"
import { ContentAuthor } from "../Components/ContentAuthor";
import "./ContentDetail.css"
import viewIcon from "../assets/view.png"
import licenseIcon from "../assets/license.png"
import ownerIcon from "../assets/owner.png"
import dropIcon from "../assets/down.png"
import { useState } from "react";

export default function ContentDetail(props){
    const {owners, content} = props;
    console.log(owners)
    return (
        <div className="container-fluid px-4 py-4 ">
            <div className="row">
                <div className="col-9 detailsRightSection">
                    <ContentAuthor img={owners[0].img} name={owners[0].name} address={owners[0].address}/>
                    <Content data={content.clip} type={content.type}
                     title={content.title} description={content.description} prices={content.prices}
                      ext={content.ext}/>
                    <CommentBox address={content.address}/>
                </div>
                <div className="col-3"  >
                    <SideBar view={content.view} licensor={content.licensor} owners={owners}/>
                </div>
            </div>
        </div>
    );
}

function OwnerIconAndName(props){
    return(
        <div className="img-owner-drow">
            <div>
                <img src={props.img} alt="" />
                <div className="d-flex flex-column align-items-start gap-0">
                    <span className="name-owe">{props.name}</span>
                    <span className="name-addr">{props.address.substr(0,6)}...{props.address.substr(-4, 4)}</span>
                    
                </div>
            </div>
            <span>{props.price}</span>
        </div>
    );
}
function SideBar(props){
    const {owners} = props
    const [drop, setdrop] = useState(false) ;
    const tuggle_drop_down_owner_history =()=>{
       setdrop(e=>!e);
    }
    return(
        <div className="border rounded p-2 d-flex flex-column gap-2">
            <div className="view-number border rounded d-flex align-items-center gap-3 p-2">
                <img className="image-icon" src={viewIcon} alt="d" /> {props.view} views
            </div>
            <div className="view-number border rounded d-flex align-items-center gap-3 p-2">
                <img className="image-icon" src={licenseIcon} alt="d" /> {props.licensor} licensors
            </div>
            <div className={drop?"border border-secondary rounded " : "border rounded "}>
                <div className="view-number border rounded d-flex align-items-center gap-3 p-2 justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                        <img className="image-icon" src={ownerIcon} alt="d" /> Owners History
                    </div> 
                    
                    <img className={drop ? 'icon-drop-history drop_active' : 'icon-drop-history drop_unactive' } src={dropIcon} alt="d"  onClick={tuggle_drop_down_owner_history} />
                    
                </div>
                <div className={drop ? 'showDrop' : 'closeDrop'}>
                    <div className='p-2 d-flex flex-column justify-content-end'  >
                        {
                            owners.map((owner, key)=>{
                                return(<OwnerIconAndName img={owner.img} name={owner.name} price={owner.price} address={owner.address} key={key} />)
                            })
                        }
                    </div>
                </div>
                
            </div>
            
        </div>
    );
}
