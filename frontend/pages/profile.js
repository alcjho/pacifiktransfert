import React, { Component, useState, useEffect } from 'react';
import Link from 'next/link';
import Profile from "../components/Profile/Profile";
import Navbar from '../components/Layouts/DashboardNavbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import SendMoneyContent from '../components/SendMoney/SendMoneyContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';
import { setCookie } from 'nookies'
import checkuser from './api/checkuser';
import axios from 'axios';
import { BACKEND_URL, BEARER_TOKEN } from '../config/constant';

export default function UserProfile({ user }) {
  const [profile, setProfile] = useState();
  const [occupations, setOccupations] = useState();
  const [provinces, setProvinces] = useState();

  const getProfile = async () => {
    axios
        .get(BACKEND_URL+'/api/users/'+user.id+'?populate=*',{
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        })
        .then(response => {
          console.log(response.data)
            const profileObject = {
              'id': response.data.id,
              'firstname': response.data.firstname,
              'lastname': response.data.lastname,
              'email': response.data.email,
              'address': response.data.address,
              'city': response.data.city,
              'province': [response.data?.province?.id],
              'photo': BACKEND_URL+response.data.photo?.url,
              'occupation': [response.data?.occupation?.id],
              'cellphone': [response.data?.cellphone]
            };

            setProfile(profileObject);
        });
  };

  const getProvinces = async () => {
    axios
        .get(BACKEND_URL+'/api/uprovinces',{
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        })
        .then(response => {
            let province_options = [];
            response?.data.data.map(province => {
              province_options.push({label: province.attributes.name_fr, value: province.id})
            })
            setProvinces(province_options)
        });
  };


  const getOccupations = async () => {
    axios
        .get(BACKEND_URL+'/api/occupations',{
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        })
        .then(response => {
           let res = response.data;

           let occupation_options = [];
            res.data.map(ocp => {
              occupation_options.push({label: ocp.attributes.name_fr, value: ocp.id});
            })
            setOccupations(occupation_options)
        });
  };

  useEffect(() => {
    getProfile();
    getOccupations();
    getProvinces();
  }, [])


  const profile_info = {
    'name': 'Jhonny Alcius',
    'birth': '21/12/1998',
    'gender': 'male',
    'address': '2145 rue saint-germain, saint-laurent, H4L3T2, Canada',
    'occupation': '18',
    'email': 'luis.jhonny@gmail.com',
    'phone': '+5149556255',
    'cover_image': '/images/page-title-bg2.jpg'
}

    return (
        <>
            <Navbar />
            <PageBannerContent 
                pageTitle={"Profile Settings"} 
                pageCaption={"rapide, confidentiel et sécurisé"}
                coverImage={profile_info.cover_image}
                
            />
            <Profile profile={profile} provinces={provinces} occupations={occupations}/>
            <Footer />
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    let user = await checkuser(ctx);
  
    if(user.redirect){
      setCookie(ctx, 'redirect', ctx.resolvedUrl, {
        httpOnly: true,
        secure: false,
        maxAge: 120,
        path: '/',
      });
      return user;
    }
  
    return {
      props: {
        user
      }
    }
  }