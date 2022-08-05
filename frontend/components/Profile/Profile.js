import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import ProfileImageUploader from '../Profile/ProfileImageUploader'
import SelectComponent from 'react-select';
import { BACKEND_URL } from '../../config/constant';
import axios from 'axios';

export default function Profile({ user, profile, provinces, occupations, occupationsObject, provincesObject }) {
    const { register, handleSubmit, errors } = useForm();
    const [editPersonalInfo, setEditPersonalInfo] = useState(false)
    const [editOccupation, setEditOccupation] = useState(false)
    const [editContact, setEditContact] = useState(false)
    const [ success, setSuccess ] = useState();
    const [ profileData, setProfileData] = useState();
    const [occupation, setOccupation] = useState({value: profile.occupation.id, label: profile.occupation?.name_fr })
    const [province, setProvince] = useState({value: profile.province.id, label: profile.province?.name_fr })
    


    const getProfileData = async () => {
        setProfileData(profile);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setProfileData({...profileData, [name]: value });
    }


    const handleProvinceChange = selectedOption => {
        let selectedProvince = occupationsObject.find(data => data.id === selectedOption.value);
        setProfileData({...profileData, ['province']:  selectedProvince });

    }

    const handleOccupationChange = selectedOption => {
        let selectedOccupation = provincesObject.find(data => data.id === selectedOption.value);
        console.log('here')
        setProfileData({...profileData, ['occupation']: selectedOccupation });
    }

    const getOccupationName = selectedOption => {
        let selectedOccupation = occupationsObject?.find(data => data.id === selectedOption?.value)
        return selectedOccupation?.attributes?.name_fr
    }

    const getProvinceName = selectedOption => {
        let selectedProvince = provincesObject?.find(data => data.id === selectedOption?.value)
        return selectedProvince?.attributes?.name_fr
    }
   

    const onSubmit = async (e) => {
        console.log('jwt', user.jwt)
        setEditPersonalInfo(false);
        setEditOccupation(false)
        setEditContact(false)
        delete profileData.photo;
        profileData.username = profileData.email?profileData?.email:null;
        profileData.occupation = profileData.occupation?[profileData?.occupation.id]:null;
        profileData.province = profileData.province?[profileData?.province.id]:null;
                axios
                    .put(BACKEND_URL+'/api/users/'+user.id, profileData, {
                        headers: {
                            Authorization: `Bearer ${user.jwt}`
                        }
                    })
                    .then(response => {
                        console.log('success wessim')
                    });
            } 

    useEffect(() => {
        getProfileData(); 
    }, [profile])

  return (
    <form id="profileForm" className='mx-5' onSubmit={handleSubmit(onSubmit)}>
        <div className="container rounded bg-white mt-5 mb-5 profile-page">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <ProfileImageUploader photo={profile?.photo.url?BACKEND_URL+profile.photo.url:"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"}/>             
                        {/* <img className="rounded-circle mt-5" width="150px" src={ profile?.photo.url?BACKEND_URL+profile.photo.url:"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} /> */}
                        <span className="font-weight-bold">{profileData?.firstname + ' '+ profile?.lastname}</span>
                        <span className="text-black-50">{profileData?.email}</span>
                    </div>
                    
                </div>
                <div className="col-md-9 border-right mt-5">
                    <div className="single-pricing-box">
                        <div className="pricing-header text-start d-flex justify-content-between">
                            <h3 className='text-start'>Donnée personnelle</h3>
                            <div> 
                                {!editPersonalInfo ? 
                                <a className='text-end pointer' onClick={()=> setEditPersonalInfo(!editPersonalInfo)}>
                                    {!editPersonalInfo ? 'editer' : 'enregistrer'}
                                </a> :
                                <button type="submit" className="btn btn-primary">Enregistrer</button>
                                }
                                
                            </div>
                            
                        </div>
                        <ul className="pricing-features">
                            <div className='row mb-2'>
                                <div className='col-md-2 text-right'>
                                    <label className='fw-bold'>
                                        prenom*:
                                    </label>
                                </div>
                                <div className='col'>
                                    {!editPersonalInfo ? 
                                        <>{profileData?.firstname}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="firstname" 
                                        placeholder={"enter your name"}  
                                        className={"form-control w-auto ".concat(errors.firstname ? "is-invalid" : "")} 
                                        value={profileData?.firstname}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                    <div className='invalid-feedback' style={{display: 'block'}}>
                                        {errors.firstname && 'Entrez votre prenom'}
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-2'>
                                <div className='col-md-2 text-right'>
                                    <label className='fw-bold'>
                                        Nom*:
                                    </label>
                                </div>
                                <div className='col'>
                                    {!editPersonalInfo ? 
                                        <>{profileData?.lastname}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="lastname" 
                                        placeholder={"enter your name"}  
                                        className={"form-control w-auto ".concat(errors.lastname ? "is-invalid" : "")} 
                                        value={profileData?.lastname}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                    <div className='invalid-feedback' style={{display: 'block'}}>
                                        {errors.lastname && 'Entrez votre prenom'}
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-2'>
                                <div className='col-md-2 text-right'>
                                    <label className='fw-bold'>
                                        Genre*:
                                    </label>
                                </div>
                                <div className='col'>
                                    {!editPersonalInfo ? 
                                        <>{profileData?.gender}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="gender" 
                                        placeholder={"enter your gender"}  
                                        className={"form-control w-auto ".concat(errors.gender ? "is-invalid" : "")} 
                                        value={profileData?.gender}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                    <div className='invalid-feedback' style={{display: 'block'}}>
                                        {errors.gender && 'Entrez votre sexe'}
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-2'>
                                <div className='col-md-2 text-right'>
                                    <label className='fw-bold'>
                                        Adresse:
                                    </label>
                                </div>
                                <div className='col'>
                                    {!editPersonalInfo ? 
                                        <>{profileData?.address}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="address" 
                                        placeholder={"enter your gender"}  
                                        className="form-control d-inline w-auto" 
                                        value={profileData?.address}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register()}
                                        />
                                    }
                                </div>
                            </div>
                            <div className='row mb-2'>
                                <div className='col-md-2 text-right'>
                                    <label className='fw-bold'>
                                        Ville:
                                    </label>
                                </div>
                                <div className='col'>
                                    {!editPersonalInfo ? 
                                        <>{profileData?.city}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="city" 
                                        placeholder={"Enter your city"}  
                                        className="form-control d-inline w-auto" 
                                        value={profileData?.city}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register()}
                                        />
                                    }
                                </div>
                            </div>
                            <div className='row mb-2'>
                                <div className='col-md-2 text-right'>
                                    <label className='fw-bold'>
                                        Province:
                                    </label>
                                </div>
                                <div className='col'>
                                    {!editPersonalInfo ? 
                                        <>{getProvinceName(province)}
                                        </>
                                        : 
                                        <SelectComponent 
                                            value={province}
                                            options={provinces} style={{zIndex: 2}}
                                            onChange={selectedOption => {setProvince(selectedOption); handleProvinceChange(selectedOption)}}/>
                                    }
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div className="single-pricing-box">
                        <div className="pricing-header text-start d-flex justify-content-between">
                            <h3 className='text-start'>Occupation</h3>
                            <div> 
                                {!editOccupation ? 
                                <a className='text-end pointer' onClick={()=> setEditOccupation(!editOccupation)}>
                                    {!editOccupation ? 'editer' : 'enregistrer'}
                                </a> :
                                <button type="submit" className="btn btn-primary">Enregistrer</button>
                                }
                            </div>
                        </div>
                        <ul className="pricing-features">
                        <div className='row mb-2'>
                            <div className='col-md-2 text-right'>
                                <label className='fw-bold'>
                                    Occupation:
                                </label>
                            </div>
                            <div className='col'>
                                {!editOccupation ? 
                                    <>{getOccupationName(occupation)}</>
                                    : 
                                    <SelectComponent 
                                        value={occupation}
                                        options={occupations} 
                                        style={{zIndex: 2}}
                                        onChange={selectedOption => {setOccupation(selectedOption); handleOccupationChange(selectedOption)}}/>
                                }
                            </div>
                        </div>
                        </ul>
                    </div>
                    <div className="single-pricing-box">
                        <div className="pricing-header text-start d-flex justify-content-between">
                            <h3 className='text-start'>Coordonnées</h3>
                            <div> 
                                {!editContact ? 
                                <a className='text-end pointer' onClick={()=> setEditContact(!editContact)}>
                                    {!editContact ? 'editer' : 'enregistrer'}
                                </a> :
                                <button type="submit" className="btn btn-primary">Enregistrer</button>
                                }
                            </div>
                        </div>
                        <ul className="pricing-features">
                            <div className='row mb-2'>
                                <div className='col-md-2 text-right'>
                                    <label className='fw-bold'>
                                        Adresse courriel*:
                                    </label>
                                </div>
                                <div className='col'>
                                    {!editContact ? 
                                        <>{profileData?.email}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="email" 
                                        placeholder={"enter your email address"}  
                                        className={"form-control w-auto ".concat(errors.email ? "is-invalid" : "")} 
                                        value={profileData?.email}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                    <div className='invalid-feedback' style={{display: 'block'}}>
                                        {errors.email && 'Entrez votre adresse courriel'}
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-2'>
                                <div className='col-md-2 text-right'>
                                    <label className='fw-bold'>
                                        Numéro de téléphone*:
                                    </label>
                                </div>
                                <div className='col'>
                                    {!editContact ? 
                                        <>{profileData?.cellphone}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="cellphone" 
                                        placeholder={"Entrez un numéro de téléphone "}  
                                        className={"form-control w-auto ".concat(errors.cellphone ? "is-invalid" : "")} 
                                        value={profileData?.cellphone}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                    <div className='invalid-feedback' style={{display: 'block'}}>
                                        {errors.cellphone && 'Entrez votre numero de telephone'}
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                    {/* <div className="col-lg-12 col-sm-12" style={{zIndex: 1}}>
                        <button type="submit" className="btn btn-primary">Enregistrer</button>{
                            success?
                            <img src="/images/success-icon.png" style={{width: '50px', float:'right'}}/>
                            :''
                        }
                    </div> */}
                </div>
            </div>
        </div>
    </form>
  )
}
