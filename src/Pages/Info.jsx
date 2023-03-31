import BackLeft from "../assets/BackLeftInfo";
import "../App.css";
import Vector1 from "../assets/Vector1.jsx" ;
import Vector2 from "../assets/vector2.svg" ;
import Vector3 from "../assets/vector3.svg" ;
import Vector4 from "../assets/Vector4.svg" ;

export const Info = () => {
  return (
    <>
      <BackLeft />
      <div className="container-fluid mt-5 ">

        {/* first */}
        <div className="row mb-5">
          <div className="col-5 offset-1 d-flex flex-column justify-content-center">
            <h2 className="heading_1">Digital Asset</h2>
           
            
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Nisi magni provident explicabo fuga aspernatur porro enim 
              libero mollitia eum sit vero tenetur, consequatur ipsum 
              soluta sunt accusantium quo, voluptatibus quidem. 
            </p>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <Vector1/>
          </div>
        </div>

        {/* second */}
        <div className="row my-5">
          <div className="col-6 d-flex justify-content-center">
            <img src={Vector2} alt="vector 2"  />
          </div>
          <div className="col-5 d-flex flex-column justify-content-center">
            
            <h2 className="heading_1">Videos</h2>
           
            
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Nisi magni provident explicabo fuga aspernatur porro enim 
              libero mollitia eum sit vero tenetur, consequatur ipsum 
              soluta sunt accusantium quo, voluptatibus quidem. 
            </p>
          </div>
          
        </div>


         {/* third */}
         <div className="row my-5">
          <div className="col-5 offset-1 d-flex flex-column justify-content-center">
            <h2 className="heading_1">Audios</h2>
           
            
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Nisi magni provident explicabo fuga aspernatur porro enim 
              libero mollitia eum sit vero tenetur, consequatur ipsum 
              soluta sunt accusantium quo, voluptatibus quidem. 
            </p>
          </div>
          <div className="col-6 d-flex justify-content-center">
          <img src={Vector3} alt="vector 2"  />
          </div>
        </div>




        {/* fourth */}
        <div className="row my-5">
          <div className="col-6 d-flex justify-content-center ">
            <Vector1/>
          </div>
          <div className="col-5  d-flex flex-column justify-content-center">
            
            <h2 className="heading_1">Photographs</h2>
           
            
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Nisi magni provident explicabo fuga aspernatur porro enim 
              libero mollitia eum sit vero tenetur, consequatur ipsum 
              soluta sunt accusantium quo, voluptatibus quidem. 
            </p>
          </div>
          
        </div>

        {/* fifth */}
        <div className="row my-5">
          <div className="col-5 offset-1 d-flex flex-column justify-content-center">
            <h2 className="heading_1">Documents</h2>
           
            
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Nisi magni provident explicabo fuga aspernatur porro enim 
              libero mollitia eum sit vero tenetur, consequatur ipsum 
              soluta sunt accusantium quo, voluptatibus quidem. 
            </p>
          </div>
          <div className="col-6 d-flex justify-content-center ">
          <img src={Vector4} alt="vector 2"  />
          </div>
        </div>


      </div>
    </>
  )
}

export default Info ;
