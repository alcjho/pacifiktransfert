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
    const [trxTypes, setTrxTypes] = useState();

    const getTrxTypes = async () => {
      await axios.get(BACKEND_URL+'/api/transfert-types', {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`
          },
      }).then((response)=>{
          let data = response.data.data;
          let options = [];
          data.map((opt)=>{
              options.push({value: opt.id, label: opt.attributes.name_fr})
          })          
          setTrxTypes(options)
      });
    }

    const getAdminConfig = async () => {
      axios.get(BACKEND_URL+'/api/admin-settings/1', {
        headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`
        }})
        .then(function (response) {
          setAdminConfig(response.data.data.attributes)
        })
        .catch(function (error) {
          console.log(error);
        });
    } 

    const getHome = async () => {
        axios.get(BACKEND_URL+'/api/home-page', {params: {populate:'*'}})
          .then(function (response) {
            setHomeInfo(response.data.data.attributes)
          })
          .catch(function (error) {
            console.log(error);
          });
    }
      
      useEffect(() => {
        getHome();
        getAdminConfig();
        getTrxTypes();
      }, [])
      


        return (
            <>
                <Navbar />

                <MainBanner homeInfo={homeInfo} admconfig={adminConfig} trxTypes={trxTypes}/>

                <FeaturedCard homeInfo={homeInfo} />

                <HowItWorks homeInfo={homeInfo} />

                <Footer homeInfo={homeInfo} />
            </>
        );
    }
