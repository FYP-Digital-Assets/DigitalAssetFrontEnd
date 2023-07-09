import { useMemo } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
export default function History(props){
    const [history, setHistory] = useState([]);
    const actions = ["Viewed", "Licensed", "Owned"]
    const actionColor = ["yellow", "blue","green"]
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
    }, [props.addr])
    return (<>
        {history?history.map((obj,i)=>{
            console.log(obj)
            return <Link to={`/auth/${obj.address}`} className="removeLinkEffect">
            <div style={{display:"flex", justifyContent:"space-between"
            ,borderRadius:"0.5em", background:"white", border:"1px solid black",
            fontSize:"1.5rem",alignItems:"center", margin:"0.7em", boxShadow:"0.5em 0.5em 0.5em 0.5em lightgray",
            padding:"0.5em"
            }} key={i}>
                <b>{i+1}</b>
                <img src={`http://localhost:4000/thumbnail/${obj.thumbnail}`} style={{width:"5rem", height:"4rem", objectFit:"cover"}} key={i}/>
                <b>{obj.title.substr(0, 20)}</b>
                <p style={{color:actionColor[obj.action]}}>{actions[obj.action]}</p>
                <p>{new Date(obj.date).toISOString().substring(0, 10)}</p>
            </div>
            </Link>
        }):<h1>
            No History
        </h1>

        }
    </>)
}