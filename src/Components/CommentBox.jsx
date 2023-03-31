export function CommentBox(){
    const comments = []; //read comments in this list
    comments.push({author:"shankar", msg:"Cool content!!!"})
    comments.push({author:"iqbal", msg:"Nahi yaar bakwas content hai!!!"})
    comments.push({author:"javeria", msg:"Nice work!!!"})
    comments.push({author:"mhm", msg:"focus on your FYP !!!"})
    return (
      <>
      <h2>Comments</h2>
        <hr/>
      <div className='comments'>
        {comments.map((comment)=>{ //render comments individualy
          return (<Comment {...comment} />);
        })
        }
      </div>
      </>
    );
  }
  function Comment(props){
    const style = {backgroundColor:"Lightgray", padding:"1em", margin:"1em", borderRadius:"1em"}; //add this css into file
    return (
      
      <div className='comment' style={style}> {/*remove style from this*/}
        <b>{props.author}</b><br/> {/*author and msg of commentor*/}
        <p>{props.msg}</p>
      </div>
    )
  }