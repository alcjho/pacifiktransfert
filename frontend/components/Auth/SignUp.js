import React, { useState } from 'react';
import Webcam from "../../components/Utils/Webcam";
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
        e.preventDefault();
        console.log(userData)
        try {
            let res = await axios.post('/api/register', userData);
            console.log('result', result)
            //router.replace('/profile');
        } catch (err) {
            console.log(err.response.data);
        }
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
                                                    <img src="/images/black-logo.png" alt="image" />
                                                </a>
                                            </Link>
                                        </div>
                                        <h3>Creer votre compte - c'est rapide!</h3>

                                        <p>Vous avez deja un compte? <Link href="/login"><a>Connexion</a></Link></p>

                                        <form onSubmit={handleSubmit(onSubmit, onError)}>
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

                                            <h4>Informations personnelles</h4>
                                            <div className="form-group">
                                                <input style={{width:'50%',display:'inline-block'}} type="text" name="firstname" id="firstname" placeholder="Prenom" className="form-control" onChange={e => handleChange(e)}/>
                                                <input style={{width:'50%',display:'inline-block'}} type="text" name="lastname" id="lastname" placeholder="Nom de famille" className="form-control" onChange={e => handleChange(e)}/>
                                            </div>

                                            <div className="form-group" style={{textAlign:'left'}}>
                                                <SelectComponent placeholder="Selectionnez votre occupation" options={occupations} onChange={handleOccupationChange}/>
                                            </div>

                                            <div className="form-group">
                                                <input type="text" name="address" id="address" placeholder="Adresse" className="form-control" onChange={e => handleChange(e)}/>
                                            </div>

                                            <div className="form-group" style={{textAlign:'left'}}>
                                                <input type="text" name="city" id="city" placeholder="Ville" className="form-control" onChange={e => handleChange(e)}/>
                                            </div>

                                            <div className="form-group" style={{textAlign:'left'}}>
                                                <SelectComponent 
                                                    placeholder="Selectionnez votre province" 
                                                    value={provinces.find(obj => obj.value === province)}
                                                    options={provinces} 
                                                    onChange={handleProvinceChange}/>
                                            </div>


 
                                            <button type="submit" className="btn btn-primary" style={{zIndex:0}}>Sign Up</button>

                                            {/* <div className="connect-with-social">
                                                <span>Or</span>
                                                <button type="submit" className="facebook">
                                                    <i className="fab fa-facebook-square"></i> Connect with Facebook
                                                </button>
                                                
                                                <button type="submit" className="google">
                                                    <i className="fab fa-google"></i> Connect with Google
                                                </button>
                                            </div> */}
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