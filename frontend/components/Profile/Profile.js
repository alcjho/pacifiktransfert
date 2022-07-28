import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import ProfileImageUploader from '../Profile/ProfileImageUploader'

const profile_info = {
    'name': 'Jhonny Alcius',
    'birth': '21/12/1998',
    'gender': 'male',
    'address': '2145 rue saint-germain, saint-laurent, H4L3T2, Canada',
    'occupation': '18',
    'email': 'luis.jhonny@gmail.com',
    'phone': '+5149556255'
}

export default function Profile() {
    const [profile, setProfile] = useState(profile_info)
    const { register, handleSubmit, errors } = useForm();
    const [editPersonalInfo, setEditPersonalInfo] = useState(false)
    const [editOccupation, setEditOccupation] = useState(false)
    const [editContact, setEditContact] = useState(false)


    const handleChange = e => {
        const { name, value } = e.target;
        setProfile(prevState => ({ ...prevState, [name]: value }));
    }

    const onSubmit = async e => {
        // e.preventDefault();
        if (confirm) {
            try {
                // const url = `${baseUrl}/api/contact`;
                // const { firstname, lastname, secondname, phonenumber, city, address, reason, phonenumber2 } = recipient;
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
                        <span className="font-weight-bold">{profile.name}</span>
                        <span className="text-black-50">{profile.email}</span>
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
                                        <>{profile.name}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="name" 
                                        placeholder={"enter your name"}  
                                        className="form-control d-inline w-auto" 
                                        value={profile.name}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                </label> 
                                <div className='invalid-feedback' style={{display: 'block'}}>
                                    {errors.name && 'Please enter your name'}
                                </div>
                            </li>
                            <li>
                                <label>
                                    <span className='fw-bold'>Date de naissance:</span> 
                                    
                                    {!editPersonalInfo ? 
                                        <>{profile.birth}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="birth" 
                                        placeholder={"enter your birthday"}  
                                        className="form-control d-inline w-auto" 
                                        value={profile.birth}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                </label> 
                            </li>
                            <li>
                                <label>
                                    <span className='fw-bold'>Genre: </span>
                                     
                                     {!editPersonalInfo ? 
                                        <>{profile.gender}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="gender" 
                                        placeholder={"enter your gender"}  
                                        className="form-control d-inline w-auto" 
                                        value={profile.gender}
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
                                        <>{profile.address}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="address" 
                                        placeholder={"enter your gender"}  
                                        className="form-control d-inline w-auto" 
                                        value={profile.address}
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
                                <label>
                                    <span className='fw-bold'>Occupation: </span> 
                                    {!editOccupation ? 
                                        <>{profile.occupation}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="occupation" 
                                        placeholder={"enter your gender"}  
                                        className="form-control d-inline w-auto" 
                                        value={profile.occupation}
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
                                        <>{profile.email}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="email" 
                                        placeholder={"enter your gender"}  
                                        className="form-control d-inline w-auto" 
                                        value={profile.email}
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
                                        <>{profile.phone}</>
                                        : 
                                        <input 
                                        type="text" 
                                        name="phone" 
                                        placeholder={"enter your gender"}  
                                        className="form-control d-inline w-auto" 
                                        value={profile.phone}
                                        onChange={(e)=>handleChange(e)}
                                        ref={register({ required: true })}
                                        />
                                    }
                                </label> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}
