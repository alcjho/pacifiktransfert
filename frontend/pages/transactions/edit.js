import React, { Component, useState, useEffect} from 'react';
import Link from 'next/link';
import Transaction from "../../components/Transaction/Transaction";
import Navbar from '../../components/Layouts/DashboardNavbar';
import PageBannerContent from '../../components/Common/PageBannerContent';
import SendMoneyContent from '../../components/SendMoney/SendMoneyContent';
import TransactionForm from '../../components/Transaction/TransactionForm';
import Footer from '../../components/Layouts/Footer';
import checkuser from '../api/checkuser';
import { setCookie } from 'nookies'
import axios from 'axios';
import { BACKEND_URL, BEARER_TOKEN } from '../../config/constant'
import crypto from 'crypto';

export default function transactionForm({ user, transaction}) {
    const [adminConfig, setAdminConfig] = useState();
    const [ gencode, setGencode] = useState(crypto.randomBytes(6).toString('hex').substring(0,6));
    
  // TODOS: to be remplaced by api call
  const transactionPage = {
    'page_title': 'Modifier vos transactions',
    'page_caption': 'Action requise pour une transaction',
    'cover_image': '/images/page-title-bg2.jpg'
}

const getAdminConfig = async () => {
    axios.get(BACKEND_URL+'/api/admin-settings/1', {
      headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`
      }})
      .then(function (response) {
        setAdminConfig(response.data.data.attributes)
      })
      .catch(function (error) {
        console.log(error);
      });
  } 
  
    useEffect(() => {
        getAdminConfig();
    }, [])

    return (
        <>
            <Navbar />
            <PageBannerContent 
                pageTitle={transactionPage.page_title} 
                pageCaption={transactionPage.page_caption}
                coverImage={transactionPage.cover_image}
            />
            <TransactionForm userInfo={ user } recipient = {transaction[0]} admconfig={adminConfig} gencode={gencode} />
            <Footer />
        </>
    )
}

async function getCurrentTransaction(user, trxId){
    const { data } = await axios.get(BACKEND_URL+'/api/user-transferts?filters[id][$eq]='+ trxId, {
        headers: {
            Authorization: `Bearer ${user.jwt}`,
        },
    });
    return data.data
}

export const getServerSideProps = async (ctx) => {
    let user = await checkuser(ctx);

    let transaction = await getCurrentTransaction(user, ctx.query.trx);

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
        'user': user, 
        'transaction': transaction
      }
    }
  }