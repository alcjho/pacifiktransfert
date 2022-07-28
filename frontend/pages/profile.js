import React, { Component } from 'react';
import Link from 'next/link';
import Profile from "../components/Profile/Profile";
import Navbar from '../components/Layouts/DashboardNavbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import SendMoneyContent from '../components/SendMoney/SendMoneyContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';
import { setCookie } from 'nookies'
import checkuser from './api/checkuser';

export default function Profile() {

    return (
        <>
            <Navbar />
            <PageBannerContent 
                pageTitle={"Profile Settings"} 
                pageCaption={"rapide, confidentiel et sécurisé"}
            />
            <Profile />
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