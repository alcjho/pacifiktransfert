import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BACKEND_URL } from '../../config/constant';
import SelectComponent from 'react-select';

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
    to_firstname: "",
    to_name: "",
    to_middle_name: "",
    to_phone: "",
    to_city: "",
    to_address: "",
    to_email: "",
    reason: "",
    to_other_phone: "",
    amount_to_send: "",
    amount_to_receive: "",
    orange_number: "",
    transfert_type: ""
};

const ContactForm = ({ contactInfo, userInfo }) => {

    const [recipient, setRecipient] = useState(INITIAL_STATE);
    const { register, handleSubmit, errors } = useForm();
    const [confirm, setConfirm] = useState(false)
    const [sucessSent, setSucessSent] = useState(false);
    const [ trxTypes, setTrxTypes ] = useState([])
    const [ orangeDisabled, setOrangeDisabled ] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setRecipient({...recipient, [name]: value });
    }

    const handleTrxTypeChange = e => {
        if(e.value == 1){
            setOrangeDisabled(true);
        }else{
            setOrangeDisabled(false);
        }

        const { name, value } = {name: 'transfert_type', value: [e.value]}
        setRecipient({...recipient, [name]: value });
    }

    const getTrxTypes = async () => {
        await axios.get(BACKEND_URL+'/api/transfert-types',{
            headers: {
                Authorization: `Bearer ${userInfo.jwt}`,
            },
        }).then((response)=>{
            let data = response.data.data;
            let options = [];
            data.map((opt)=>{
                options.push({value: opt.id, label: opt.attributes.name_fr})
            })            
            setTrxTypes(options)
        });
        
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setConfirm(true)
        if (confirm) {
            recipient.user = [userInfo.id]
            axios
                .post(BACKEND_URL+'/api/user-transferts', {data: recipient}, {
                    headers: {
                        Authorization: `Bearer ${userInfo.jwt}`
                    }
                })
                .then(response => {
                    console.log(response)
                    setSucessSent(true)
                });
            // try {
            //     const { data } = await axios.post(BACKEND_URL+'/api/user-transferts', {to_name: 'Jean-louis', to_email: 'Yamileyjla@gmail.com', to_firstname: 'Yamiley', amount_to_send: '1000', amount_to_receive: '70000'}, {
            //         headers: {
            //             Authorization: `Bearer ${userInfo.jwt}`,
            //         },
            //     });
                
            // } catch (error) {
            //     console.log(error)
            // }
        }
    };

    useEffect(() => {
        getTrxTypes();
      }, [])

    return (
    
        <div className="contact-form">
            {!sucessSent ? 
            
                <form id="contactForm" className='mx-5' onSubmit={onSubmit}>
                    {!confirm ?
                        <div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="to_firstname" 
                                    placeholder={"prenom"} 
                                    className="form-control" 
                                    value={recipient.to_firstname}
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
                                    name="to_name" 
                                    placeholder={"nom"}  
                                    className="form-control" 
                                    value={recipient.to_name}
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
                                    name="to_middle_name" 
                                    placeholder={"deuxieme nom"}  
                                    className="form-control" 
                                    value={recipient.to_middle_name}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="to_phone" 
                                    placeholder={"numero de telephone"}  
                                    className="form-control" 
                                    value={recipient.to_phone}
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
                                    name="to_other_phone" 
                                    placeholder={"entrer un second numéro de téléphone"}  
                                    className="form-control" 
                                    value={recipient.to_other_phone}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_other_phone && 'entrer un autre numéro de téléphone'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="to_email" 
                                    placeholder={"Courriel du destinataire"}  
                                    className="form-control" 
                                    value={recipient.to_email}
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
                                    name="to_city" 
                                    placeholder={"ville"}  
                                    className="form-control" 
                                    value={recipient.to_city}
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
                                    name="to_address" 
                                    placeholder={"Adresse de distinataire"}  
                                    className="form-control" 
                                    value={recipient.to_address}
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
                                    name="amount_to_send" 
                                    placeholder={"Montant initial"}  
                                    className="form-control" 
                                    value={recipient.amount_to_send}
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
                                    name="amount_to_receive" 
                                    placeholder={"Montant a recevoir"}  
                                    className="form-control" 
                                    value={recipient.amount_to_receive}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                    // disabled={true}
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
                            <div className="form-group" style={{textAlign:'left'}}>
                                <SelectComponent 
                                    placeholder="Selectionnez le type de transfert" 
                                    value={trxTypes.find(obj => obj.value === trxTypes)}
                                    options={trxTypes} 
                                    onChange={handleTrxTypeChange}/>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="orange_number" 
                                    placeholder={"Numéro orange money"}  
                                    className="form-control" 
                                    value={recipient.orange_number}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                    disabled={orangeDisabled}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_other_phone && 'entrer un autre numéro de téléphone'}
                                </div>
                            </div>
                            
                            <div>
                                <button style={{zIndex: 0}} type="submit" className="btn btn-primary">{"Continuer"}</button>
                            </div>
                        </div> 
                        : 
                        <div className='confirm'>
                            <div className="form-group">
                                <label 
                                    htmlFor="to_firstname" 
                                    className='fw-bold mb-1'
                                >
                                    {"Prénom"}
                                </label>
                                <div>
                                    {recipient.to_firstname}
                                </div>
                            </div>
                            <div className="form-group">
                                <label 
                                    htmlFor="to_name" 
                                    className='fw-bold mb-1'
                                >
                                    {"nom"}
                                </label>
                                <div>
                                    {recipient.to_name}
                                </div>
                            </div>
                            <div className="form-group">
                                <label 
                                    htmlFor="to_middle_name" 
                                    className='fw-bold mb-1'
                                >
                                    {"deuxieme nom"}
                                </label>
                                <div>
                                    {recipient.to_middle_name ? recipient.secondname : '-vide-'}
                                </div>
                            </div>
                            <div className="form-group">
                                <label 
                                    htmlFor="phone" 
                                    className='fw-bold mb-1'
                                >
                                    {"numero de telephone"}
                                </label>
                                <div>
                                    {recipient.to_phone}
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
                                    {recipient.to_city}
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
                                    {recipient.to_address}
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
                                    htmlFor="transfert_type" 
                                    className='fw-bold mb-1'
                                >
                                    {"Type de transfert"}
                                </label>
                                <div>
                                    {recipient.transfert_type}
                                </div>
                            </div>
                            <div className="form-group">
                                <label 
                                    htmlFor="orange_money" 
                                    className='fw-bold mb-1'
                                >
                                    {"Numéro orange money"}
                                </label>
                                <div>
                                    {recipient.transfert_type==1?recipient.numero_orange:'N/A'}
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div>
                                    <button type="button" onClick={()=> setConfirm(false)} className="btn btn-secondary me-2">{"modifier"}</button>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary" onClick={()=> setConfirm(true)}>{"Confirmer"}</button>
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