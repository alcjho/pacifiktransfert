import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import FaqContentArea from '../components/Faq/FaqContentArea';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';
import axios from 'axios';

    export default function Faq() {
        const [faq, setFaq] = useState({})

        const getFaq = async () => {
        axios.get('http://99.79.48.57:1337/api/faq', {params: {populate:'*'}})
          .then(function (response) {
            setFaq(response.data.data.attributes)
          })
          .catch(function (error) {
            console.log(error);
          });
    }
      
      useEffect(() => {
        getFaq()
      }, [])

        return (
            <>
                <Navbar />

                <PageBannerContent 
                    pageTitle={faq.faq_cover_title} 
                    pageCaption={faq.faq_cover_subtitle} 
                />

                <FaqContentArea faq={faq} />

                {/* <AccountCreateArea /> */}

                <Footer />
            </>
        );
}
