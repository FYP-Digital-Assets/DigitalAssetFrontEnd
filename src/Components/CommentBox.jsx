export function CommentBox(){
    const comments = []; //read comments in this list
    comments.push({author:"shankar", msg:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.!", img:"https://placehold.co/600x400/000000/FFF"})
    comments.push({author:"iqbal", msg:"Nahi yaar bakwas content hai!!!", img:"https://placehold.co/600x400/red/white"})
    comments.push({author:"javeria", msg:"Nice work!!!", img:"https://placehold.co/600x400/blue/white"})
    comments.push({author:"mhm", msg:"focus on your FYP !!!", img:"https://placehold.co/600x400/orange/white"})
    return (
      <>
        <h2 className="content_detils_reviews">Reviews</h2>
        <div className='w-100 comment_box_container'>
          {comments.map((comment, key)=>{ //render comments individualy
            return (<Comment key={key} {...comment} />);
          })
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
          <p className="auther_msg">{props.msg}</p>
        </div>
        
      </div>
    )
  }