import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function Search(props){
    const [searchResult, setSearchResult] = useState(null)
    const [query, setQuery] = useSearchParams()
    const search = async (searchTerm) => {
        const condition = { title: { $regex: new RegExp(searchTerm, 'i') } }
        const result = await fetch("http://localhost:4000/content",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ condition })
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
        return { cid, owner:owners[owners.length-1] }
    }
    useMemo(async ()=>{
        const result = await search(query.get('searchTerm'))
        console.log("search res ", result)
        const result2 = await Promise.all(result.map(async obj=>{
            const detail = await getContentDetailsFromContracts(obj.address)
            const userInfo = await fetch(`http://localhost:4000/userInfo/${detail.owner}`).then(res=>res.json()).then(res=>res.data)
            return {...detail, ...obj, ...userInfo}
        }))
        setSearchResult(result2)
        console.log("result search final ",result2)
    }, [])
    return <>
        {searchResult?searchResult
        .map(obj=><ContentCard img={`http://localhost:4000/thumbnail/${obj.thumbnail}`} title={obj.title} type={a.type} author={obj.data.name} prices={obj.prices} authorImg={`http://localhost:4000/profileImgs/${obj.img}`} style={{display:"inline-block"}}/>)
        :<h1>No Content</h1>
        }
    </>
}