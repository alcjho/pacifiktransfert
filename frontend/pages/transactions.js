import React, { Component } from 'react';
import Link from 'next/link';
import Transaction from "../components/Transaction/Transaction";
import Navbar from '../components/Layouts/DashboardNavbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import SendMoneyContent from '../components/SendMoney/SendMoneyContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';
import checkuser from './api/checkuser';

export default function transaction() {

    return (
        <>
            <Navbar />
            <PageBannerContent 
                pageTitle={"Transactions"} 
                pageCaption={"Votre historique de tous les transactions"}
            />
            <Transaction />
            <Footer />
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    let user = await checkuser(ctx);
  
    if(user.redirect){;
      return user;
    }
  
    return {
      props: {
        user
      }
    }
  }