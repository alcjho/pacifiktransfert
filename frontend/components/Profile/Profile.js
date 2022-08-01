import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import ProfileImageUploader from '../Profile/ProfileImageUploader'
import SelectComponent from 'react-select';

const profile_info = {
    'name': '',
    'gender': '',
    'address': '',
    'occupation': '',
    'email': '',
    'phone': ''
}

export default function Profile({ profile, occupation }) {
    const { register, handleSubmit, errors } = useForm();
    const [editPersonalInfo, setEditPersonalInfo] = useState(false)
    const [editOccupation, setEditOccupation] = useState(false)
    const [editContact, setEditContact] = useState(false)
    const [ success, setSuccess ] = useState();


    const handleChange = e => {
        const { name, value } = e.target;
        //setProfile(prevState => ({ ...prevState, [name]: value }));
    }

    const onSubmit = async e => {
        // e.preventDefault();
        if (confirm) {
            try {
                // const url = `${baseUrl}/api/contact`;
                // const { firstname, lastname, cellphone, city, address, reason, phonenumber2 } = recipient;
                // const payload = { firstname, lastname, secondname, phonenumber, city, address,  reason, phonenumber2};
                // await axios.post(url, payload);
                // console.log(url);
                // setRecipient(INITIAL_STATE);
            } catch (error) {
                console.log(error)
            }
        }
    };


    

  return (
    <form id="profileForm" className='mx-5' onSubmit={handleSubmit(onSubmit)}>
        <div className="container rounded bg-white mt-5 mb-5 profile-page">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <ProfileImageUploader />
                        {/* <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /> */}
                        <span className="font-weight-bold">{profile?.name}</span>
                        <span className="text-black-50">{profile?.email}</span>
                    </div>
                    
                </div>
                <div className="col-md-9 border-right mt-5">
                    <div className="single-pricing-box">
                        <div className="pricing-header text-start d-flex justify-content-between">
                            <h3 className='text-start'>Donnée personnelle</h3>
                            <div> 
                                <a className='text-end pointer' onClick={()=> setEditPersonalInfo(!editPersonalInfo)}>
                                    {!editPersonalInfo ? 'editer' : 'enregistrer'}
                                </a>
                            </div>
                            
                        </div>
                        <ul className="pricing-features">
                            <li>
                                <label>
                                    <span className='fw-bold'>Nom: </span> 
                                    {!editPersonalInfo ? 
                                        <>{profile?.firstname}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="firstname" 
                                        placeholder={"enter your name"}  
                                        className="form-control d-inline w-auto" 
                                        value={profile?.firstname}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                </label> 
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.name && 'Entrez votre prenom'}
                                </div>
                            </li>
                            <li>
                                <label>
                                    <span className='fw-bold'>Nom: </span> 
                                    {!editPersonalInfo ? 
                                        <>{profile?.lastname}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="lastname" 
                                        placeholder={"enter your name"}  
                                        className="form-control d-inline w-auto" 
                                        value={profile?.lastname}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                </label> 
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.name && 'Entrez votre nom'}
                                </div>
                            </li>
                            <li>
                                <label>
                                    <span className='fw-bold'>Genre: </span>
                                     
                                     {!editPersonalInfo ? 
                                        <>{profile?.gender}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="gender" 
                                        placeholder={"enter your gender"}  
                                        className="form-control d-inline w-auto" 
                                        value={profile?.gender}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                </label> 
                            </li>
                            <li>
                                <label>
                                    <span className='fw-bold'>Adresse: </span> 
                                    
                                    {!editPersonalInfo ? 
                                        <>{profile?.address}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="address" 
                                        placeholder={"enter your gender"}  
                                        className="form-control d-inline w-auto" 
                                        value={profile?.address}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                </label> 
                            </li>
                            <li>
                                <label>
                                    <span className='fw-bold'>Ville: </span> 
                                    
                                    {!editPersonalInfo ? 
                                        <>{profile?.city}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="city" 
                                        placeholder={"Enter your city"}  
                                        className="form-control d-inline w-auto" 
                                        value={profile?.city}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                </label> 
                            </li>
                            <li>
                                <label>
                                    <span className='fw-bold'>Province: </span> 
                                    
                                    {!editPersonalInfo ? 
                                        <>{profile?.Province}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="province" 
                                        placeholder={"Enter your city"}  
                                        className="form-control d-inline w-auto" 
                                        value={profile?.Province}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                </label> 
                            </li>
                        </ul>
                    </div>
                    <div className="single-pricing-box">
                        <div className="pricing-header text-start d-flex justify-content-between">
                            <h3 className='text-start'>Occupation</h3>
                            <div> 
                                <a className='text-end pointer' onClick={()=> setEditOccupation(!editOccupation)}>
                                    {!editOccupation ? 'editer' : 'enregistrer'}
                                </a>
                            </div>
                        </div>
                        <ul className="pricing-features">
                            <li>
                                <label style={{width:'100%'}}>
                                    <span className='fw-bold'>Occupation: </span> 
                                    {!editOccupation ? 
                                        <>{profile?.occupation}</>
                                        : 
                                        <SelectComponent options={occupation} style={{zIndex: 2}}/>
                                    }
                                </label> 
                            </li>
                        </ul>
                    </div>
                    <div className="single-pricing-box">
                        <div className="pricing-header text-start d-flex justify-content-between">
                            <h3 className='text-start'>Coordonnées</h3>
                            <div> 
                                <a className='text-end pointer' onClick={()=> setEditContact(!editContact)}>
                                    {!editContact ? 'editer' : 'enregistrer'}
                                </a>
                            </div>
                        </div>
                        <ul className="pricing-features">
                            <li>
                                <label>
                                    <span className='fw-bold'>Adresse courriel: </span>
                                     {!editContact ? 
                                        <>{profile?.email}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="email" 
                                        placeholder={"enter your gender"}  
                                        className="form-control d-inline w-auto" 
                                        value={profile?.email}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                </label> 
                            </li>
                            <li>
                                <label>
                                    <span className='fw-bold'>Numéro de téléphone: </span>
                                     {!editContact ? 
                                        <>{profile?.cellphone}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="cellphone" 
                                        placeholder={"Entrez un numéro de téléphone "}  
                                        className="form-control d-inline w-auto" 
                                        value={profile?.cellphone}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                </label> 
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-12 col-sm-12" style={{zIndex: 1}}>
                        <button type="submit" className="btn btn-primary">Enregistrer</button>{
                            success?
                            <img src="/images/success-icon.png" style={{width: '50px', float:'right'}}/>
                            :''
                        }
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}
