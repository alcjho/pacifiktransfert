import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import AboutContent from '../components/AboutUs/AboutContent';
import TeamMember from '../components/AboutUs/TeamMember';
import PartnerContent from '../components/Common/PartnerContent';
import AppDownloadContent from '../components/HomeOne/AppDownloadContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';
import axios from 'axios';
import { BACKEND_URL } from '../config/constant';


    export default function AboutUs() {
        const [aboutUs, setAboutUs] = useState({})

        const getAboutUs = async () => {
            axios.get(BACKEND_URL+'/api/a-propos-de-nous', {params: {populate:'*'}})
              .then(function (response) {
                setAboutUs(response.data.data.attributes)
              })
              .catch(function (error) {
                console.log(error);
              });
        }

        useEffect(() => {
            getAboutUs()
          }, [])

        return (
            <>
                <Navbar />

                <PageBannerContent 
                    pageTitle={aboutUs.about_us_cover_title}
                    pageCaption={aboutUs.about_us_cover_subtitle}
                    coverImage={BACKEND_URL + aboutUs.about_us_cover?.data?.attributes?.url}
                />

                <AboutContent aboutUs={aboutUs}/>

                {/* <TeamMember />

                <PartnerContent />

                <AppDownloadContent />

                <AccountCreateArea /> */}

                <Footer />
            </>
        );
}