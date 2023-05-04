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
import { Link } from "react-router-dom";
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";
export const Info = (props) => {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <>
      <BackLeft />
      <div className="container mt-5">

        {/* first */}
        <div className="row mb-5">
          <div className="col-5 offset-1 d-flex flex-column justify-content-center" data-aos="fade-right">
            <h2 className="heading_2">Digital Asset</h2>
           
            
            <p className="body-text">
              Digital Assets Provenance empowers you to recognize your true value by 
              acknowledging the unwavering effort and dedication that fuel your success. With our 
              cutting-edge blockchain technology, we pave the way for an unparalleled user experience
              that enables you to soar above limitations and bask in the vibrant hues of this 
              magnificent world. Join us on a mission to unlock limitless possibilities!
 
              
            </p>
            <div>
              <Link to="/content">
                <button className="btn btn-primary" >Get Start</button>
              </Link>
            
            </div>
          </div>
          <div className="col-6 d-flex justify-content-center" data-aos="fade-left">
            <Vector1/>
          </div>
        </div>
        {/* catagories */}
        <div className="row my-5 " data-aos="zoom-in" >
          <h2 className="heading_2 text-color my-4">Content types</h2>
          <div className="container">
            <div className="row mb-5">
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
        <div className="row my-5" >
          <div className="col-6 d-flex justify-content-center" data-aos="zoom-in-right">
            <img src={Vector2} alt="vector 2"  />
          </div>
          <div className="col-5 d-flex flex-column justify-content-center" data-aos="zoom-in-left">
            
            <h2 className="heading_2">Videos</h2>
           
            
            <p>
              Imagine being able to relive your most treasured moments as 
              if they were unfolding before you once more. Videos have the 
              unique power to immortalize our memories, ensuring that we always 
              remember them in their best light and inspiring us to capture new experiences. 
              But what if there was a way to take this even further? Thanks to blockchain-based solutions, 
              videos can now be accompanied by strong provenance and authenticity - truly decentralized
              assets with unparalleled value. Don't miss out on the chance to elevate your video content 
              like never before!
 
            </p>
          </div>
          
        </div>


         {/* third */}
         <div className="row my-5">
          <div className="col-5 offset-1 d-flex flex-column justify-content-center" data-aos="zoom-out-right">
            <h2 className="heading_2">Audios</h2>
           
            
            <p>
              Envisage being able to relive cherished memories through sound
              from listening to your favorite tunes, to hearing the voice of someone 
              dear again. As much as audio technology has been primarily geared 
              towards enhancing entertainment experiences in the past. This is how we 
              can offer our audiences a truly multi-sensory experience like no other! 
            </p>
          </div>
          <div className="col-6 d-flex justify-content-center" data-aos="zoom-out-left">
          <img src={Vector3} alt="vector 2"  />
          </div>
        </div>




        {/* fourth */}
        <div className="row my-5" data-aos="fade-right" >
          <div className="col-6 d-flex justify-content-center "data-aos="fade-right">
            <Vector1/>
          </div>
          <div className="col-5  d-flex flex-column justify-content-center" data-aos="fade-left">
            
            <h2 className="heading_2">Photographs</h2>
           
            
            <p>
              The emergence of photography fueled by community engagement
              can serve as a motivating force for photographers to unlock their 
              creative potential and delve into novel approaches, trends and avenues. 
              This movement heralds an era where imagination and originality are
              esteemed in the industry, paving way for enriched self-improvement 
              opportunities through skill enhancement and personal growth.
 
            </p>
          </div>
          
        </div>

        {/* fifth */}
        <div className="row my-5">
          <div className="col-5 offset-1 d-flex flex-column justify-content-center" data-aos="fade-right">
            <h2 className="heading_2">Documents</h2>
           
            
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Nisi magni provident explicabo fuga aspernatur porro enim 
              libero mollitia eum sit vero tenetur, consequatur ipsum 
              soluta sunt accusantium quo, voluptatibus quidem. 
            </p>
          </div>
          <div className="col-6 d-flex justify-content-center " data-aos="fade-left">
          <img src={Vector4} alt="vector 2"  />
          </div>
        </div>

      </div>
    </>
  )
}

export default Info ;
