import { useState } from "react";

const AddReview = (props)=>{
    const [review, setReview] = useState("") ;
    const handleReviewChange = (e)=>{
        setReview(e.target.value) ;
    }
    const onSubmitReview = async(e)=>{
        e.preventDefault(); 
        const data = {
            review: review,
            ethAddress: props.addr,
            address: props.address
          };
        
        const response = await fetch("http://localhost:4000/uploadReview", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          }
        );
        const result = await response.json();
    }
    return(
        <div>
            <form className="needs-validation">
                <label for="reviewInput" class="form-label">Review</label>
                <input type="text" className="form-control" id="reviewInput" value={review} onChange={handleReviewChange} required />
                <button class="btn btn-primary" type="submit" onSubmit={onSubmitReview}>Submit Review</button>
            </form>
        </div>
    );
}

export default AddReview ;