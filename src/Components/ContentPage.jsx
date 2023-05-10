import { Route, Routes, BrowserRouter, Link} from "react-router-dom";
import { ContentCard } from "./ContentCard";
import { Container, Row } from 'react-bootstrap';
import { useEffect, useMemo, useState } from "react";
import Web3 from "web3";
export function ContentPage(){
    return (
        <Route path="/content">
                <Route path='/' element={<ContentPanel/>} />
                <Route path='/video' element={<ContentPanel contentType="video" />} />
                <Route path='/audio' element={<ContentPanel contentType="audio" />} />
                <Route path='/image' element={<ContentPanel contentType="image" />} />
                <Route path='/document' element={<ContentPanel contentType="document" />} />
        </Route>
    );
}
/**
 * tabs button
 * 
 */
function ContentTabButtons(){
    const tabStyle = {position:"sticky", top:"0px", zIndex:"1", backgroundColor:"white", display:"flex", justifyContent:"space-around"};
    const btnStyle = {padding:"1rem", color:"black", width:"30rem"};
    return(
        <div style={tabStyle}>
            <Link to='/'><button style={btnStyle}>ALL</button> </Link>
            <Link to='/video'><button style={btnStyle}>Video</button> </Link>
            <Link to='/audio'><button style={btnStyle}>Audio</button> </Link>
            <Link to='/image'><button style={btnStyle}>Image</button> </Link>
            <Link to='/document'><button style={btnStyle}>Document</button> </Link>
        </div>
    );
}
/**
 * it will display cards
 */
export function ContentPanel(props){
    const [dataResult, setDataResult] = useState(null);
    async function getContentDetailsFromContracts(contentAddress, senderAddress){
        const web3 = new Web3(window.ethereum);
        const asset = JSON.parse(localStorage.getItem("Asset"))
        const contract = new web3.eth.Contract(asset.abi, contentAddress);
        // const cid = await contract.methods.getContent().call({from:senderAddress})
        // console.log("cid ", cid)
        const prices = await contract.methods.getPrices().call()
        const licensors = await contract.methods.getLicensorHistory().call()
        const owners = await contract.methods.getOwnerHistory().call()
        console.log("owners: ",owners) ;
        console.log("price: ",prices)
        console.log("license: ", licensors)
        return ({prices, licensors, owners})
    }
    const postData = async () => {
    try {
        const response = await fetch('http://localhost:4000/explore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page: 0 }) // replace 0 with the desired page number
        });

        const data = await response.json();

        if (data && Array.isArray(data.data)) {
            console.log(data.data) ;
            setDataResult(await Promise.all(
                data.data.map( async(a, b) =>{
                    console.log(a.address+"\nd: "+props.addr)
                        const contentDetailsContract =  await getContentDetailsFromContracts(a.address, props.addr) ;
                        const owner = await contentDetailsContract.owners[contentDetailsContract.owners.length-1] ;
                        console.log(owner)
                        const ownerDetail = await fetch("http://localhost:4000/userInfo", {
                            method:"post"  ,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ethAddress:owner}) 
                            }).then(res=>{
                                const a = res.json() ;
                                if(a.data !== null){
                                    console.log(a.data);
                                    return a
                                }
                                    
                            })
                            console.log("values:", JSON.stringify(a));
                            return {...a, ...ownerDetail, ...owner, ...contentDetailsContract};
                    
                   })
            ));
           
        } else {
        console.error('Invalid data format:', data);
        }
        


    } catch (error) {
        console.error('Fetch error:', error);
    }
    };

    useMemo(async () => {
        await postData();
        console.log("here result ", dataResult)
    
    }, []);

    // useEffect(async() => {

    //     console.log('result:', dataResult);

    // }, [dataResult]);

    return (
        
        <div className='container-fluid'>
        <Row>
        
        {dataResult?<>
            {dataResult.map((a, i)=>{
                return <div className="col-3 mt-5" key={a._id}><ContentCard img={`http://localhost:4000/thumbnail/${a.thumbnail}`} title={a.title} type="video" author="Iqbal" prices={a.prices} authorImg={`http://localhost:4000/thumbnail/${a.thumbnail}`} style={{display:"inline-block"}}/> </div>
            })}
            </>:<></>
        }
   </Row>
   </div>
        
    );
}