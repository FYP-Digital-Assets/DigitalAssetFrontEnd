import { useMemo, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Web3 from 'web3';
export function Content({data, type, title, description, prices, ext, address, ethAddress, owner, licensors, setReviewVisible}){
    const[dataUrl, setDataUrl] = useState(`ipfs/${data}/${ext[0]}`)
    useMemo(async ()=>{
      if(ethAddress==owner || licensors.includes(ethAddress)){
        const web3 = new Web3(window.ethereum);
        const asset = JSON.parse(localStorage.getItem("Asset"))
        const contract = new web3.eth.Contract(asset.abi, address);
        const cid = await contract.methods.getContent().call({ from: ethAddress })
        setDataUrl(`licenseOrOwner/${address}/${ethAddress}/${cid}/${ext[1]}`)
      }
    }, [])
    return (
        <div className="content_of_content_details">
          <object data={`http://localhost:4000/${dataUrl}`} type={type} >
            <p>Preview not available</p>  
          </object>
          <br/>
          <p className="title">{title}</p>

          <PurchaseButtons setUrl={setDataUrl} address={address} ext={ext} ethAddress={ethAddress} price_1={Number(prices[0])} price_2={Number(prices[1])} price_3={Number(prices[2])} owner={owner} 
          licensors={licensors} setReviewVisible={setReviewVisible}/>
          <Accordion >
            <Accordion.Item eventKey="0">
              <Accordion.Header >Description</Accordion.Header>
              <Accordion.Body>
                {description}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
    );
}
async function doTradeTransaction(contentAddress, senderAddress, methodName, price){
  const web3 = new Web3(window.ethereum);
  const asset = JSON.parse(localStorage.getItem("Asset"))
  const contract = new web3.eth.Contract(asset.abi, contentAddress);
  const result = await contract.methods[methodName]().send({from:senderAddress, gas:2000000, value:2*price}).on('transactionHash', hash=>hash)
  const cid = await contract.methods.getContent().call({ from: senderAddress })
  console.log("tx hash ", result.transactionHash)
  return {txHash:result.transactionHash, cid};
}
function PurchaseButtons(props){
  const {ethAddress, address, price_1, price_2, price_3, ext, setUrl, owner, licensors, setReviewVisible} = props
  const handleTradeButton = async (event)=>{
    event.preventDefault();
    let price = 0;
    const id = event.target.id
    // console.log("do .. ", id)
    if(id == 'buyView'){
      price = price_3
    }
    else if(id == 'buyLicense'){
      price = price_2
    }
    else if(id == 'buyContent'){
      price = price_1
    }
    console.log("price ", price)
    if(price != 0){
      let {txHash, cid} = await doTradeTransaction(address, ethAddress, id, price)
      if(id=='buyView'){
        setUrl(`view/${address}/${txHash}/${ext[1]}`)
      }
      else{
        setUrl(`licenseOrOwner/${address}/${ethAddress}/${cid}/${ext[1]}`)
      }
      setReviewVisible(true)
    }

  }
  console.log("perchase btn ", ethAddress, " ", owner)
  return(
    <div className='mb-4 d-flex justify-content-between '>
      {ethAddress!=owner?(<><div className='button-purchase ' >
        <div className={props.price_1 ? (props.price_1===0 ?"button-title button-two":"button-title button-one"): "button-title button-three"} id='buyContent' onClick={handleTradeButton}>Purchase</div>
        <div className='px-3'>{props.price_1 ? props.price_1 + " wei": "Not Avalible"}</div>
      </div>
      {!licensors.includes(ethAddress)?
      <div className='button-purchase '  >
        <div className={props.price_2 ? (props.price_2===0 ? "button-title button-two":"button-title button-one"): "button-title button-three"} id='buyLicense' onClick={handleTradeButton}>License</div>
        <div className='px-3'>{props.price_2 ? props.price_2 +" wei": "Not Avalible"}</div>
      </div>:<></>
      }
      {!licensors.includes(ethAddress)?
      <div className='button-purchase'  >
        <div className={props.price_3 ? (props.price_3===0 ?"button-title button-two":"button-title button-one"): "button-title button-three"} id='buyView' onClick={handleTradeButton}>View</div>
        <div className='px-3'>{props.price_3 ? props.price_3 +" wei": "Not Avalible"}</div>
      </div>:<></>}
      </>):<></>}

      
    </div>
  );
}
