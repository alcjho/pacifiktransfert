import React, { useState } from 'react';
import Navbar from '../../components/Layouts/DashboardNavbar';
import PageBannerContent from '../../components/Common/PageBannerContent';
import TransactionForm from '../../components/Transaction/TransactionForm';
import Footer from '../../components/Layouts/Footer';
import checkuser from '../api/checkuser';
import getBankList from '../api/get-bank-list';
import getAdminSettings from '../api/get-admin-settings';
import getCurrentTransaction from '../api/get-current-trx';
import getTransfertTypes from '../api/get-transfert-types';
import { setCookie } from 'nookies';
import crypto from 'crypto';

export default function transactionForm({ user, banks, admconfig, transaction, trxTypes, deposit }) {
    const [ gencode, setGencode] = useState(crypto.randomBytes(6).toString('hex').substring(0,6));

  // TODOS: to be remplaced by api call
  const transactionPage = {
    'page_title': 'Modifier vos transactions',
    'page_caption': 'Action requise pour une transaction',
    'cover_image': '/images/page-title-bg2.jpg'
}

return (
        <>
            <Navbar />
            <PageBannerContent 
                pageTitle={transactionPage.page_title} 
                pageCaption={transactionPage.page_caption}
                coverImage={transactionPage.cover_image}
            />
            <TransactionForm userInfo={ user } banks={ banks } recipient = { transaction[0] } admconfig={admconfig.attributes} trxTypes={ trxTypes } gencode={gencode} />
            <Footer />
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    let user = await checkuser(ctx);
    let transaction = await getCurrentTransaction(ctx);
    let banks = await getBankList(ctx);
    let config = await getAdminSettings(ctx);
    let trxTypes = await getTransfertTypes(ctx);
    let sendAndReceive = {send: ctx.query?.send, trxtype: ctx.query?.trxtype};
    
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
        'banks': banks.result,
        'admconfig': config.result,
        'transaction': transaction.result,
        'trxTypes': trxTypes.result,
        'deposit': sendAndReceive
      }
    }
  }