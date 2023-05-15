import { useMemo } from "react";
import { useState } from "react"

export default function History(props){
    const [history, setHistory] = useState([]);
    useMemo(async ()=>{
        const dbHistory = await fetch(`http://localhost:4000/getHistory/${props.addr}`).then(res=>res.json()).then(res=>res.data)
        const data = await Promise.all(dbHistory.map(async (obj)=>{
            const contentDetail = 
            await fetch(`http://localhost:4000/content/${obj.address}`)
            return {...contentDetail, ...obj}
        }))
        console.log(data)
    }, [])
    return (<>
        {history?history.map((obj,i)=>{
            return <p key={i}>{obj.json()}</p>
        }):<h1>
            No History
        </h1>

        }
    </>)
}