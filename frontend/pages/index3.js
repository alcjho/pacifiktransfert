import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layouts/Navbar';
import MainBanner from '../components/HomeThree/MainBanner';
import FeaturedCard from '../components/HomeThree/FeaturedCard';
import HowItWorks from '../components/HomeThree/HowItWorks';
import ServicesContent from '../components/HomeThree/ServicesContent';
import ComparisonsTableTwo from '../components/Common/ComparisonsTableTwo';
import OurFeaturesStyleTwo from '../components/Common/OurFeaturesStyleTwo';
import EasyPaymentBorrow from '../components/Common/EasyPaymentBorrow';
import FunFacts from '../components/HomeThree/FunFacts';
import CustomersFeedback from '../components/Common/CustomersFeedback';
import PartnerContent from '../components/Common/PartnerContent';
import AppDownloadContent from '../components/HomeThree/AppDownloadContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import BlogCard from '../components/Common/BlogCard';
import Footer from '../components/Layouts/Footer';
import Rates from '../components/Rates/Rates';
import axios from 'axios';
import { BACKEND_URL } from '../config/constant';

export default function Home() {
    const [homeInfo, setHomeInfo] = useState({})
    const getHome = async () => {
        axios.get(BACKEND_URL+'/api/home-page', {params: {populate:'*'}})
          .then(function (response) {
            console.log('img', response.data.data.attributes.step1_icon?.data.attributes.url);
            setHomeInfo(response.data.data.attributes)
          })
          .catch(function (error) {
            console.log(error);
          });
    }
      
      useEffect(() => {
        getHome()
      }, [])
      


        return (
            <>
                <Navbar />

                <MainBanner homeInfo={homeInfo} />

                <FeaturedCard homeInfo={homeInfo} />


                <HowItWorks homeInfo={homeInfo} />


                <Footer homeInfo={homeInfo} />
            </>
        );
    }
