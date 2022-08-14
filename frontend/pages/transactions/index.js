import React, { Component } from 'react';
import Link from 'next/link';
import Transaction from "../../components/Transaction/Transaction";
import Navbar from '../../components/Layouts/DashboardNavbar';
import PageBannerContent from '../../components/Common/PageBannerContent';
import SendMoneyContent from '../../components/SendMoney/SendMoneyContent';
import AccountCreateArea from '../../components/Common/AccountCreateArea';
import Footer from '../../components/Layouts/Footer';
import checkuser from '../api/checkuser';
import { setCookie } from 'nookies'
import getTransactions from '../api/get-transferts'

export default function transaction({user, transactions, pagination}) {

  // TODOS: to be remplaced by api call
  const transactionPage = {
    'page_title': 'Transactions',
    'page_caption': 'Votre historique de tous les transactions',
    'cover_image': '/images/page-title-bg2.jpg'
}

    return (
        <>
            <Navbar pagination={pagination} />
            <PageBannerContent 
                pageTitle={transactionPage.page_title} 
                pageCaption={transactionPage.page_caption}
                coverImage={transactionPage.cover_image}
            />
            <Transaction user={ user } transactions={transactions} pagination={pagination}/>
            <Footer />
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    let user = await checkuser(ctx);
    let transactions = await getTransactions(ctx, user);
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
        'transactions': transactions?.result ? transactions.result : [],
        'pagination': transactions?.result.pagination
      }
    }
  }