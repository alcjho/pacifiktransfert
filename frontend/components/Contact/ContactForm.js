import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import { BACKEND_URL, BEARER_TOKEN } from '../../config/constant';

const alertContent = () => {
    MySwal.fire({
        title: 'Congratulations!',
        text: 'Your message was successfully send and will back to you soon',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
    })
}

// Form initial state
const INITIAL_STATE = {
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
};

const ContactForm = ({ contactInfo }) => {

    const [contact, setContact] = useState(INITIAL_STATE);
    const [success, setSuccess ] = useState()
    const { register, handleSubmit, errors } = useForm();

    const handleChange = e => {
        const { name, value } = e.target;
        setContact(prevState => ({ ...prevState, [name]: value }));
    }

    const onSubmit = async e => {
        const { fullname, email, phone, subject, message } = contact;
        const contact_info = { fullname, email, phone, subject, message };
        axios
            .post(BACKEND_URL+'/api/contact-messages', {data: contact_info}, {
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`
                }
            })
            .then(response => {
                setSuccess(true)
                setContact(INITIAL_STATE)
            });
    };

    return (
    
        <div className="contact-form">
            <form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="fullname" 
                                placeholder={contactInfo.name_placeholder} 
                                className="form-control" 
                                value={contact.fullname}
                                onChange={handleChange}
                                ref={register({ required: true })}
                            />
                            <div className='invalid-feedback' style={{display: 'block'}}>
                                {errors.fullname && 'Le nom complet est obligatoire'}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input 
                                type="email" 
                                name="email" 
                                placeholder={contactInfo.email_placeholder}  
                                className="form-control" 
                                value={contact.email}
                                onChange={handleChange}
                                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                            />
                            <div className='invalid-feedback' style={{display: 'block'}}>
                                {errors.email && 'Le courriel est obligatoire'}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="phone" 
                                placeholder={contactInfo.phone_placeholder}  
                                className="form-control" 
                                value={contact.phone}
                                onChange={handleChange}
                                ref={register({ required: true })}
                            />
                            <div className='invalid-feedback' style={{display: 'block'}}>
                               
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="subject" 
                                placeholder={contactInfo.subject_placeholder}  
                                className="form-control" 
                                value={contact.subject}
                                onChange={handleChange}
                                ref={register({ required: true })}
                            />
                            <div className='invalid-feedback' style={{display: 'block'}}>
                                {errors.subject && 'La raison est obligatoire'}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                            <textarea 
                                name="message" 
                                cols="30" 
                                rows="5" 
                                placeholder={contactInfo.message_placeholder}
                                className="form-control" 
                                value={contact.message}
                                onChange={handleChange}
                                ref={register({ required: true })}
                            />
                            <div className='invalid-feedback' style={{display: 'block'}}>
                                {errors.message && 'Le message ne peut pas être vide'}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 col-sm-12">
                        <button type="submit" className="btn btn-primary">{contactInfo.send_message_btn_label}</button>{
                            success?
                            <img src="/images/success-icon.png" style={{width: '50px', float:'right'}}/>
                            :''
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ContactForm;