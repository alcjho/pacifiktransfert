import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import MainBanner from '../components/HomeFive/MainBanner';
import Partners from '../components/HomeFive/Partners';
import PaymentExperience from '../components/HomeFive/PaymentExperience';
import GlobalSupport from '../components/HomeFive/GlobalSupport';
import GrowBusiness from '../components/HomeFive/GrowBusiness';
import Testimonials from '../components/HomeFive/Testimonials';
import SuccessStory from '../components/HomeFive/SuccessStory';
import TrustedAllOverWorld from '../components/HomeFive/TrustedAllOverWorld';
import PaymentFeatures from '../components/HomeFive/PaymentFeatures';
import GetStarted from '../components/Common/GetStarted';
import Footer from '../components/Layouts/Footer';
 
class Index5 extends Component {
    render() {
        return (
            <>
                <Navbar />
                
                <MainBanner />

                <Partners />

                <PaymentExperience />

                <GlobalSupport />

                <GrowBusiness />

                <Testimonials />

                <SuccessStory />

                <TrustedAllOverWorld />

                <PaymentFeatures />

                <GetStarted /> 
                
                <Footer />
            </>
        );
    }
}

export default Index5;