import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layouts/DashboardNavbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import SendMoneyContent from '../components/SendMoney/SendMoneyContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';
import axios from 'axios';
import { BACKEND_URL, BEARER_TOKEN } from '../config/constant';
import { setCookie } from 'nookies'
import checkuser from './api/checkuser';
import getBankList from './api/get-bank-list';
import getAdminSettings from './api/get-admin-settings';
import getTransfertTypes from './api/get-transfert-types';
import getMyTransferts from './api/get-transferts';


    export default function envoyerArgent({ user, banks, admconfig, trxtypes, deposit, mytransferts }) {
        const [contact, setContact] = useState({})
        const [sendMoneyPage, setSendMoneyPage] = useState();

        const getContact = async () => {
            axios.get(BACKEND_URL+'/api/contact', {params: {populate:'*'}})
              .then(function (response) {
                setContact(response.data.data.attributes)
              })
              .catch(function (error) {
                console.log(error);
              });
        } 

        const getSendMoneyPage = async () => {
          axios.get(BACKEND_URL+'/api/send-money?populate=*')
            .then(function (response) {
              setSendMoneyPage(response.data.data.attributes)
            })
            .catch(function (error) {
              console.log(error);
            });
        } 

        useEffect(() => {
            getSendMoneyPage();
            getContact();
          }, [])
        return (
            <>
                <Navbar />

                <PageBannerContent 
                    pageTitle={sendMoneyPage?.title} 
                    pageCaption={sendMoneyPage?.subtitle}
                    coverImage={BACKEND_URL + sendMoneyPage?.cover.data.attributes.url}
                />
                {(deposit.trxtype && deposit.trxtype == 1) || (deposit.trxtype && deposit.trxtype == 2)? 
                  <SendMoneyContent contact={contact} banks={banks} user={user} admconfig={admconfig.attributes} trxtypes={trxtypes} deposit={deposit} mytransferts={mytransferts}/>
                  :''
                }

                <Footer />
            </>
        );
}

export const getServerSideProps = async (ctx) => {
  let user = await checkuser(ctx);
  let banks = await getBankList(ctx);
  let config = await getAdminSettings(ctx);
  let trxTypes = await getTransfertTypes(ctx);
  let sendAndReceive = {send: ctx.query?.send, trxtype: ctx.query?.trxtype};
  let mytransferts = await getMyTransferts(ctx, user)

  if(user?.redirect){;
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
      'trxTypes': trxTypes.result,
      'deposit': sendAndReceive,
      'mytransferts': mytransferts.result
    }
  }
}
