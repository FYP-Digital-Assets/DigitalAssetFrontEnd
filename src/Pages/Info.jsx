import BackLeft from "../assets/BackLeftInfo";
import "../App.css";
import Vector1 from "../assets/Vector1.jsx" ;
import Vector2 from "../assets/vector2.svg" ;
import Vector3 from "../assets/vector3.svg" ;
import Vector4 from "../assets/Vector4.svg" ;
import ImgVideo from "../assets/img_video.png";
import ImgImage from "../assets/img_image.png";
import ImgAudio from "../assets/img_audio.png";
import ImgDoc from "../assets/img_doc.png";

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
        {/* catagories */}
        <div className="row my-5 mx-4">
          <h2 className="heading_2 text-color my-4">Content types</h2>
          <div className="container">
            <div className="row">
              <div className="col-3 p-3">
                <div className="card-cat-info">
                  <h3 className="card-cat-info-heading heading_3 text-center p-2 ">Videos</h3>
                  <div className="d-flex justify-content-center align-items-center">
                  <img className="card-cat-img" src={ImgVideo} alt="dd"/>
                  </div>
                </div>
              </div>
              <div className="col-3 p-3">
                <div className="card-cat-info">
                  <h3 className="card-cat-info-heading heading_3 text-center p-2 ">Audios</h3>
                  <div className="d-flex justify-content-center align-items-center">
                  <img className="card-cat-img" src={ImgAudio} alt="dd"/>
                  </div>
                </div>
              </div>
              <div className="col-3 p-3">
                <div className="card-cat-info">
                  <h3 className="card-cat-info-heading heading_3 text-center p-2 ">Photographs</h3>
                  <div className="d-flex justify-content-center align-items-center">
                  <img className="card-cat-img" src={ImgImage} alt="dd"/>
                  </div>
                </div>
              </div>
              <div className="col-3 p-3">
                <div className="card-cat-info">
                  <h3 className="card-cat-info-heading heading_3 text-center p-2 ">Documents</h3>
                  <div className="d-flex justify-content-center align-items-center">
                  <img className="card-cat-img" src={ImgDoc} alt="dd"/>
                  </div>
                </div>
              </div>
            </div>
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
