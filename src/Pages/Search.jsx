import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Web3 from "web3"
import { ContentCard } from "../Components/ContentCard"
import { Row } from "react-bootstrap"
export default function Search(){
    const [searchResult, setSearchResult] = useState(null)
    const [query, setQuery] = useSearchParams()
    const search = async (searchTerm) => {
        const result = await fetch("http://localhost:4000/content",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchTerm })
            }
        ).then(res=>res.json()).then(res=>res.data)
        return result;
    }
    async function getContentDetailsFromContracts(contentAddress) {
        const web3 = new Web3(window.ethereum);
        const asset = JSON.parse(localStorage.getItem("Asset"))
        const contract = new web3.eth.Contract(asset.abi, contentAddress);
        const prices = await contract.methods.getPrices().call()
        const owners = await contract.methods.getOwnerHistory().call()
        return { owner:owners[owners.length-1], prices }
    }
    useMemo(async ()=>{
        const result = await search(query.get('searchTerm'))
        console.log("search res ", result)
        const result2 = await Promise.all(result.map(async obj=>{
            const detail = await getContentDetailsFromContracts(obj.address)
            const userInfo =await fetch("http://localhost:4000/userInfo", {
                method:"post"  ,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ethAddress:detail.owner}) 
                }).then(res=>res.json()).then(res=>res.data)
            return {...detail, ...obj, ...userInfo}
        }))
        setSearchResult(result2)
        console.log("result search final ",result2)
    }, [query])
    return <div className='container-fluid'>
        <Row>
        {searchResult && searchResult.length!=0?searchResult
        .map((obj,i)=><div className="col-3 mt-5" key={i}><ContentCard img={`http://localhost:4000/thumbnail/${obj.thumbnail}`} title={obj.title} type={obj.type} author={obj.name} prices={obj.prices} authorImg={`http://localhost:4000/profileImgs/${obj.img}`} style={{display:"inline-block"}}/></div>)
        :<h1>No Content</h1>
        }
    
    </Row>
    </div>

}