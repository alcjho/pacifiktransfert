import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BACKEND_URL } from '../../config/constant';
import SelectComponent from 'react-select';
import nookies from 'nookies';
import Link from 'next/link';
import calculateFees from '../../components/Rates/calculate';
import _ from 'underscore'

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
    transfert_type: ""
};

const ContactForm = ({ banks, userInfo, admconfig, deposit, mytransferts, gencode }) => {
    const sendAndReceive = nookies.get();
    const [recipient, setRecipient] = useState(INITIAL_STATE);
    const { register, handleSubmit, errors, control } = useForm();
    const [confirm, setConfirm] = useState(false)
    const [sucessSent, setSucessSent] = useState(false);
    const [ orangeDisabled, setOrangeDisabled ] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState("")
    const [bankOptions, setBankOptions] = useState();    
    const [receiveAmount, setReceiveAmout] = useState();
    const [myTransfertOptions, setMyTransfertOptions] = useState();
    const [receiver, setReceiver] = useState({});
    const [receiverOption, setReceiverOption] = useState();
    const [transfertType, setTransfertType] = useState([]);
    const [bank, setBank] = useState([]);
    const handleChange = e => {
        const { name, value } = e.target;
        if(name == 'amount_to_send'){
            let total = calculateFees(value, admconfig?.exchange_rate);
            setReceiveAmout(total);
        }
        setReceiver({...receiver, [name]: value });
    }

    const updateFormByAmout = () => {
        setReceiver({...receiver, ["amount_to_send"]: deposit?.send, ["amount_to_receive"]: calculateFees(deposit?.send, admconfig?.exchange_rate)})
    }

    const handleReceiverChange = selectedOption => {    
        let myreceiver = mytransferts.find((trf) => trf.id == selectedOption.value);
        myreceiver = _.pick(myreceiver, 'attributes');
        myreceiver = _.values(myreceiver)[0];
        delete myreceiver.reception_proof;
        setTransfertType([myreceiver?.transfert_type.data?.id]);
        setBank([myreceiver?.transfert_bank.data?.id])
        setReceiveAmout(calculateFees(myreceiver?.amount_to_send, admconfig?.exchange_rate))
        setReceiver(myreceiver)
    }

    const handleBankChange = selectedOption => {
        setReceiver({...receiver, ['transfert_bank']:  [selectedOption.value] });
        setBank([selectedOption.value]);
    }

    const getBanksWithOptions = () => {
        let BanksWithOptions = []
        banks.map((option)=>{
            BanksWithOptions.push({label: option.attributes.name, value: option.id})
        })
        setBankOptions(BanksWithOptions)  
    }

    const getOldTransfertsOption = () => {
        let oldTransfertsOption = []
        mytransferts.map((option)=>{
            oldTransfertsOption.push({label: option.attributes.to_firstname+' '+option.attributes.to_name, value: option.id})
        })
        setMyTransfertOptions(oldTransfertsOption)
    }

    const getConfirmationMessage = async () => {
        await axios.get(BACKEND_URL+'/api/success-transfert', {params: {populate:'*'}})
        .then((response)=>{
            setConfirmationMessage(response.data.data.attributes.confirmation_message)
        });
    }

    const onSubmit = async (e) => {
        setConfirm(true)
        receiver.transfert_type = transfertType;
        receiver.transfert_bank = bank
        receiver.user = [userInfo.id];
        receiver.code = gencode;
        receiver.amount_to_receive = calculateFees(receiver?.amount_to_send, admconfig?.exchange_rate);
        if (confirm) {
            axios
                .post(BACKEND_URL+'/api/user-transferts', {data: receiver}, {
                    headers: {
                        Authorization: `Bearer ${userInfo.jwt}`
                    }
                })
                .then(response => {
                    setSucessSent(true)
                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                });
        }
    };

    const onError = (errors, e) => {
        console.log('error', errors)
      };

    useEffect(() => {
        setTransfertType([deposit?.trxtype]);
        updateFormByAmout();
        getConfirmationMessage();
      }, [])

      useEffect(() => {
        getBanksWithOptions();
        getOldTransfertsOption();
      }, [])

      useEffect(() => {
        if(!receiver?.transfert_type){
            setTransfertType(deposit.trxtype);
        }else{
            setTransfertType(receiver.transfert_type);
        }
      }, [])


    const bankFields = () => {
        return(
            <>
                <div className="form-group" style={{textAlign:'left'}}>
                    <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                    <SelectComponent 
                        name="transfert_bank"
                        placeholder="Selectionnez une banque" 
                        options={ bankOptions } 
                        onChange={selectedOption => {handleBankChange(selectedOption);}}
                    />
                        
                    {/* <div className='invalid-feedback' style={{display: 'block'}}>
                        {selectTypeError && 'Veuillez selectionner une banque pour le transfert'}
                    </div> */}
                </div> 
                <div className="form-group">
                    <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                    <input 
                        type="text" 
                        name="account_number" 
                        placeholder={"Numero de compte"}  
                        className={"form-control ".concat(errors.account_number ? "is-invalid" : "")} 
                        value={receiver? receiver?.account_number:''}
                        onChange={(e)=>handleChange(e)}
                    />
                    <div className='invalid-feedback' style={{display: 'block'}}>
                        {errors.account_number && 'Veuillez entrer le numero de compte'}
                    </div>
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        name="bank_branch" 
                        placeholder={"Nom de la branche"}  
                        className={"form-control "} 
                        value={receiver?receiver?.bank_branch:''}
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="agency_code" 
                                placeholder={"Code agence"}  
                                className="form-control" 
                                value={receiver?receiver?.agency_code:''}
                                onChange={(e)=>handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="agency_key" 
                                placeholder={"Cle agence"}  
                                className="form-control " 
                                value={receiver?receiver?.agency_key:''}
                                onChange={(e)=>handleChange(e)}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const mobileFields = () => {
        return(
            <>
                <div className='d-flex'>
                    <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                    <h6 className='me-2 mb-0 align-self-center'>+237</h6>
                    <input 
                        type="text" 
                        name="mobile_money_number" 
                        placeholder={"numéro mobile money"}  
                        className={"form-control ".concat(errors.mobile_money_number ? "is-invalid" : "")}
                        value={receiver?receiver?.mobile_money_number:''}
                        onChange={(e)=>handleChange(e)}
                        ref={register({required: true})}
                    />
                </div>
                <div className='invalid-feedback' style={{display: 'block'}}>
                    {errors.mobile_money_number && 'Veuillez entrer le numéro de téléphone Mobile money'}
                    {/* {errors.to_phone && errors.mobile_money_number.type === "pattern" && 'entrer un numéro de téléphone valide'} */}
                </div>
            </>
        )
    }

    return (
    
        <div className="contact-form">
            {!sucessSent ? 
            
                <form id="contactForm" className='mx-5' onSubmit={handleSubmit(onSubmit, onError)}>
                    {!confirm ?
                        <div>
            <               div className="form-group">
                                <SelectComponent 
                                    placeholder="Selectionnez un desinataire existant"
                                    value={receiverOption}
                                    options={ myTransfertOptions } 
                                    onChange={selectedOption => {setReceiverOption(selectedOption); handleReceiverChange(selectedOption);}}
                                />                                   
                            </div> 
                            <div className="form-group">
                                <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                <input 
                                    type="number" 
                                    name="amount_to_send" 
                                    placeholder={"Montant initial"}  
                                    className={"form-control ".concat(errors.amount_to_send ? "is-invalid" : "")} 
                                    value={receiver? receiver?.amount_to_send:''}
                                    onChange={(e)=>{handleChange(e)}}
                                    ref={register({ required: true, min: admconfig?.min_sender_money?admconfig.min_sender_money:10, max: admconfig?.max_sender_money?admconfig.max_sender_money:1000 })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.amount_to_send  && 'Veuillez entrer le montant à envoyer'}
                                    {errors.amount_to_send && errors.amount_to_send.type === "max" && `maximum ${admconfig?.max_sender_money?admconfig.max_sender_money:1000} CAD`}
                                    {errors.amount_to_send && errors.amount_to_send.type === "min" && `minimum ${admconfig?.min_sender_money?admconfig.min_sender_money:1000}`}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="number" 
                                    name="amount_to_receive" 
                                    placeholder={"Montant à recevoir"}  
                                    className={"form-control ".concat(errors.amount_to_receive ? "is-invalid" : "")} 
                                    value={receiveAmount}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                    disabled={true}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.amount_to_receive && 'Veuillez entrer le montant à recevoir'}
                                </div>
                            </div>
                            <div className="form-group">
                                <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                <input 
                                    type="text" 
                                    name="to_firstname" 
                                    placeholder={"prénom"} 
                                    className={"form-control ".concat(errors.to_firstname ? "is-invalid" : "")} 
                                    value={receiver?receiver?.to_firstname:''}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_firstname && 'Veuillez entrer le prénom du destinataire'}
                                </div>
                            </div>
                            <div className="form-group">
                                <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                <input 
                                    type="text" 
                                    name="to_name" 
                                    placeholder={"nom"}  
                                    className={"form-control ".concat(errors.to_name ? "is-invalid" : "")}
                                    value={receiver?receiver?.to_name:''}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_name && 'Veuillez entrer le nom du destinataire'}
                                </div>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    placeholder={"deuxième prénom"}  
                                    name="to_middle_name" 
                                    className="form-control" 
                                    value={receiver?receiver?.middle_name:''}                                    
                                    onChange={(e)=>handleChange(e)}
                                    ref={register}
                                />
                            </div>
                            <div className="form-group">
                                <div className='d-flex'>
                                    <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                    <h6 className='me-2 mb-0 align-self-center'>+237</h6>
                                    <input 
                                        type="text" 
                                        name="to_phone" 
                                        placeholder={"numéro de téléphone"}  
                                        className={"form-control ".concat(errors.to_phone ? "is-invalid" : "")}
                                        value={receiver?receiver?.to_phone:''}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register}
                                    />
                                </div>
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_phone && errors.to_phone.type === "required" && 'Veuillez entrer le numéro de téléphone'}
                                    {errors.to_phone && errors.to_phone.type === "pattern" && 'Veuillez entrer un numéro de téléphone valide'}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className='d-flex'>
                                    <h6 className='me-2 mb-0 align-self-center'>+237</h6>
                                    <input 
                                        type="text" 
                                        name="to_other_phone" 
                                        placeholder={"Veuillez entrer un second numéro de téléphone"}  
                                        className={"form-control"}
                                        value={receiver?receiver?.to_other_phone:''}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                <input 
                                    type="email" 
                                    name="to_email" 
                                    placeholder={"Courriel du destinataire"}  
                                    className={"form-control ".concat(errors.to_email ? "is-invalid" : "")}
                                    value={receiver?receiver?.to_email:''}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_email && 'Veuillez entrer le courriel du destinataire'}
                                </div>
                            </div>
                            <div className="form-group">
                                <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                <input 
                                    type="text" 
                                    name="to_city" 
                                    placeholder={"ville"}  
                                    className={"form-control ".concat(errors.to_city ? "is-invalid" : "")}
                                    value={receiver?receiver?.to_city:''}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_city && 'Veuillez entrer la ville du destinataire'}
                                </div>
                            </div>
                            <div className="form-group">
                                <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                <input 
                                    type="text" 
                                    name="to_address" 
                                    placeholder={"Adresse de destinataire"}  
                                    className={"form-control ".concat(errors.to_address ? "is-invalid" : "")}
                                    value={receiver?receiver?.to_address:''}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.to_address && "Veuillez entrer l'adresse du destinataire"  }
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                <input 
                                    type="text" 
                                    name="reason" 
                                    placeholder={"Raison de l'envoie"}  
                                    className={"form-control ".concat(errors.reason ? "is-invalid" : "")}
                                    value={receiver?receiver?.reason:''}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                />
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.reason && 'Veuillez entrer la raison du transfert'}
                                </div>
                            </div>

                            {   
                                transfertType == 1
                                ? bankFields()
                                :''
                            }

                            {
                                transfertType == 2
                                ? mobileFields()
                                :''
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
                                    {receiver?.amount_to_send}
                                </div>
                            </div>
                            <div className="form-group">
                                <label 
                                    className='fw-bold mb-1'
                                >
                                    {"Montant à recevoir"}
                                </label>
                                <div>
                                    {receiver?.amount_to_receive ? receiver?.amount_to_receive: receiveAmount}
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
                                    {receiver?.to_firstname}
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
                                    {receiver?.to_name}
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
                                    {receiver?.to_middle_name ? receiver?.to_middle_name : '-vide-'}
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
                                    {receiver?.to_phone}
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
                                    {receiver?.to_other_phone}
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
                                    {receiver.to_city}
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
                                    {receiver.to_address}
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
                                    {receiver?.reason}
                                </div>
                            </div>
                            {transfertType == 1?
                                <>
                                <div className="form-group">
                                    <label 
                                        htmlFor="transfert_bank" 
                                        className='fw-bold mb-1'
                                    >
                                        {"banque"}
                                    </label>
                                    <div>
                                        { (bankOptions.find(option => option.value == receiver?.transfert_bank[0]))?.label }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label 
                                        htmlFor="account_number" 
                                        className='fw-bold mb-1'
                                    >
                                        {"Numero de compte"}
                                    </label>
                                    <div>
                                        {receiver?.account_number}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label 
                                        htmlFor="bank_branch" 
                                        className='fw-bold mb-1'
                                    >
                                        {"Nom de la branche"}
                                    </label>
                                    <div>
                                        {receiver?.bank_branch}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label 
                                        htmlFor="agency_code" 
                                        className='fw-bold mb-1'
                                    >
                                        {"Code agence"}
                                    </label>
                                    <div>
                                        {receiver?.agency_code}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label 
                                        htmlFor="agency_key" 
                                        className='fw-bold mb-1'
                                    >
                                        {"Code agence"}
                                    </label>
                                    <div>
                                        {receiver?.agency_key}
                                    </div>
                                </div>
                                </>
                                :''
                            }

                            {transfertType == 2?
                                <>
                                <div className="form-group">
                                    <label 
                                        htmlFor="mobile_money_number" 
                                        className='fw-bold mb-1'
                                    >
                                        {"Numero mobile money"}
                                    </label>
                                    <div>
                                        {receiver?.mobile_money_number}
                                    </div>
                                </div>
                                </>
                                :''                               
                            }
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