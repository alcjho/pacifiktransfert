import React, { useState } from 'react';
//import Webcam from "../../components/Utils/Webcam";
import { useRouter } from 'next/router';
import Link from 'next/link'
import SelectComponent from 'react-select';
import registerUser from '../../pages/api/register';
import { useForm } from 'react-hook-form';

const SignUp = ({provinces, occupations}) => {
    const [city, setCity] = useState(null);
    const [province, setProvince] = useState(null);
    const [occupation, setOccupation] = useState(null);
    const [error, setError] = useState();
    const [picWithPhoto, setPicWithPhoto] = useState(null);
    const [picWithAddress, setPicWithAddress] = useState(null);
    const [idError, setIdError] = useState();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        city: '',
        province: '',
        address: '',
        cellphone: '',
        occupation: '',
        other_phone: ''
    })
    const [confirm, setConfirm] = useState(false);
    const [nextPage, setNextPage] = useState(0);
    const [hasError, setHasError] = useState(false);
    const { register, handleSubmit, errors, control } = useForm();
    const router = useRouter();

    const onSubmit = async (e) => {
        
        if(nextPage == 0){
            setNextPage(1)
        }

        if(confirm){
            if(userData.id_with_photo && userData.id_with_address){
                let result = registerUser(userData);
                let { error } = await result;

                if(error){
                    console.log(error.message)
                    setError(error.message)
                }else{
                    router.replace('/transactions?page=1&items=20');
                }
                router.replace('/transactions?page=1&items=20');
            }else{
                setIdError(true)
            }
        } 
    }

    const addPicWithAddress = (pic) => {
        setIdError(false)
        setPicWithAddress("<img src='"+pic+"' />")
        setUserData({...userData, ['id_with_address']: pic });
    }

    const addPicWithPhoto = (pic) => {
        setIdError(false)
        setPicWithPhoto(pic)
        setUserData({...userData, ['id_with_photo']: pic });
        console.log('adding pic with photo', pic)
    }

    const handleProvinceChange = e => {
        setProvince(e.value);
        const { name, value } = {name: 'province', value: e.value}
        setUserData({...userData, [name]: value });
    }
    const handleCityChange = e => {
        setCity(e.value);
        const { name, value } = {name: 'city', value: e.value}
        setUserData({...userData, [name]: value });
    }

    const handleOccupationChange = e => {
        setOccupation(e.value);
        const { name, value } = {name: 'occupation', value: e.value}
        setUserData({...userData, [name]: value });
    }

    const handleEmailChange = e => {
        userData.username = e.target.value;
        userData.email = e.target.value;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value });
    }

    const onError = (errors, e) => {
        if(errors){
            setHasError(true)
        }else{
            setHasError(false)
        }
    };

    return (
        <>
            <div className="signup-area">
                <div className="row m-0">
                    <div className="col-lg-6 col-md-12 p-0">
                        <div className="signup-image">
                            <img src="/images/signup-bg.jpg" alt="image" />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12 p-0">
                        <div className="signup-content">
                            <div className="d-table">
                                <div className="d-table-cell">
                                    <div className="signup-form pb-5">
                                        <div className="logo">
                                            <Link href="/">
                                                <a>
                                                    <img src="/images/logo/black-logo.png" alt="image" />
                                                </a>
                                            </Link>
                                        </div>
                                        <h3>Creer votre compte - c'est rapide!</h3>

                                        <p>Vous avez deja un compte? <Link href="/login"><a>Connexion</a></Link></p>
                                        
                                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                                            {nextPage == 0 ?
                                            <>
                                            
                                                <h4>Informations de connexion</h4>
                                                <div className="form-group">
                                                    <input 
                                                        type="email" 
                                                        name="email" 
                                                        placeholder="Adresse courriel" 
                                                        className={"form-control ".concat(errors.email ? "is-invalid" : "")} 
                                                        onChange={handleEmailChange}
                                                        ref={register({required: true})}/>
                                                        <div className='invalid-feedback' style={{display: 'block'}}>
                                                            {errors.email && 'Veuillez saisir un courriel valid'}
                                                        </div>
                                                </div>
                                                

                                                <div className="form-group">
                                                    <input 
                                                        type="password" 
                                                        name="password" 
                                                        placeholder="Mot-de-passe (6 caractères minimum, au moins 1 lettre Majuscule)" 
                                                        className={"form-control ".concat(errors.password ? "is-invalid" : "")}
                                                        onChange={e => handleChange(e)}
                                                        ref={register({required: true})}/>
                                                        <div className='invalid-feedback' style={{display: 'block'}}>
                                                            {errors.password && 'Veuillez saisir un mot-de-passe'}
                                                        </div>
                                                </div>

                                                <div className="form-group">
                                                    <input 
                                                        type="password" 
                                                        name="confirm_password" 
                                                        placeholder="Confirmer mot-de-passe" 
                                                        className={"form-control ".concat(errors.confirm_password ? "is-invalid" : "")} 
                                                        onChange={e => handleChange(e)}
                                                        ref={register({required: true})}/>
                                                        <div className='invalid-feedback' style={{display: 'block'}}>
                                                            {errors.confirm_password && 'Veuillez saisir le mot-de-passe a nouveau'}
                                                        </div>
                                                </div>
                                                

                                                <h4 className="pt-3">Informations personnelles</h4>
                                                <div className="form-group">
                                                    <input 
                                                        type="text" 
                                                        name="firstname" 
                                                        placeholder="Votre prénom" 
                                                        className={"form-control ".concat(errors.firstname ? "is-invalid" : "")} 
                                                        onChange={e => handleChange(e)}
                                                        ref={register({required: true})}/>
                                                        <div className='invalid-feedback' style={{display: 'block'}}>
                                                            {errors.firstname && 'Veuillez saisir votre prénom'}
                                                        </div>
                                                </div>
                                                <div className="form-group">
                                                    <input 
                                                        type="text" 
                                                        name="lastname" 
                                                        placeholder="Votre nom" 
                                                        className={"form-control ".concat(errors.lastname ? "is-invalid" : "")}  
                                                        onChange={e => handleChange(e)}
                                                        ref={register({required: true})}/>
                                                        <div className='invalid-feedback' style={{display: 'block'}}>
                                                            {errors.lastname && 'Veuillez saisir votre nom'}
                                                        </div>
                                                </div>


                                                <div className="form-group" style={{textAlign:'left'}}>
                                                    <SelectComponent 
                                                        name="occupation"
                                                        placeholder="Selectionnez votre occupation" 
                                                        options={occupations} 
                                                        onChange={handleOccupationChange}/>
                                                </div>

                                                <div className="form-group">
                                                    <input 
                                                        type="text" 
                                                        name="address" 
                                                        placeholder="Votre adresse actuelle" 
                                                        className={"form-control ".concat(errors.address ? "is-invalid" : "")}  
                                                        onChange={e => handleChange(e)}
                                                        ref={register({required: true})}/>
                                                        <div className='invalid-feedback' style={{display: 'block'}}>
                                                            {errors.address && 'Veuillez saisir votre adresse actuelle'}
                                                        </div>
                                                </div>

                                                <div className="form-group" style={{textAlign:'left'}}>
                                                    <input 
                                                        type="text" 
                                                        name="city" 
                                                        placeholder="Ville" 
                                                        className={"form-control ".concat(errors.city ? "is-invalid" : "")} 
                                                        onChange={e => handleChange(e)}
                                                        ref={register({required: true})}/>
                                                         <div className='invalid-feedback' style={{display: 'block'}}>
                                                            {errors.city && 'Veuillez saisir votre ville actuelle'}
                                                        </div>
                                                </div>
                                                
                                                <div className="form-group" style={{textAlign:'left'}}>
                                                    <SelectComponent 
                                                        name="province"
                                                        placeholder="Selectionnez votre province" 
                                                        value={provinces.find(obj => obj.value === province)}
                                                        options={provinces}
                                                        onChange={handleProvinceChange}
                                                        ref={register({required:true})}/>
                                                        <div className='invalid-feedback' style={{display: 'block'}}>
                                                            {errors.province && 'Veuillez saisir la province'}
                                                        </div>
                                                </div>
                                                <div>
                                                    <button name="gotoPage1" type="submit" className="btn btn-primary mt-5 ml-2 mb-5" style={{zIndex:0,width:'40%',float:'right'}}>Continuer</button>
                                                </div>
                                            </>                                               
                                            : nextPage == 1?
                                                <div className="mt-5">
                                                    <h4>Pièce d'identité avec votre photo</h4>
                                                    <p> Placez une pièce d'identité avec votre photo devant la caméra avant de prendre la photo (ex. Permis de conduire, Carte de résidence...) </p>
                                                    <div className="form-group">
                                                        {picWithPhoto?
                                                             <>
                                                                <img height="300px" src={picWithPhoto} />
                                                                <p><a href="#" onClick={() => setPicWithPhoto(null)}><i style={{display:'inline-block'}} class="far fa-edit fa-xl"></i></a></p>
                                                            </>
                                                            :
                                                               '' // <Webcam picWithPhoto={addPicWithPhoto}/>
                                                            }
                                                    </div>
                                                    <div>
                                                        <button name="gotoPage0" type="button" className="btn btn-primary mt-5 mr-2 mb-5" style={{zIndex:0,width:'40%',float:'left'}} onClick={()=> {setNextPage(0)}}>Retour</button>
                                                        <button name="gotoPage2" type="button" className="btn btn-primary mt-5 ml-2 mb-5" style={{zIndex:0,width:'40%',float:'right'}} onClick={()=> {setNextPage(2)}}>Continuer</button>
                                                    </div>
                                                </div>
                                                :nextPage == 2?
                                                    <div className="mt-5">
                                                        <h4>Pièce d'identité avec votre adresse</h4>
                                                        <p> Placez une pièce d'identité avec votre adresse devant la caméra avant de prendre la photo (ex. Carte d'assurance maladie, permis de travail...) </p>

                                                        <div className="form-group">
                                                            {picWithAddress?
                                                                <>
                                                                    <img height="300px" src={picWithAddress} />
                                                                    <p><a href="#" onClick={() => setPicWithAddress(null)}><i style={{display:'inline-block'}} class="far fa-edit fa-xl"></i></a></p>

                                                                </>
                                                            :
                                                                <Webcam picWithAddress={addPicWithAddress}/>
                                                            }
                                                        </div>
                                                        <div>
                                                            {idError?
                                                            <div className="alert alert-danger">Les 2 pièces d'identités sont obligatoires</div>
                                                            :''
                                                            }

                                                            {error?
                                                            <div className="alert alert-danger">{error}</div>
                                                            :''
                                                            }
                                                            <button name="gotoPage1" type="button" className="btn btn-primary mt-5 mr-2 mb-5" style={{zIndex:0,width:'40%',float:'left'}} onClick={()=> {setNextPage(1)}}>Retour</button>
                                                            <button name="sendForm" type="submit" className="btn btn-primary mt-5 ml-2 mb-5" style={{zIndex:0,width:'40%',float:'right'}} onClick={()=>setConfirm(true)}>Envoyer</button>
                                                        </div>
                                                    </div>
                                                    :''
                                            }
                                        </form>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;