import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import FaqContentArea from '../components/Faq/FaqContentArea';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';
import axios from 'axios';
import { BACKEND_URL } from '../config/constant';


    export default function Faq() {
        const [faq, setFaq] = useState({})
        const [faqQuestions, setFaqQuestions] = useState([])


        const getFaqQuestions = async () => {
          axios.get(BACKEND_URL+'/api/faq-questions')
            .then(function (response) {
              console.log('questions', response.data.data)
              setFaqQuestions(response.data.data)
            })
            .catch(function (error) {
              console.log(error);
            });
        }


      const getFaq = async () => {
        axios.get(BACKEND_URL+'/api/faq', {params: {populate:'*'}})
          .then(function (response) {
            setFaq(response.data.data.attributes)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      
      useEffect(() => {
        getFaq();
        getFaqQuestions();
      }, [])

        return (
            <>
                <Navbar />

                <PageBannerContent 
                    pageTitle={faq.faq_cover_title} 
                    pageCaption={faq.faq_cover_subtitle} 
                    coverImage={BACKEND_URL + faq.faq_cover?.data?.attributes?.url}
                />

                <FaqContentArea faq={faq} questions={faqQuestions} />

                {/* <AccountCreateArea /> */}

                <Footer />
            </>
        );
}
