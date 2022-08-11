import React from 'react';
import Webcam from "react-webcam";

class WebcamCapture extends React.Component {
    setRef = webcam => {
      this.webcam = webcam;
    };
   
    capture = () => {
      const imageSrc = this.webcam.getScreenshot();
      
      if(this.props.picWithPhoto){
        this.props.picWithPhoto(imageSrc);
      }else if(this.props.picWithAddress){
        this.props.picWithAddress(imageSrc);
      }
    };
   
    render() {
      const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
   
      return (
        <div className="webcam-content">
          <Webcam
            audio={false}
            height={"100%"}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={videoConstraints}
          />
          <button type="button" className="btn btn-info w-100 mt-0" onClick={this.capture}>Prendre une photo <i class="fa-solid fa-camera-retro fa-xl"></i></button>
        </div>
      );
    }
  }

  export default WebcamCapture