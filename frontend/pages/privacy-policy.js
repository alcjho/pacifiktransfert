import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import Footer from '../components/Layouts/Footer';
import axios from 'axios';
import { BACKEND_URL } from '../config/constant'
import MarkdownToHtml from 'react-markdown';

    export default function PrivacyPolicy() {
        const [privacyPolicy, setPrivacyPolicy] = useState({})
        const getPrivacyPolicy = async () => {
            axios.get(BACKEND_URL+'/api/vie-privee', {params: {populate:'*'}})
            .then(function (response) {
                setPrivacyPolicy(response.data.data.attributes)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
      
      useEffect(() => {
        getPrivacyPolicy()
      }, [])

        return (
            <>
                <Navbar />

                <PageBannerContent 
                    pageTitle={privacyPolicy.privacy_policy_cover_title}
                    pageCaption={privacyPolicy.privacy_policy_cover_subtitle}
                />

                <div className="ptb-70">
                    <div className="container">
                        <div className="main-text-content">
                            <MarkdownToHtml children={ privacyPolicy.privacy_policy_content } />
                        </div>
                    </div>
                </div>
          
                <Footer />
            </>
        );
}
