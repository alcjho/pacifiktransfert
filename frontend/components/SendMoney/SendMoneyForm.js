import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import baseUrl from '../../utils/baseUrl';

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
    firstname: "",
    lastname: "",
    secondname: "",
    phonenumber: "",
    city: "",
    address: "",
    reason: "",
    phonenumber2: ""
};

const ContactForm = ({ contactInfo }) => {

    const [recipient, setRecipient] = useState(INITIAL_STATE);
    const { register, handleSubmit, errors } = useForm();
    const [confirm, setConfirm] = useState(false)
    const [sucessSent, setSucessSent] = useState(false)

    const handleChange = e => {
        const { name, value } = e.target;
        setRecipient(prevState => ({ ...prevState, [name]: value }));
        console.log(recipient)
    }

    const onSubmit = async e => {
        // e.preventDefault();
        console.log('enter here')
        setConfirm(true)
        if (confirm) {
            try {
                // const url = `${baseUrl}/api/contact`;
                // const { firstname, lastname, secondname, phonenumber, city, address, reason, phonenumber2 } = recipient;
                // const payload = { firstname, lastname, secondname, phonenumber, city, address,  reason, phonenumber2};
                // await axios.post(url, payload);
                // console.log(url);
                // setRecipient(INITIAL_STATE);
                setSucessSent(true)
            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
    
        <div className="contact-form">
            {!sucessSent ? 
            
                <form id="contactForm" className='mx-5' onSubmit={handleSubmit(onSubmit)}>
                    {!confirm ?
                        <div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="firstname" 
                                    placeholder={"prenom"} 
                                    className="form-control" 
                                    value={recipient.firstname}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.firstname && 'entrer votre prenom'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="lastname" 
                                    placeholder={"nom"}  
                                    className="form-control" 
                                    value={recipient.lastname}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.lastname && 'entrer votre nom'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="secondname" 
                                    placeholder={"deuxieme nom"}  
                                    className="form-control" 
                                    value={recipient.secondname}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="phonenumber" 
                                    placeholder={"numero de telephone"}  
                                    className="form-control" 
                                    value={recipient.phonenumber}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.phonenumber && 'entrer votre numéro de téléphone'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="city" 
                                    placeholder={"ville"}  
                                    className="form-control" 
                                    value={recipient.city}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.city && 'entrer votre ville'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="address" 
                                    placeholder={"Adresse de distinataire"}  
                                    className="form-control" 
                                    value={recipient.address}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.address && 'entrer votre adresse'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="reason" 
                                    placeholder={"Raison de l'envoie"}  
                                    className="form-control" 
                                    value={recipient.reason}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.reason && 'entrer votre raison'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="phonenumber2" 
                                    placeholder={"Numéro orange money"}  
                                    className="form-control" 
                                    value={recipient.phonenumber2}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.phonenumber2 && 'entrer votre numéro de téléphone'}
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">{"Continuer"}</button>
                            </div>
                        </div> 
                        : 
                        <div className='confirm'>
                            <div className="form-group">
                                <label 
                                    htmlFor="firstname" 
                                    className='fw-bold mb-1'
                                >
                                    {"Prénom"}
                                </label>
                                <div>
                                    {recipient.firstname}
                                </div>
                            </div>
                            <div className="form-group">
                                <label 
                                    htmlFor="firstname" 
                                    className='fw-bold mb-1'
                                >
                                    {"nom"}
                                </label>
                                <div>
                                    {recipient.lastname}
                                </div>
                            </div>
                            <div className="form-group">
                                <label 
                                    htmlFor="firstname" 
                                    className='fw-bold mb-1'
                                >
                                    {"deuxieme nom"}
                                </label>
                                <div>
                                    {recipient.secondname ? recipient.secondname : '-vide-'}
                                </div>
                            </div>
                            <div className="form-group">
                                <label 
                                    htmlFor="firstname" 
                                    className='fw-bold mb-1'
                                >
                                    {"numero de telephone"}
                                </label>
                                <div>
                                    {recipient.phonenumber}
                                </div>
                            </div>
                            <div className="form-group">
                                <label 
                                    htmlFor="city" 
                                    className='fw-bold mb-1'
                                >
                                    {"ville"}
                                </label>
                                <div>
                                    {recipient.city}
                                </div>
                            </div>
                            <div className="form-group">
                                <label 
                                    htmlFor="address" 
                                    className='fw-bold mb-1'
                                >
                                    {"Adresse de distinataire"}
                                </label>
                                <div>
                                    {recipient.address}
                                </div>
                            </div>
                            <div className="form-group">
                                <label 
                                    htmlFor="reason" 
                                    className='fw-bold mb-1'
                                >
                                    {"Raison de l'envoie"}
                                </label>
                                <div>
                                    {recipient.reason}
                                </div>
                            </div>
                            <div className="form-group">
                                <label 
                                    htmlFor="reason" 
                                    className='fw-bold mb-1'
                                >
                                    {"Numéro orange money"}
                                </label>
                                <div>
                                    {recipient.phonenumber2}
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div>
                                    <button type="button" onClick={()=> setConfirm(false)} className="btn btn-secondary me-2">{"modifier"}</button>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary">{"Confirmer"}</button>
                                </div>
                            </div>
                        </div>
                    }
                </form>
                : 
                <div className='text-center'>
                    <h4 className='fw-bold text-success'>L'argent est envoyé par success</h4>
                    <img src='/images/payment-successful.png' style={{width: '500px', textAlign: 'center'}} />
                    <div>
                        <button type="button" className="btn btn-primary">{"retour à l'acceuil"}</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ContactForm;