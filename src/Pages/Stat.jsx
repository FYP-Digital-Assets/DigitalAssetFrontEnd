import { useState } from "react"

export default function Stat(props){
    //call data from backend using useEffect
    const[trending, setTrending] = useState([
        {title:"abc", thumbnail:"1683743582292.jpeg", prices:[10, 20, 30], view:10, 
        licesors:["a", "b"]},
        {title:"cde", thumbnail:"1683743582292.jpeg", prices:[12, 20, 30], view:100, 
        licesors:["a", "b"]},
        {title:"fgh", thumbnail:"1683743582292.jpeg", prices:[18, 20, 30], view:200, 
        licesors:["a", "b"]},
        {title:"cde", thumbnail:"1683743582292.jpeg", prices:[12, 20, 30], view:100, 
        licesors:["a", "b"]}
        
    ])
    return <div className="container my-5">
        <h2 className=" border-bottom border-dark p-2 heading_2 mb-5">Trending</h2>
        <table className="table-table-stat" >
            <thead className="border-bottom border-secondary">
                <tr className="table-head-row-stat bg-secondary ">
                    <th className="text-light p-3">#</th>
                    <th className="text-light" >Content</th>
                    <th className="text-light" >Title</th>
                    <th className="text-light" >Price1</th>
                    <th className="text-light" >Price2</th>
                    <th className="text-light" >Price3</th>
                    <th className="text-light" >Views</th>
                    <th className="text-light" >Licensors</th>
                </tr>
            </thead>
            <tbody >
                {trending?trending.map(
                    (obj, i)=>{
                        return (
                            // src={`http://localhost:4000/thumbnail/${obj.thumbnail}
                            <tr className=" border-bottom table-row-stat" key={i}>
                                <td className="p-3">{i}</td>
                                <td className="p-2"><img src={`https://placehold.co/600x400`}
                                style={{width:"5rem", height:"4rem", objectFit:"cover"}}
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
    </div>
}