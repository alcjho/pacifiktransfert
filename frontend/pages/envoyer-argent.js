import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layouts/DashboardNavbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import SendMoneyContent from '../components/SendMoney/SendMoneyContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';
import axios from 'axios';
import { BACKEND_URL } from '../config/constant';
import { setCookie } from 'nookies'
import checkuser from './api/checkuser';

    export default function envoyerArgent(user) {
        const [contact, setContact] = useState({})

        const getContact = async () => {
            axios.get(BACKEND_URL+'/api/contact', {params: {populate:'*'}})
              .then(function (response) {
                console.log('img', response.data.data.attributes.step1_icon?.data.attributes.url);
                setContact(response.data.data.attributes)
              })
              .catch(function (error) {
                console.log(error);
              });
        } 
        // be remplaced by api
        const sendMoneyPage = {
          'page_title': 'Envoyer de l\'argent',
          'page_caption': 'rapide, confidentiel et sécurisé',
          'cover_image': '/images/page-title-bg2.jpg',
          'exchange_rate_value': '450'
      }

        useEffect(() => {
            getContact()
          }, [])
        return (
            <>
                <Navbar />

                <PageBannerContent 
                    pageTitle={sendMoneyPage.page_title} 
                    pageCaption={sendMoneyPage.page_caption}
                    coverImage={sendMoneyPage.cover_image}
                />

                <SendMoneyContent contact={contact} user={ user.user } sendMoneyPage={sendMoneyPage}/>

                {/* <AccountCreateArea /> */}

                <Footer />
            </>
        );
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
