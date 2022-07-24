import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import SendMoneyContent from '../components/SendMoney/SendMoneyContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';
import axios from 'axios';
import { BACKEND_URL } from '../config/constant';


    export default function envoyerArgent() {
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

        useEffect(() => {
            getContact()
          }, [])
        return (
            <>
                <Navbar />

                <PageBannerContent 
                    pageTitle={"Envoyer de l'argent"} 
                    pageCaption={"rapide, confidentiel et sécurisé"}
                />

                <SendMoneyContent contact={contact} />

                {/* <AccountCreateArea /> */}

                <Footer />
            </>
        );
}
