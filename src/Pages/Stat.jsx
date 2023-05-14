import { useState } from "react"
import sortIcon from "../assets/sort-solid.svg"

export default function Stat(props){
    //call data from backend using useEffect
    const[trending, setTrending] = useState([
        {title:"abc", thumbnail:"1683743582292.jpeg", prices:[10, 20, 30], view:10, 
        licesors:["a", "b"]},
        {title:"cde", thumbnail:"1683743582292.jpeg", prices:[12, 201, 370], view:900, 
        licesors:["a", "b"]},
        {title:"fgh", thumbnail:"1683743582292.jpeg", prices:[18, 250, 300], view:200, 
        licesors:["a", "b"]},
        {title:"cde", thumbnail:"1683743582292.jpeg", prices:[1, 20, 30], view:100, 
        licesors:["a", "b"]},
        {title:"cde", thumbnail:"1683743582292.jpeg", prices:[12, 2, 3], view:500, 
        licesors:["a"]},
        {title:"cde", thumbnail:"1683743582292.jpeg", prices:[2, 200, 90], view:90, 
        licesors:["a", "b","c"]}
        
    ])
    const handleOnfilterTranding = (event)=>{
        console.log(event.target.value );
        document.getElementById("main-price_1").style.fill = "none" ;
        document.getElementById("main-price_2").style.fill = "none" ;
        document.getElementById("main-price_3").style.fill = "none" ;
        document.getElementById("main-views").style.fill = "none" ;
        document.getElementById("main-licensors").style.fill = "none" ;
        if(event.target.value == "price_1"){
            document.getElementById("main-price_1").style.fill = "white"
            const sorted = [...trending].sort((a, b) => {
                return a.prices[0] - b.prices[0];
            });
            setTrending(sorted)
        }
        else if(event.target.value == "price_2"){
            document.getElementById("main-price_2").style.fill = "white" ;
            const sorted = [...trending].sort((a, b) => {
                return a.prices[1] - b.prices[1];
            });
            setTrending(sorted)
        }
        else if(event.target.value == "price_3"){
            document.getElementById("main-price_3").style.fill = "white" ;
            const sorted = [...trending].sort((a, b) => {
                return a.prices[2] - b.prices[2];
            });
            setTrending(sorted)
        }
        else if(event.target.value == "views"){
            document.getElementById("main-views").style.fill = "white" ;
            const sorted = [...trending].sort((a, b) => {
                return a.view - b.view;
            });
            setTrending(sorted)
        }
        else if(event.target.value == "licensors"){
            document.getElementById("main-licensors").style.fill = "white" ;
            const sorted = [...trending].sort((a, b) => {
                return a.licesors.length - b.licesors.length;
            });
            setTrending(sorted)
        }
        
    }
    return <div className="container my-5">
        <h2 className=" border-bottom border-dark p-2 heading_2 mb-5">Trending</h2>
        <table className="table-table-stat" >
            <thead className="border-bottom border-secondary">
                <tr className="table-head-row-stat bg-secondary ">
                    
                    <th className="text-light p-3"># </th>
                    <th className="text-light" >Content</th>
                    <th className="text-light" >Title</th>
                    <th> 
                        <label className="text-light filter-lable" htmlFor="filter_price_1">
                            Price1 
                            <svg width="20" height="20" viewBox="0 0 185 343" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="main-price_1" d="M11.4161 109.653L83.1111 14.6769H83.1689L85.4194 11.6956C87.8256 8.50801 90.4669 7.5 92.5225 7.5C94.5781 7.5 97.2194 8.50801 99.6256 11.6956L173.595 109.685C177.299 114.592 178.655 122.508 176.414 129.633C174.14 136.861 169.623 139.541 166.463 139.541H18.5245C15.4087 139.541 10.8419 136.845 8.57355 129.633C6.34499 122.548 7.72071 114.614 11.4056 109.667C11.4091 109.663 11.4126 109.658 11.4161 109.653ZM85.4194 331.304L11.4503 233.315C7.74616 228.408 6.39021 220.492 8.63133 213.367C10.9047 206.139 15.4217 203.459 18.5822 203.459H166.463C169.579 203.459 174.145 206.155 176.414 213.367C178.642 220.453 177.266 228.387 173.581 233.334C173.578 233.338 173.574 233.343 173.571 233.347L99.6256 331.304C97.2194 334.492 94.5781 335.5 92.5225 335.5C90.4669 335.5 87.8256 334.492 85.4194 331.304Z" stroke="#ECF1F4" stroke-width="15"/>
                            </svg>
                            <input type="radio" id="filter_price_1" name="filter_trending" value="price_1" onClick={handleOnfilterTranding} />    
                        </label>  
                        
                    </th>
                    <th className="text-light" > 
                        <label className="text-light filter-lable" htmlFor="filter_price_2">Price2 
                            <svg width="20" height="20" viewBox="0 0 185 343" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="main-price_2" d="M11.4161 109.653L83.1111 14.6769H83.1689L85.4194 11.6956C87.8256 8.50801 90.4669 7.5 92.5225 7.5C94.5781 7.5 97.2194 8.50801 99.6256 11.6956L173.595 109.685C177.299 114.592 178.655 122.508 176.414 129.633C174.14 136.861 169.623 139.541 166.463 139.541H18.5245C15.4087 139.541 10.8419 136.845 8.57355 129.633C6.34499 122.548 7.72071 114.614 11.4056 109.667C11.4091 109.663 11.4126 109.658 11.4161 109.653ZM85.4194 331.304L11.4503 233.315C7.74616 228.408 6.39021 220.492 8.63133 213.367C10.9047 206.139 15.4217 203.459 18.5822 203.459H166.463C169.579 203.459 174.145 206.155 176.414 213.367C178.642 220.453 177.266 228.387 173.581 233.334C173.578 233.338 173.574 233.343 173.571 233.347L99.6256 331.304C97.2194 334.492 94.5781 335.5 92.5225 335.5C90.4669 335.5 87.8256 334.492 85.4194 331.304Z" stroke="#ECF1F4" stroke-width="15"/>
                            </svg>
                            <input type="radio" id="filter_price_2" name="filter_trending" value="price_2" onClick={handleOnfilterTranding} />
                        </label>  
                        
                    </th>
                    <th className="text-light" >
                        <label className="text-light filter-lable" htmlFor="filter_price_3">
                            Price3 
                            <svg width="20" height="20" viewBox="0 0 185 343" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="main-price_3" d="M11.4161 109.653L83.1111 14.6769H83.1689L85.4194 11.6956C87.8256 8.50801 90.4669 7.5 92.5225 7.5C94.5781 7.5 97.2194 8.50801 99.6256 11.6956L173.595 109.685C177.299 114.592 178.655 122.508 176.414 129.633C174.14 136.861 169.623 139.541 166.463 139.541H18.5245C15.4087 139.541 10.8419 136.845 8.57355 129.633C6.34499 122.548 7.72071 114.614 11.4056 109.667C11.4091 109.663 11.4126 109.658 11.4161 109.653ZM85.4194 331.304L11.4503 233.315C7.74616 228.408 6.39021 220.492 8.63133 213.367C10.9047 206.139 15.4217 203.459 18.5822 203.459H166.463C169.579 203.459 174.145 206.155 176.414 213.367C178.642 220.453 177.266 228.387 173.581 233.334C173.578 233.338 173.574 233.343 173.571 233.347L99.6256 331.304C97.2194 334.492 94.5781 335.5 92.5225 335.5C90.4669 335.5 87.8256 334.492 85.4194 331.304Z" stroke="#ECF1F4" stroke-width="15"/>
                            </svg>
                        </label>
                        <input type="radio" id="filter_price_3" name="filter_trending" value="price_3" onClick={handleOnfilterTranding}/>
                    </th>
                    <th className="text-light" >
                        <label className="text-light filter-lable" htmlFor="filter_views">
                            Views 
                            <svg width="20" height="20" viewBox="0 0 185 343" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="main-views" d="M11.4161 109.653L83.1111 14.6769H83.1689L85.4194 11.6956C87.8256 8.50801 90.4669 7.5 92.5225 7.5C94.5781 7.5 97.2194 8.50801 99.6256 11.6956L173.595 109.685C177.299 114.592 178.655 122.508 176.414 129.633C174.14 136.861 169.623 139.541 166.463 139.541H18.5245C15.4087 139.541 10.8419 136.845 8.57355 129.633C6.34499 122.548 7.72071 114.614 11.4056 109.667C11.4091 109.663 11.4126 109.658 11.4161 109.653ZM85.4194 331.304L11.4503 233.315C7.74616 228.408 6.39021 220.492 8.63133 213.367C10.9047 206.139 15.4217 203.459 18.5822 203.459H166.463C169.579 203.459 174.145 206.155 176.414 213.367C178.642 220.453 177.266 228.387 173.581 233.334C173.578 233.338 173.574 233.343 173.571 233.347L99.6256 331.304C97.2194 334.492 94.5781 335.5 92.5225 335.5C90.4669 335.5 87.8256 334.492 85.4194 331.304Z" stroke="#ECF1F4" stroke-width="15"/>
                            </svg>
                            <input type="radio" id="filter_views" name="filter_trending" value="views" onClick={handleOnfilterTranding}/>
                        </label>
                        
                    </th>
                    <th className="text-light" >
                        <label className="text-light filter-lable" htmlFor="filter_licensors">
                            Licensors  
                            <svg width="20" height="20" viewBox="0 0 185 343" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="main-licensors" d="M11.4161 109.653L83.1111 14.6769H83.1689L85.4194 11.6956C87.8256 8.50801 90.4669 7.5 92.5225 7.5C94.5781 7.5 97.2194 8.50801 99.6256 11.6956L173.595 109.685C177.299 114.592 178.655 122.508 176.414 129.633C174.14 136.861 169.623 139.541 166.463 139.541H18.5245C15.4087 139.541 10.8419 136.845 8.57355 129.633C6.34499 122.548 7.72071 114.614 11.4056 109.667C11.4091 109.663 11.4126 109.658 11.4161 109.653ZM85.4194 331.304L11.4503 233.315C7.74616 228.408 6.39021 220.492 8.63133 213.367C10.9047 206.139 15.4217 203.459 18.5822 203.459H166.463C169.579 203.459 174.145 206.155 176.414 213.367C178.642 220.453 177.266 228.387 173.581 233.334C173.578 233.338 173.574 233.343 173.571 233.347L99.6256 331.304C97.2194 334.492 94.5781 335.5 92.5225 335.5C90.4669 335.5 87.8256 334.492 85.4194 331.304Z" stroke="#ECF1F4" stroke-width="15"/>
                            </svg>
                            <input type="radio" id="filter_licensors" name="filter_trending" value="licensors" onClick={handleOnfilterTranding}/>
                        </label>
                        
                    </th>
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