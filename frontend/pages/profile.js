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
  const [occupation, setOccupation] = useState();
  const getProfile = async () => {
    axios
        .get(BACKEND_URL+'/api/users/me?populate=*',{
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        })
        .then(response => {
            setProfile(response.data)
        });
  };

  const getOccupation = async () => {
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
            setOccupation(occupation_options)
        });
  };

  useEffect(() => {
    getProfile();
    getOccupation();
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
            <Profile profile={profile} occupation={occupation}/>
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