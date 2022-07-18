import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import ContactContent from '../components/Contact/ContactContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';
import axios from 'axios';

    export default function Contact() {
        const [contact, setContact] = useState({})

        const getContact = async () => {
            axios.get('http://99.79.48.57:1337/api/contact', {params: {populate:'*'}})
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
                    pageTitle={contact.contact_cover_title} 
                    pageCaption={contact.contact_cover_subtitle}
                />

                <ContactContent contact={contact} />

                {/* <AccountCreateArea /> */}

                <Footer />
            </>
        );
}
