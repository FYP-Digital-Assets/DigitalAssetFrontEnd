import { useEffect, useMemo, useState } from "react";
export function CommentBox(props){
    const [reviews, setReviews] = useState([])
    useMemo(async ()=>{
      const obj = await fetch(`http://localhost:4000/reviews/${props.address}`).then(res=>res.json())
      obj.reviews = await Promise.all(obj.reviews.map(async review=>{
        const user = await fetch('http://localhost:4000/userInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ethAddress:review.ethAddress})
      }).then(res=>res.json())
      console.log("eth ", review.ethAddress)
      console.log("user ", user)
        return ({...review, author:user.data.name, img:`http://localhost:4000/profileImgs/${user.data.img}`})
      }))
      setReviews(obj.reviews)
      console.log(obj.reviews)
    }, [])
    return (
      
      <>
        <h2 className="content_detils_reviews">Reviews</h2>
        <div className='w-100 comment_box_container'>
          {reviews?reviews.map((comment, key)=>{ //render comments individualy
            return (<Comment key={key} {...comment} />);
          }):<></>
          }
        </div>
      </>
    );
  }
  function Comment(props){
    
    return (
      
      <div className='comment-item'> 
        <img src={props.img} alt="df" />
        <div>
          <p className="auther_name">{props.author}</p>
          <p className="auther_msg">{props.review}</p>
        </div>
        
      </div>
    )
  }