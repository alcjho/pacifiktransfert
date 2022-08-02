import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layouts/Navbar';
import MainBanner from '../components/HomeThree/MainBanner';
import FeaturedCard from '../components/HomeThree/FeaturedCard';
import HowItWorks from '../components/HomeThree/HowItWorks';
import Footer from '../components/Layouts/Footer';
import axios from 'axios';
import { BACKEND_URL, BEARER_TOKEN } from '../config/constant';

export default function Home() {
    const [homeInfo, setHomeInfo] = useState({})
    const [adminConfig, setAdminConfig] = useState();

    const getAdminConfig = async () => {
      axios.get(BACKEND_URL+'/api/admin-settings/1', {
        headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`
        }})
        .then(function (response) {
          console.log(response.data.data.attributes)
          setAdminConfig(response.data.data.attributes)
        })
        .catch(function (error) {
          console.log(error);
        });
    } 

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
        getHome();
        getAdminConfig();
      }, [])
      


        return (
            <>
                <Navbar />

                <MainBanner homeInfo={homeInfo} admconfig={adminConfig} />

                <FeaturedCard homeInfo={homeInfo} />

                <HowItWorks homeInfo={homeInfo} />

                <Footer homeInfo={homeInfo} />
            </>
        );
    }
