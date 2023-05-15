import { useMemo } from "react";
import { useState } from "react"

export default function History(props){
    const [history, setHistory] = useState([]);
    useMemo(async ()=>{
        const dbHistory = await fetch(`http://localhost:4000/getHistory/${props.addr}`).then(res=>res.json()).then(res=>res.data)
        const data = await Promise.all(dbHistory.map(async (obj)=>{
            const contentDetail = 
            await fetch(`http://localhost:4000/content/${obj.address}`).then(res=>res.json())
            .then(res=>res.data)
            return {...contentDetail, ...obj}
        }))
        setHistory(data)
        console.log(data)
    }, [])
    return (<>
        {history?history.map((obj,i)=>{
            console.log(obj)
            return <div style={{display:"flex", justifyContent:"space-between"
            ,borderRadius:"0.5em", background:"gray"
            }}>
                <p>{i+1}</p>
                <img src={`http://localhost:4000/thumbnail/${obj.thumbnail}`} style={{width:"5rem", height:"4rem", objectFit:"cover"}} key={i}/>
                <p>{obj.title}</p>
                <p>{new Date(obj.date).getFullYear()}</p>
            </div>
        }):<h1>
            No History
        </h1>

        }
    </>)
}