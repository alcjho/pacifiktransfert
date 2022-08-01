import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import Footer from '../components/Layouts/Footer';
import axios from 'axios';
import { BACKEND_URL } from '../config/constant';
import MarkdownToHtml from 'react-markdown';

    export default function TermsCondition() {

        const [termsAndConditions, setTermsAndConditions] = useState({})
        const getTermsAndConditions = async () => {
            axios.get(BACKEND_URL+'/api/termes-et-conditions', {params: {populate:'*'}})
            .then(function (response) {
                setTermsAndConditions(response.data.data.attributes)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
      
      useEffect(() => {
        getTermsAndConditions()
      }, [])

        return (
            <>
                <Navbar />
                <PageBannerContent pageTitle={termsAndConditions.terms_page_cover_title} 
                    pageCaption={termsAndConditions.terms_page_cover_subtitle} 
                    coverImage={BACKEND_URL + termsAndConditions.terms_cover?.data?.attributes?.url}
                    />
                    
                <div className="ptb-70">
                    <div className="container">
                        <div className="main-text-content">
                            <MarkdownToHtml children={termsAndConditions.terms_content}/>
                        </div>
                    </div>
                </div>
          
                <Footer />
            </>
        );
}
