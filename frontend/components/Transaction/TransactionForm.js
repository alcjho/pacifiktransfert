import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BACKEND_URL } from '../../config/constant'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import moment from 'moment';
import Link from 'next/link';
import Modal from "../Utils/Modal";
import transaction from '../../pages/transactions';
import SelectComponent from 'react-select';

export default function Transaction({ userInfo, banks, recipient, admconfig, gencode}) {

    const [confirm, setConfirm] = useState(false);
    const { register, handleSubmit, errors, control } = useForm();
    const [selectTypeError, setSelectTypeError] = useState(false);
    const [ trxTypes, setTrxTypes ] = useState([]);
    const [ orangeDisabled, setOrangeDisabled ] = useState(null);
    const [ infos, setInfos] = useState(recipient?.attributes);
    const [successSent, setSuccessSent] = useState(false);
    const [mobileNumber, setMobileNumber] = useState(recipient?.mobile_money_number);
    const [bankOptions, setBankOptions] = useState();    
    const [selectedBank, setSelectedBank] = useState();
    const [maxAmount, setMaxAmount] = useState(recipient?.attributes.transfert_type.data?.id == 1?admconfig?.max_sender_money:admconfig?.max_mobile_sender_money);
    const [minAmount, setMinAmount] = useState(recipient?.attributes.transfert_type.data?.id == 1?admconfig?.min_sender_money:admconfig?.min_mobile_sender_money)

    console.log(maxAmount, minAmount);
    const onError = (errors, e) => {
        if (orangeDisabled === null) {
            setSelectTypeError(true)
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setInfos({...infos, [name]: value });
    }

    const updateFormByAmout = () => {
        setInfos({...infos, ["amount_to_send"]: infos?.send, ["amount_to_receive"]: infos?.receive})
    }

    const updateAmount = (e) => {
        setInfos({...infos, ["amount_to_receive"]: Number(e.target.value) * Number(admconfig.exchange_rate)})
    }

    const handleStatusChange = e => {
        const { name, value } = {name: 'status', value: e.value}
        setInfos({...infos, [name]: value });
    }

    const handleBankChange = selectedOption => {
        const { name, value } = {name: 'status', value: selectedOption.value}
        setInfos({...infos, [name]: [value] });
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

    const getBanksWithOptions = () => {
        let BanksWithOptions = []
        banks.map((option)=>{
            BanksWithOptions.push({label: option.attributes.name, value: option.id})
        })
        setBankOptions(BanksWithOptions)  
    }

    const handleTrxTypeChange = e => {
        if(e.value == 1){
            setOrangeDisabled(true);
        }else{
            setOrangeDisabled(false);
        }

        const { name, value } = {name: 'transfert_type', value: [e.value]}
        setInfos({...infos, [name]: value });
    }

    const onSubmit = async (e) => {
        infos['user'] = [userInfo?.id];
        infos['code'] = gencode;
        infos['amount_to_send'] = infos.amount_to_send? infos.amount_to_send: recipient?.attributes.amount_to_send;
        infos['amount_to_receive'] = infos.amount_to_receive? infos.amount_to_receive: recipient?.attributes.amount_to_receive;
        infos['status'] = 'En traitement';
        delete infos.reception_proof;
        infos['transfert_type'] = [infos['transfert_type'].data?.id];
        infos['transfert_bank'] = selectedBank? [selectedBank.value]: [infos['transfert_bank'].data?.id];
        console.log(infos)
        axios
            .put(BACKEND_URL+'/api/user-transferts/'+recipient?.id, {data: infos}, {
                headers: {
                    Authorization: `Bearer ${userInfo.jwt}`
                }
            })
            .then(response => {
                setSuccessSent(true)
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            });
    };

    useEffect(() => {
        getTrxTypes();
        updateFormByAmout();
    }, [])

    useEffect(() => {
        getBanksWithOptions();
        setSelectedBank({label: recipient.attributes?.transfert_bank.data?.attributes.name, value: recipient.attributes?.transfert_bank.data?.id})
    }, [])

    const bankFields = () => {
        return(
            <>
                <tr>
                    <th>
                        Nom de la banque
                    </th>
                    <td>
                        <div className="form-group" style={{textAlign:'left'}}>
                            <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                            <SelectComponent 
                                name="transfert_bank"
                                placeholder="Selectionnez une banque" 
                                value={ selectedBank }
                                options={ bankOptions } 
                                onChange={selectedOption => {setSelectedBank(selectedOption); handleBankChange(selectedOption); /*setSelectTypeError(false);*/}}
                            />
                                
                            {/* <div className='invalid-feedback' style={{display: 'block'}}>
                                {selectTypeError && 'Veuillez selectionner une banque pour le transfert'}
                            </div> */}
                        </div> 
                    </td>
                </tr>
                <tr>
                    <th>
                        Numéro compte
                    </th>
                    <td>
                        <div className="form-group">
                            <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                            <input 
                                type="number" 
                                name="account_number" 
                                placeholder={"Numéro de compte"}  
                                className={"form-control ".concat(errors.account_number ? "is-invalid" : "")} 
                                value={infos.account_number}
                                ref={register({required: true, minLength: 11, maxLength: 11})}
                                onChange={(e)=>handleChange(e)}
                            />
                            <div className='invalid-feedback' style={{display: 'block'}}>
                                {errors.account_number && 'Numéro de compte obligatoire. '}
                                {errors.account_number && errors.account_number.type === 'minLength' && 'Veuillez saisir un numéro de compte valide'}
                                {errors.account_number && errors.account_number.type === 'maxLength' && 'Veuillez saisir un numéro de compte valide'}
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>
                        Nom de la branche
                    </th>
                    <td>
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="bank_branch" 
                                placeholder={"Nom de la branche"}  
                                className={"form-control ".concat(errors.bank_branch ? "is-invalid" : "")} 
                                value={infos.bank_branch}
                                onChange={(e)=>handleChange(e)}
                            />
                            <div className='invalid-feedback' style={{display: 'block'}}>
                                {errors.bank_branch && 'Veuillez saisir le nom de la branche'}
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>
                        Code agence : 
                    </th>
                    <td>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        name="agency_code" 
                                        placeholder={"Code agence"}  
                                        className="form-control" 
                                        value={infos.agency_code}
                                        onChange={(e)=>handleChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>
                        Clé agence : 
                    </th>
                    <td>
                        <div className="col-6">
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="agency_key" 
                                    placeholder={"Clé agence"}  
                                    className="form-control " 
                                    value={infos.agency_key}
                                    onChange={(e)=>handleChange(e)}
                                />
                            </div>
                        </div>
                    </td>
                </tr>
            </>
        )
    }

    const mobileFields = () => {
        return(
            <>
                <tr>
                    <th>
                        Numéro mobile money
                    </th>
                    <td>
                        <div className='d-flex'>
                            <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                            <h6 className='me-2 mb-0 align-self-center'>+237</h6>
                            <input 
                                type="number" 
                                name="mobile_money_number" 
                                placeholder={"Numéro de téléphone"}  
                                className={"form-control ".concat(errors.mobile_money_number ? "is-invalid" : "")}
                                value={infos.mobile_money_number}
                                onChange={(e)=>{handleChange(e);setMobileNumber(e.target.value)}}
                                ref={register({required: true, minLength: 9, maxLength: 9})}
                            />
                        </div>
                        <div className='invalid-feedback' style={{display: 'block'}}>
                            {errors.mobile_money_number && 'Numéro de téléphone obligatoire. '}
                            {errors.mobile_money_number && errors.mobile_money_number.type === "maxLength" && 'Veuillez saisir un numéro de téléphone valide'}
                            {errors.mobile_money_number && errors.mobile_money_number.type === "minLength" && 'Veuillez saisir un numéro de téléphone valide'}
                        </div>
                    </td>
                </tr>
            </>
        )
    }

  return (
    <div>
        <div className="container rounded bg-white mt-5 mb-5 profile-page">
            <div className="row">
                <div className="col-md-2 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-3">
                        <h3>Bienvenue</h3>
                        <img className="rounded-circle mt-5" width="150px" src={userInfo.photo} />
                        <span className="font-weight-bold">{ userInfo.firstname + ' ' + userInfo.lastname  }</span>
                        <span className="text-black-50">{userInfo.email}</span>
                        </div>
                </div>
                <div className="col-md-10 border-right mt-5">
                    <h4>Transaction # {recipient?.id}</h4>
                    <div className="card my-5">
                        <div className="card-body p-4">
                                
                                { recipient?
                                <form id="contactForm" className='mx-5' onSubmit={handleSubmit(onSubmit, onError)}>
                                    {!successSent && recipient?.attributes.status == 'Action requise'?
                                        <div>
                                            
                                            <div className="alert alert-danger">{recipient?.attributes.message}</div>
                                            <table class="table">
                                                <tr>
                                                    <th>
                                                        <label>Statut de la transaction :</label>
                                                    </th>
                                                    <td>
                                                        <div className="form-group" style={{textAlign:'left'}}>
                                                            <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                                            <SelectComponent 
                                                                placeholder="Selectionnez une statut pour la transaction" 
                                                                value={{value: infos?.status, label: infos?.status}}
                                                                options={[{value: 'Annuler', label: 'Annuler'}, {value: infos?.status, label: infos?.status}]} 
                                                                onChange={(e) => {handleStatusChange(e); setSelectTypeError(false)}}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <label>Montant initial :</label>
                                                    </th>
                                                    <td>  
                                                        <div className="form-group">
                                                            <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                                            <input 
                                                                type="text" 
                                                                name="amount_to_send" 
                                                                placeholder={"Montant initial"}  
                                                                className={"form-control ".concat(errors.amount_to_send ? "is-invalid" : "")} 
                                                                value={infos?.amount_to_send}
                                                                onChange={(e)=>handleChange(e)}
                                                                ref={register({ required: true, max: maxAmount, min: minAmount })}
                                                                onBlur={(e)=> updateAmount(e)}
                                                            />
                                                            <div className='invalid-feedback' style={{display: 'block'}}>
                                                                {errors.amount_to_send && errors.amount_to_send.type === "required"  && 'entrer le montant à envoyer'}
                                                                {errors.amount_to_send && errors.amount_to_send.type === "max" && 'maximum '+maxAmount}
                                                                {errors.amount_to_send && errors.amount_to_send.type === "min" && 'minimum '+minAmount}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr> 
                                                    <th>
                                                        <label>Montant à recevoir :</label>
                                                    </th>
                                                    <td>
                                                        <div className="form-group">
                                                            <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                                            <input 
                                                                type="text" 
                                                                name="amount_to_receive" 
                                                                placeholder={"Montant a recevoir"}  
                                                                className={"form-control ".concat(errors.amount_to_receive ? "is-invalid" : "")} 
                                                                value={infos?.amount_to_receive}
                                                                onChange={(e)=>handleChange(e)}
                                                                ref={register({ required: true })}
                                                                disabled={true}
                                                            />
                                                            <div className='invalid-feedback' style={{display: 'block'}}>
                                                                {errors.amount_to_receive && 'Veuillez saisir le montant à recevoir'}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <label>Nouveau code interac :</label>
                                                    </th>
                                                    <td>
                                                        <div className="form-group">
                                                            <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                                            <input 
                                                                type="text" 
                                                                name="code" 
                                                                placeholder={"Code interac"}  
                                                                className="form-control " 
                                                                value={gencode}
                                                                onChange={(e)=>handleChange(e)}
                                                                ref={register({ required: true })}
                                                                disabled={true}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Prénom du destinatire
                                                    </th>
                                                    <td>
                                                        <div className="form-group">
                                                            <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                                            <input 
                                                                type="text" 
                                                                name="to_firstname" 
                                                                placeholder={"prénom"} 
                                                                className={"form-control ".concat(errors.to_firstname ? "is-invalid" : "")} 
                                                                value={infos?.to_firstname}
                                                                onChange={(e)=>handleChange(e)}
                                                                ref={register({ required: true })}
                                                            />
                                                            <div className='invalid-feedback' style={{display: 'block'}}>
                                                                {errors.to_firstname && 'Veuillez saisir le prénom'}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Nom du destinataire
                                                    </th>
                                                    <td>
                                                        <div className="form-group">
                                                            <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                                            <input 
                                                                type="text" 
                                                                name="to_name" 
                                                                placeholder={"nom"}  
                                                                className={"form-control ".concat(errors.to_name ? "is-invalid" : "")}
                                                                value={infos?.to_name}
                                                                onChange={(e)=>handleChange(e)}
                                                                ref={register({ required: true })}
                                                            />
                                                            <div className='invalid-feedback' style={{display: 'block'}}>
                                                                {errors.to_name && 'Veuilez entrer le nom'}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Courriel du destinataire:
                                                    </th>
                                                    <td>
                                                        <div className="form-group">
                                                            <input 
                                                                type="email" 
                                                                name="to_email" 
                                                                placeholder={"Courriel du destinataire"}  
                                                                className={"form-control"}
                                                                value={infos?.to_email}
                                                                onChange={(e)=>handleChange(e)}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Ville du destinataire :
                                                    </th>
                                                    <td>
                                                        <div className="form-group">
                                                            <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                                            <input 
                                                                type="text" 
                                                                name="to_city" 
                                                                placeholder={"ville"}  
                                                                className={"form-control ".concat(errors.to_city ? "is-invalid" : "")}
                                                                value={infos?.to_city}
                                                                onChange={(e)=>handleChange(e)}
                                                                ref={register({ required: true })}
                                                            />
                                                            <div className='invalid-feedback' style={{display: 'block'}}>
                                                                {errors.to_city && 'Veuillez saisir une ville'}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Adresse du destinataire :
                                                    </th>
                                                    <td>
                                                        <div className="form-group">
                                                            <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                                            <input 
                                                                type="text" 
                                                                name="to_address" 
                                                                placeholder={"Adresse de destinataire"}  
                                                                className={"form-control ".concat(errors.to_address ? "is-invalid" : "")}
                                                                value={infos?.to_address}
                                                                onChange={(e)=>handleChange(e)}
                                                                ref={register({ required: true })}
                                                            />
                                                            <div className='invalid-feedback' style={{display: 'block'}}>
                                                                {errors.to_address && "Veuillez saisir l'adresse du destinataire"  }
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Raison de l'envoi
                                                    </th>
                                                    <td>
                                                        <div className="form-group">
                                                            <span style={{position: 'absolute', zIndex:2, color:'red'}}>*</span>
                                                            <input 
                                                                type="text" 
                                                                name="reason" 
                                                                placeholder={"Raison de l'envoie"}  
                                                                className={"form-control ".concat(errors.reason ? "is-invalid" : "")}
                                                                value={infos?.reason}
                                                                onChange={(e)=>handleChange(e)}
                                                                ref={register({ required: true })}
                                                            />
                                                            <div className='invalid-feedback' style={{display: 'block'}}>
                                                                {errors.reason && 'Veuillez saisir la raison du transfert'}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {infos?.transfert_type.data?.id == 1?
                                                    bankFields()
                                                    :
                                                    mobileFields()
                                                }                                               
                                                <tr>
                                                    <td colSpan="2">
                                                        <div>
                                                            <button style={{zIndex: 0, float:'right'}} type="submit" className="btn btn-primary">{"Sauvegarder"}</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div> 
                                :
                                <div className="alert alert-success"><span>Vos informations sont à-jour!</span>  <span sltyle={{float:'right'}}><Link href="/transactions?page=1&items=20">Retour a vos transactions</Link></span></div>
                                }

                                </form>  
                                : <h4>Impossible de trouver la transaction</h4>
                            }                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
