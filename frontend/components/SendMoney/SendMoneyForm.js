import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BACKEND_URL } from '../../config/constant';
import SelectComponent from 'react-select';
import nookies from 'nookies';
import Link from 'next/link';

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

const ContactForm = ({ contactInfo, userInfo, admconfig, gencode }) => {
    const sendAndReceive = nookies.get();
    const [recipient, setRecipient] = useState(INITIAL_STATE);
    const { register, handleSubmit, errors, control } = useForm();
    const [confirm, setConfirm] = useState(false)
    const [sucessSent, setSucessSent] = useState(false);
    const [ trxTypes, setTrxTypes ] = useState([])
    const [ orangeDisabled, setOrangeDisabled ] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const [selectTypeError, setSelectTypeError] = useState(false)

    const handleChange = e => {
        const { name, value } = e.target;
        setRecipient({...recipient, [name]: value });
    }

    const updateFormByAmout = () => {
        setRecipient({...recipient, ["amount_to_send"]: sendAndReceive.send, ["amount_to_receive"]: sendAndReceive.receive})
    }

    const handleTrxTypeChange = e => {
        console.log('handle', e)
        if(e.value == 1){
            setOrangeDisabled(true);
        }else{
            setOrangeDisabled(false);
        }

        const { name, value } = {name: 'transfert_type', value: [e.value]}
        setRecipient({...recipient, [name]: value });
        console.log('type', getTypeLabel(e.value))
    }

    const getTrxTypes = async () => {
        await axios.get(BACKEND_URL+'/api/transfert-types', {
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

    const getTypeLabel = (value) => {
        const result = trxTypes.find(type => type.value == value)
        return result?.label;
    }

    const getConfirmationMessage = async () => {
        await axios.get(BACKEND_URL+'/api/success-transfert', {params: {populate:'*'}})
        .then((response)=>{
            setConfirmationMessage(response.data.data.attributes.confirmation_message)
        });
    }

    const onSubmit = async (e) => {
        if (orangeDisabled !== null) {
            setConfirm(true)
            if (confirm) {
                recipient.user = [userInfo.id]
                recipient.code = gencode;
                axios
                    .post(BACKEND_URL+'/api/user-transferts', {data: recipient}, {
                        headers: {
                            Authorization: `Bearer ${userInfo.jwt}`
                        }
                    })
                    .then(response => {
                        setSucessSent(true)
                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    });
            }
        }
        else {
            setSelectTypeError(true)
        }
    };

    const onError = (errors, e) => {
        console.log('error', errors)
        if (orangeDisabled === null) {
            setSelectTypeError(true)
        }
      };

    const updateAmount = (e) => {
          setRecipient({...recipient, ["amount_to_receive"]: Number(e.target.value) * Number(admconfig?.exchange_rate?admconfig?.exchange_rate:0)})
      }

    useEffect(() => {
        getTrxTypes();
        updateFormByAmout();
        getConfirmationMessage();
      }, [])

    return (
    
        <div className="contact-form">
            {!sucessSent ? 
            
                <form id="contactForm" className='mx-5' onSubmit={handleSubmit(onSubmit, onError)}>
                    {!confirm ?
                        <div>

                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="amount_to_send" 
                                    placeholder={"Montant initial"}  
                                    className={"form-control ".concat(errors.amount_to_send ? "is-invalid" : "")} 
                                    value={recipient.amount_to_send}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true, max: 1000, min: 10 })}
                                    onBlur={(e)=> updateAmount(e)}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.amount_to_send && errors.amount_to_send.type === "required"  && 'entrer le montant à envoyer'}
                                    {errors.amount_to_send && errors.amount_to_send.type === "max" && 'maximum 1000$'}
                                    {errors.amount_to_send && errors.amount_to_send.type === "min" && 'min 10$'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="amount_to_receive" 
                                    placeholder={"Montant a recevoir"}  
                                    className={"form-control ".concat(errors.amount_to_receive ? "is-invalid" : "")} 
                                    readOnly
                                    value={recipient.amount_to_receive}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                    disabled={true}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.amount_to_receive && 'entrer le montant à recevoir'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="to_firstname" 
                                    placeholder={"prenom"} 
                                    className={"form-control ".concat(errors.to_firstname ? "is-invalid" : "")} 
                                    value={recipient.to_firstname}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_firstname && 'entrer le prenom'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="to_name" 
                                    placeholder={"nom"}  
                                    className={"form-control ".concat(errors.to_name ? "is-invalid" : "")}
                                    value={recipient.to_name}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_name && 'entrer le nom'}
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
                                <div className='d-flex'>
                                    <h6 className='me-2 mb-0 align-self-center'>+237</h6>
                                    <input 
                                        type="text" 
                                        name="to_phone" 
                                        placeholder={"numero de telephone"}  
                                        className={"form-control ".concat(errors.to_phone ? "is-invalid" : "")}
                                        value={recipient.to_phone}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register}
                                        //ref={register({ required: true, pattern: /(\+?237)?(23|6[6578])\d{7}/ })}
                                    />
                                </div>
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_phone && errors.to_phone.type === "required" && 'entrer le numéro de téléphone'}
                                    {errors.to_phone && errors.to_phone.type === "pattern" && 'entrer un numéro de téléphone valide'}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className='d-flex'>
                                    <h6 className='me-2 mb-0 align-self-center'>+237</h6>
                                    <input 
                                        type="text" 
                                        name="to_other_phone" 
                                        placeholder={"entrer un second numéro de téléphone"}  
                                        className={"form-control ".concat(errors.to_other_phone ? "is-invalid" : "")}
                                        value={recipient.to_other_phone}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register}
                                        //ref={register({ required: true, pattern: /(\+?237)?(23|6[6578])\d{7}/ })}
                                    />
                                </div>
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_other_phone && errors.to_other_phone.type === "required" && 'entrer le numéro de téléphone'}
                                    {errors.to_other_phone && errors.to_other_phone.type === "pattern" && 'entrer un numéro de téléphone valide'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="email" 
                                    name="to_email" 
                                    placeholder={"Courriel du destinataire"}  
                                    className={"form-control ".concat(errors.to_email ? "is-invalid" : "")}
                                    value={recipient.to_email}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_email && 'entrer le courriel du destinataire'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="to_city" 
                                    placeholder={"ville"}  
                                    className={"form-control ".concat(errors.to_city ? "is-invalid" : "")}
                                    value={recipient.to_city}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_city && 'entrer la ville'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="to_address" 
                                    placeholder={"Adresse de destinataire"}  
                                    className={"form-control ".concat(errors.to_address ? "is-invalid" : "")}
                                    value={recipient.to_address}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_address && "entrer l'adresse de destinataire"  }
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="reason" 
                                    placeholder={"Raison de l'envoie"}  
                                    className={"form-control ".concat(errors.reason ? "is-invalid" : "")}
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
                                    className={selectTypeError ? ' is-invalid-select ' : ''}
                                    placeholder="Selectionnez le type de transfert" 
                                    options={trxTypes} 
                                    onChange={(e) => {handleTrxTypeChange(e); setSelectTypeError(false)}}/>
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {selectTypeError && 'selectionner le type de transfert'}
                                </div>
                            </div>
                            {orangeDisabled === false &&
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        name="orange_number" 
                                        placeholder={"Numéro orange money"}  
                                        className={"form-control ".concat(errors.orange_number ? "is-invalid" : "")} 
                                        value={recipient.orange_number}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register}
                                        //ref={ register({ required: orangeDisabled === false, pattern: /(\+?237)?(23|6[6578])\d{7}/  })}
                                        disabled={orangeDisabled}
                                    />
                                    <div className='invalid-feedback' style={{display: 'block'}}>
                                        {errors.orange_number && errors.orange_number === "required" && 'entrer le numéro de téléphone'}
                                        {errors.orange_number && errors.orange_number === "pattern" && 'entrer un numéro de téléphone valide'}
                                    </div>
                                </div>
                            }
                            
                            <div>
                                <button style={{zIndex: 0}} type="submit" className="btn btn-primary">{"Continuer"}</button>
                            </div>
                        </div> 
                        : 
                        <div className='confirm'>
                            <div className="form-group">
                                <label 
                                    className='fw-bold mb-1'
                                >
                                    {"Montant initial"}
                                </label>
                                <div>
                                    {recipient.amount_to_send}
                                </div>
                            </div>
                            <div className="form-group">
                                <label 
                                    className='fw-bold mb-1'
                                >
                                    {"Montant à recevoir"}
                                </label>
                                <div>
                                    {recipient.amount_to_receive}
                                </div>
                            </div>
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
                                    htmlFor="phone" 
                                    className='fw-bold mb-1'
                                >
                                    {"un second numéro de téléphone"}
                                </label>
                                <div>
                                    {recipient.to_other_phone}
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
                                    {recipient.transfert_type ? getTypeLabel(recipient.transfert_type) : ''}
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
                                    {recipient.transfert_type == 2 ? recipient.orange_number:'N/A'}
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
                    <h4 className='fw-bold text-success'>{confirmationMessage}</h4>
                    <img src='/images/payment-successful.png' style={{width: '500px', textAlign: 'center'}} />
                    <div>
                        <Link href="/transactions" className="btn btn-primary">{"retour à l'acceuil"}</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default ContactForm;