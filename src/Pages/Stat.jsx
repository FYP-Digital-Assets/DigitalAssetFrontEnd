import { useState } from "react"

export default function Stat(props){
    //call data from backend using useEffect
    const[trending, setTrending] = useState([
        {title:"abc", thumbnail:"1683743582292.jpeg", prices:[10, 20, 30], view:10, 
        licesors:["a", "b"]},
        {title:"cde", thumbnail:"1683743582292.jpeg", prices:[12, 20, 30], view:100, 
        licesors:["a", "b"]},
        {title:"fgh", thumbnail:"1683743582292.jpeg", prices:[18, 20, 30], view:200, 
        licesors:["a", "b"]}
    ])
    return <>
        <table style={{width:"100%"}}>
            <tbody>
                {trending?trending.map(
                    (obj, i)=>{
                        return (
                            <tr key={i}>
                                <td>{i}</td>
                                <td><img src={`http://localhost:4000/thumbnail/${obj.thumbnail}`}
                                style={{width:"8rem", height:"8rem", objectFit:"cover"}}
                                /></td>
                                <td>{obj.title}</td>
                                <td>{obj.prices[0]}</td>
                                <td>{obj.prices[1]}</td>
                                <td>{obj.prices[2]}</td>
                                <td>{obj.view}</td>
                                <td>{obj.licesors.length}</td>
                            </tr>
                        );
                    }
                ):<></>

                }
            </tbody>
        </table>
    </>
}