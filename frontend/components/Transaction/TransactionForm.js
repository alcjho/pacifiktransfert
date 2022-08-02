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

export default function Transaction({ userInfo, recipient, admconfig, gencode}) {
    recipient
    const [confirm, setConfirm] = useState(false);
    const { register, handleSubmit, errors, control } = useForm();
    const [selectTypeError, setSelectTypeError] = useState(false);
    const [ trxTypes, setTrxTypes ] = useState([]);
    const [ orangeDisabled, setOrangeDisabled ] = useState(null);
    const [ infos, setInfos] = useState(recipient?.attributes);
    const [successSent, setSuccessSent] = useState(false);

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
        console.log(infos)
        if (orangeDisabled !== null) {       
            recipient.user = [userInfo?.id]
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
        }
        else {
            setSelectTypeError(true)
        }
    };

    useEffect(() => {
        getTrxTypes();
        updateFormByAmout();
    }, [])


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
                                    {
                                        <div>
                                            {!successSent && recipient?.attributes.status == 'Action requise'?
                                                <div className="alert alert-danger">{recipient?.attributes.message}</div>
                                                :
                                                <div className="alert alert-success"><span>Vos informations sont à-jour!</span>  <span sltyle={{float:'right'}}><Link href="/transactions">Retour a vos transactions</Link></span></div>
                                            }
                                            <table class="table">
                                                <tr>
                                                    <th>
                                                        <label>Statut de la transaction :</label>
                                                    </th>
                                                    <td>
                                                        <div className="form-group" style={{textAlign:'left'}}>
                                                            <SelectComponent 
                                                                className={selectTypeError ? ' is-invalid-select ' : ''}
                                                                placeholder="Selectionnez une statut pour la transaction" 
                                                                value={{value: infos?.status, label: infos?.status}}
                                                                options={[{value: 'Annuler', label: 'Annuler'}, {value: infos?.status, label: infos?.status}]} 
                                                                onChange={(e) => {handleStatusChange(e); setSelectTypeError(false)}}/>
                                                            <div className='invalid-feedback' style={{display: 'block'}}>
                                                                {selectTypeError && 'selectionner le type de transfert'}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <label>Montant initial :</label>
                                                    </th>
                                                    <td>  
                                                        <div className="form-group">
                                                            <input 
                                                                type="text" 
                                                                name="amount_to_send" 
                                                                placeholder={"Montant initial"}  
                                                                className={"form-control ".concat(errors.amount_to_send ? "is-invalid" : "")} 
                                                                value={infos?.amount_to_send}
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
                                                    </td>
                                                </tr>
                                                <tr> 
                                                    <th>
                                                        <label>Montant à recevoir :</label>
                                                    </th>
                                                    <td>
                                                        <div className="form-group">
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
                                                                {errors.amount_to_receive && 'entrer le montant à recevoir'}
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
                                                                {errors.to_firstname && 'entrer le prenom'}
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
                                                                {errors.to_name && 'entrer le nom'}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Surnom du destinataire
                                                    </th>
                                                    <td>
                                                        <div className="form-group">
                                                            <input 
                                                                type="text" 
                                                                name="to_middle_name" 
                                                                placeholder={"deuxieme nom"}  
                                                                className="form-control" 
                                                                value={infos?.to_middle_name}
                                                                onChange={(e)=>handleChange(e)}
                                                                ref={register}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Téléphone du destinataire :
                                                    </th>
                                                    <td>
                                                        <div className="form-group">
                                                            <div className='d-flex'>
                                                                <h6 className='me-2 mb-0 align-self-center'>+237</h6>
                                                                <input 
                                                                    type="text" 
                                                                    name="to_phone" 
                                                                    placeholder={"numéro de téléphone"}  
                                                                    className={"form-control ".concat(errors.to_phone ? "is-invalid" : "")}
                                                                    value={infos?.to_phone}
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
                                                                className={"form-control ".concat(errors.to_email ? "is-invalid" : "")}
                                                                value={infos?.to_email}
                                                                onChange={(e)=>handleChange(e)}
                                                                ref={register({ required: true })}
                                                            />
                                                            <div className='invalid-feedback' style={{display: 'block'}}>
                                                                {errors.to_email && 'entrer le courriel du destinataire'}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Ville du destinataire :
                                                    </th>
                                                    <td>
                                                        <div className="form-group">
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
                                                                {errors.to_city && 'entrer la ville'}
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
                                                                {errors.to_address && "entrer l'adresse de destinataire"  }
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
                                                                {errors.reason && 'entrer votre raison'}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Type de transfert :
                                                    </th>
                                                    <td>
                                                        <div className="form-group" style={{textAlign:'left'}}>
                                                            <SelectComponent 
                                                                className={selectTypeError ? ' is-invalid-select ' : ''}
                                                                options={trxTypes} 
                                                                onChange={(e) => {handleTrxTypeChange(e); setSelectTypeError(false)}}/>
                                                            <div className='invalid-feedback' style={{display: 'block'}}>
                                                                {selectTypeError && 'selectionner le type de transaction'}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {orangeDisabled === false &&
                                                <tr>
                                               
                                                    <th>

                                                    </th>
                                                    <td>
                                                    
                                                        <div className="form-group">
                                                            <input 
                                                                type="text" 
                                                                name="orange_number" 
                                                                placeholder={"Numéro orange money"}  
                                                                className={"form-control ".concat(errors.orange_number ? "is-invalid" : "")} 
                                                                value={infos?.orange_number}
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
                                                   
                                                    </td>
                                                </tr>
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
