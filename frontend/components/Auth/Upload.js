import React from 'react';
import axios from 'axios'
import { BACKEND_URL, BEARER_TOKEN } from '../../config/constant';
export default class FileUpload extends React.Component{
    state = {
        file: null,
        url: null,
    }

    handleChange = (event) => {
        this.setState({file: event.target.files[0]})
    }

    handleSubmit = () => {
        const data = new FormData();
        data.append('files', this.state.file)
        axios({
            method: 'POST',
            url: BACKEND_URL+'/api/upload/', data,
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`
            },
            data
        }).then((response)=>{
            const { data } = response;
            if(this.props.picWithPhoto){
                this.props.picWithPhoto(data[0]);
            }else if(this.props.picWithAddress){
                this.props.picWithAddress(data[0]);
            }
        }).catch((e)=>{
            console.log(e)
        })
    
    }

    render(){
        return(
            // <form onSubmit={this.handleSubmit}>
            <>
                <input type='file' name='file' onChange={this.handleChange}/>
                <button type="button" onClick={()=>this.handleSubmit()}>Sauvegarder</button>
            </>
            // </form>
        )
    }
}