import { useState } from "react"

export default function Stat(props){
    //call data from backend using useEffect
    const[trending, setTrending] = useState([
        {title:"abc", thumbnail:"1683743582292", prices:[10, 20, 30], view:10, 
        licesors:["a", "b"]},
        {title:"cde", thumbnail:"1683743582292", prices:[12, 20, 30], view:100, 
        licesors:["a", "b"]},
        {title:"fgh", thumbnail:"1683743582292", prices:[18, 20, 30], view:200, 
        licesors:["a", "b"]}
    ])
    return <>
        <table>
            <tbody>
                {trending?trending.map(
                    (obj, i)=>{
                        <tr>
                            <td>{i}</td>
                            <td><img src={`http://localhost:4000/thumbnails${obj.thumbnail}`}/></td>
                            <td>{obj.title}</td>
                            <td>{obj.prices[0]}</td>
                            <td>{obj.prices[1]}</td>
                            <td>{obj.prices[2]}</td>
                            <td>{obj.view}</td>
                            <td>{obj.licesors.length}</td>
                        </tr>
                    }
                ):<></>

                }
            </tbody>
        </table>
    </>
}