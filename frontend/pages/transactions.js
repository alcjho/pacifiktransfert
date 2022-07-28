import React, { Component } from 'react';
import Link from 'next/link';
import Transaction from "../components/Transaction/Transaction";
import Navbar from '../components/Layouts/DashboardNavbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import SendMoneyContent from '../components/SendMoney/SendMoneyContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';
import checkuser from './api/checkuser';
import { setCookie } from 'nookies'
export default function transaction(user) {
    return (
        <>
            <Navbar />
            <PageBannerContent 
                pageTitle={"Transactions"} 
                pageCaption={"Votre historique de tous les transactions"}
            />
            <Transaction user={ user.user }/>
            <Footer />
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    let user = await checkuser(ctx);
    if(user.redirect){;
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