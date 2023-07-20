import {Content} from "../Components/Content"
import {CommentBox} from "../Components/CommentBox"
import { ContentAuthor } from "../Components/ContentAuthor";
import AddReview from "../Components/AddReview";
import "./ContentDetail.css"
import viewIcon from "../assets/view.png"
import licenseIcon from "../assets/license.png"
import ownerIcon from "../assets/owner.png"
import dropIcon from "../assets/down.png"
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function ContentDetail(props){
    const {contractAddress} = useParams()
    const [content, setContent] = useState(null)
    const [reviewVisible, setReviewVisible] = useState(null)
    useMemo(async ()=>{
        const contractDetail =await getContentDetailsFromContracts(contractAddress, props.addr)
        console.log("addre ", props.addr)
        //console.log("contract detail ",contractDetail)
        const dbDetail = await fetch(`http://localhost:4000/content/${contractAddress}`).then(res=>res.json()).then(res=>res.data)
        //console.log("db details ",dbDetail)
        contractDetail.owners = await Promise.all(contractDetail.owners.map(async (address)=>{
            const owner =  await fetch("http://localhost:4000/userInfo", {
                method:"post"  ,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ethAddress:address}) 
                }).then(res=>res.json()).then(res=>res.data)
            return owner
        }))
        const detail = {...contractDetail, ...dbDetail}
        console.log("detail ", detail)
        setContent(detail)
    }, [])

    
    console.log("address ",contractAddress)
    return (
        <div className="container-fluid px-4 py-4 ">
            {content?
            <div className="row">
            
                <div className="col-9 detailsRightSection">
                    
                    <Link to={`/profile/${content?.owners[content.owners.length-1].ethAddress}`} className="removeLinkEffect"><ContentAuthor img={content?.owners[content.owners.length-1].img} name={content?.owners[content.owners.length-1].name} address={content?.owners[content.owners.length-1].ethAddress}/></Link>
                    <Content data={content.clip} type={content.type}
                     title={content.title} description={content.description} prices={content.prices}
                      ext={content.ext} address={content.address} ethAddress={props.addr} owner={content?.owners[content.owners.length-1].ethAddress} licensors={content.licensors}
                      setReviewVisible={setReviewVisible}
                      />
                    <CommentBox address={content.address} flag={reviewVisible}/>
                </div>
                <div className="col-3"  >
                    <SideBar view={content.view} licensor={content.licensors.length} owners={content?.owners.reverse()} prices={content.prices} address={content.address} addr={props.addr} priceHistory={content.priceHistory}/>
                    {reviewVisible?
                    <AddReview address={content.address} addr={props.addr} setReviewVisible={setReviewVisible}/>:<></>}
                </div>
            </div>:<></>}
        </div>
    );
}
async function getContentDetailsFromContracts(contentAddress, senderAddress) {
    const web3 = new Web3(window.ethereum);
    const asset = JSON.parse(localStorage.getItem("Asset"))
    const contract = new web3.eth.Contract(asset.abi, contentAddress);
    console.log("sender addre ", senderAddress)
    const cid = await contract.methods.getContent().call({ from: senderAddress })
    const prices = await contract.methods.getPrices().call()
    const licensors = await contract.methods.getLicensorHistory().call()
    const owners = await contract.methods.getOwnerHistory().call()
    const priceHistory = await contract.methods.getBuyPriceHistory().call()
    return { cid, prices, licensors, owners, priceHistory}
}
function OwnerIconAndName(props){
    return(
        <div className="img-owner-drow">
            <div>
                <img src={`http://localhost:4000/profileImgs/${props.img}`} alt="" />
                <div className="d-flex flex-column align-items-start gap-0">
                    <span className="name-owe">{props.name}</span>
                    <span className="name-addr">{props.address.substr(0,6)}...{props.address.substr(-4, 4)}</span>
                    <span className="name-price">{props.price}</span>
                </div>
            </div>
        </div>
    );
}
function SideBar(props){
    const {owners, priceHistory} = props
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
                                return(<Link to={`/profile/${owner.ethAddress}`} className="removeLinkEffect">
                                <OwnerIconAndName img={owner.img} name={owner.name} address={owner.ethAddress} key={key} price={priceHistory[key]}/>
                                </Link>
                                )
                            })
                        }
                    </div>
                </div>
                
            </div>
            {owners[owners.length-1].ethAddress == props.addr?
            <EditPrice prices={props.prices} ethAddress={owners[owners.length-1].ethAddress} address={props.address}/>
            :<></>
        }
            
        </div>
    );
}
async function updatePrices(contentAddress, senderAddress, prices){
    const web3 = new Web3(window.ethereum);
    const asset = JSON.parse(localStorage.getItem("Asset"))
    const contract = new web3.eth.Contract(asset.abi, contentAddress);
    console.log("n price ", prices)
    console.log("content address ", contentAddress)
    console.log("sender address ", senderAddress)
    const result = await contract.methods.setPrices(...prices).send({from:senderAddress, gas:2000000}).then(res=>true).catch(err=>false)
    return result;
}
function EditPrice({prices, address, ethAddress}){
    const[nPrice0, setNPrices0] = useState(prices[0])
    const[nPrice1, setNPrices1] = useState(prices[1])
    const[nPrice2, setNPrices2] = useState(prices[2])
    const handleUpdate = async ()=>{
        const result = await updatePrices(address, ethAddress, [nPrice0, nPrice1, nPrice2])
        console.log("update prices ", result)

    }
    const handleChange = (event)=>{
        event.preventDefault()
        const {id, value} = event.target
        if(id=='0'){
            setNPrices0(value)
        }
        else if(id=='1'){
            setNPrices1(value)
        }
        else{
            setNPrices2(value)
        }
    }
    return (<div>
        <table>
            <tbody>
            <tr>
                <td><label>Purchase Price</label></td>
                <td><input type="number" defaultValue={prices[0]} id={0} onChange={handleChange}/></td>
            </tr>
            <tr>
                <td><label>License Price</label></td>
                <td><input type="number" defaultValue={prices[1]} id={1} onChange={handleChange}/></td>
            </tr>
            <tr>
                <td><label>View Price</label></td>
                <td><input type="number" defaultValue={prices[2]} id={2} onChange={handleChange}/></td>
            </tr>
            </tbody>
        </table>
        <Button onClick={handleUpdate}>Update</Button>
    </div>)
}
