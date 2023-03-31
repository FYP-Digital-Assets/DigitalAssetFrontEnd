import "./Profile.css";
import EthIcon from "../assets/ethereum.png"
import editIcon from "../assets/edit.png"
import { Link } from "react-router-dom";
// profile in editing mode
function Editing(props){
  return (
    <div className='EditingSection'>
      <div className='imageChose'>
        <h3>profile image</h3>
        <img src="https://placehold.co/600x400" alt="profile image" className="imgProfile"/>
        <input type="file" accept="image/*" className='form-control' onChange={props.handleFileChange}/>
      </div>
      <div className='imageChose'>
        <div class="mb-3 row">
          <label for="inputName" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputName"  value={props.name} onChange={props.handleNameChange}/>
          </div>
         </div>
      </div>
      <Link to=".." relative="path" lassName="editButton">Done</Link>
    </div>
  )
}
// profile withOutEditing mode
function Profile(props){
  return(
    <div className="container-fluid">
        {/* user Information */}
        <div className="row profile_details">
            
            <div className='d-flex juctify-content-left '>
                <Link to="./Editing" relative="path" className="editButton">
                    <img src={editIcon}  alt="nodd" srcset="" />
                    <span className="editSpan">edit</span>
                </Link>
                <img src="https://placehold.co/600x400" alt='Profile pic' className='imgProfile' />
                {/* Name and crytpo address info */}
                <div className='profileText'>
                    <h1 className="heading_2 ">Iqbal Baloch</h1>
                    <div className='d-flex justify-content-left'>
                    <img src={EthIcon} alt='eth icon' className='ethIcon1'/>
                    <p className='text-muted'>232331231313123123133123123</p>
                    </div>
                </div>
                
            
            </div>
            {/* descrition of user / bio */}
            <div className="profileText ms-4 ">
                <div className="bioRapter mt-5">
                    <h1 className="subtitle-text">Bio</h1>
                    <p className="body-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Impedit ratione delectus quo a maiores soluta aspernatur 
                        pariatur quia accusamus odio, nihil asperiores sunt consequuntur 
                        laborum itaque veniam. Atque, nemo quos.
                    </p>
                </div>
                
            
            </div>
        </div>
    </div>
  );
}
export {Profile, Editing}
