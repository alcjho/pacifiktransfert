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
    transfert_type: "",
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
    const [sendAmount, setSendAmount] = useState(deposit?.send);
    const [maxAmount, setMaxAmount] = useState(deposit?.trxtype == 1?admconfig?.max_sender_money:admconfig?.max_mobile_sender_money);
    const [minAmount, setMinAmount] = useState(deposit?.trxtype == 1?admconfig?.min_sender_money:admconfig?.min_mobile_sender_money)
    const [myTransfertOptions, setMyTransfertOptions] = useState();
    const [receiver, setReceiver] = useState({});
    const [receiverOption, setReceiverOption] = useState();
    const [transfertType, setTransfertType] = useState([deposit?.trxtype]);
    const [bank, setBank] = useState([]);

    const handleChange = e => {
        const { name, value } = e.target;
        if(name == 'amount_to_send'){
            setSendAmount(value)
            let total = calculateFees(value, admconfig?.exchange_rate);
            setReceiveAmout(isNaN(total)?0:total);
        }
        setReceiver({...receiver, [name]: value  });
    }

    const updateFormByAmout = () => {
        let fees = calculateFees(deposit?.send, admconfig?.exchange_rate);
        setReceiver({...receiver, ["amount_to_send"]: deposit?.send, ["amount_to_receive"]: fees});
        setReceiveAmout(fees);
    }

    const handleReceiverChange = selectedOption => {    
        let myreceiver = mytransferts.find((trf) => trf.id == selectedOption.value);
        console.log('my receiver', myreceiver)
        myreceiver = _.pick(myreceiver, 'attributes');
        myreceiver = _.values(myreceiver)[0];
        delete myreceiver.reception_proof;
        setTransfertType([myreceiver?.transfert_type.data?.id]);
        setMaxAmount(myreceiver?.transfert_type.data?.id == 2? admconfig.max_mobile_sender_money:admconfig.max__sender_money)
        setMinAmount(myreceiver?.transfert_type.data?.id == 2? admconfig.min_mobile_sender_money:admconfig.min__sender_money)
        setBank([myreceiver?.transfert_bank.data?.id])
        setSendAmount(myreceiver?.amount_to_send);
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
        receiver.status = "En traitement";
        receiver.transfert_bank = bank;
        receiver.user = [userInfo.id];
        receiver.code = gencode;
        receiver.amount_to_receive = receiveAmount;
        receiver.amount_to_send = sendAmount;

        if (confirm) {
            console.log('receiver', receiver)
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
            setTransfertType(deposit?.trxtype);
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
                        value={bankOptions? bankOptions.find((bk) => bk.value == bank): ''}
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
                        placeholder={"Numéro mobile money"}  
                        className={"form-control ".concat(errors.mobile_money_number ? "is-invalid" : "")}
                        value={receiver?receiver?.mobile_money_number:''}
                        onChange={(e)=>handleChange(e)}
                        ref={register({required: true})}
                    />
                </div>
                <div className='invalid-feedback' style={{display: 'block'}}>
                    {errors.mobile_money_number && 'Veuillez entrer le numéro de téléphone Mobile money'}
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
                            <div className="form-group" style={{display: 'flex'}}>
                                <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                <input 
                                    type="number" 
                                    name="amount_to_send" 
                                    placeholder={"Montant initial"}  
                                    className={"form-control ".concat(errors.amount_to_send ? "is-invalid" : "") + " w-25" } 
                                    value={sendAmount}
                                    onChange={(e)=>{handleChange(e)}}
                                    ref={register({ required: true, min: minAmount, max: maxAmount})}
                                />
                                <label for="amount_to_send">
                                    <p className="pt-3 h5 text-warning">&nbsp; : {admconfig.default_sender_currency}</p>
                                </label>
                            </div>
                            <div className='invalid-feedback' style={{display: 'block'}}>
                                {errors.amount_to_send  && 'Veuillez entrer le montant à envoyer. '}
                                {errors.amount_to_send && errors.amount_to_send.type === "max" && `Maximum ${maxAmount} CAD`}
                                {errors.amount_to_send && errors.amount_to_send.type === "min" && `Minimum ${minAmount}`}
                            </div>

                            <div className="form-group mt-2" style={{display:'flex'}}>
                                <input 
                                    type="number" 
                                    name="amount_to_receive" 
                                    placeholder={"Montant à recevoir"}  
                                    className={"form-control ".concat(errors.amount_to_receive ? "is-invalid" : "") + " w-25"} 
                                    value={receiveAmount}
                                    onChange={(e)=>handleChange(e)}
                                    ref={register({ required: true })}
                                    disabled={true}
                                />
                                <label for="amount_to_receive pt-2">
                                    <p className="pt-3 h5 text-warning">&nbsp; : {admconfig.default_receiver_currency}</p>
                                </label>
                            </div>
                            <div className='invalid-feedback' style={{display: 'block'}}>
                                {errors.amount_to_receive && 'Veuillez entrer le montant à recevoir'}
                            </div>
                            <div className="form-group">
                                <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                <input 
                                    type="text" 
                                    name="to_firstname" 
                                    placeholder={"Prénom"} 
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
                                    placeholder={"Nom"}  
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
                                    type="email" 
                                    name="to_email" 
                                    placeholder={"Courriel du destinataire"}  
                                    className="form-control"
                                    value={receiver?receiver?.to_email:''}
                                    onChange={(e)=>handleChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                <input 
                                    type="text" 
                                    name="to_city" 
                                    placeholder={"Ville"}  
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
                            <p className="alert alert-warning mb-5 display4">Afin de traiter votre transfert de <strong><strong className="text-success">{receiver?.amount_to_send} {admconfig.default_sender_currency}</strong></strong> au plus vite, envoyez-nous votre interac à <b style={{color:'red'}}>{admconfig?.interac_email}</b>  utilisant le code à 6 chiffres <b style={{color:'red'}}>{gencode}</b></p>
                            <div className="form-group">
                                <label 
                                    className='fw-bold mb-1'
                                >
                                    {"Montant initial"}
                                </label>
                                <div>
                                    {receiver?.amount_to_send} {admconfig.default_sender_currency}
                                </div>
                            </div>
                            <div className="form-group">
                                <label 
                                    className='fw-bold mb-1'
                                >
                                    {"Montant à recevoir"}
                                </label>
                                <div>
                                    {receiver?.amount_to_receive ? receiver?.amount_to_receive: receiveAmount} {admconfig.default_receiver_currency}
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label 
                                    htmlFor="to_name" 
                                    className='fw-bold mb-1'
                                >
                                    {"Nom"}
                                </label>
                                <div>
                                    {receiver?.to_firstname + ' ' + receiver?.to_name}
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
                                        {"Numéro mobile money"}
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
                        <Link href="/transactions?page=1&items=20" className="btn btn-primary">{"retour à l'acceuil"}</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default ContactForm;