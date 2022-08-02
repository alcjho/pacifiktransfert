import React from 'react'
import ReactDOM from 'react-dom'

const ImgUpload =({
    onChange,
    src
  })=>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img htmlFor="photo-upload" src={src}/>
      </div>
      <input id="photo-upload" type="file" onChange={onChange}/> 
    </label> 
  
  export default class CardProfile extends React.Component {
    state = {
      file: '',
      imagePreviewUrl: this.props.photo
    }
  
    photoUpload = e =>{
      e.preventDefault();
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file);
    }
    
    
    render() {
      const {imagePreviewUrl} = this.state;
      return (
        <div className="profile-image-uploader">
              <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl}/>
        </div>
      )
    }
  }
 