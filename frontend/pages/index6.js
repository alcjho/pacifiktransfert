import React, { Component } from 'react';
import NavbarThree from '../components/Layouts/NavbarThree';
import MainBanner from '../components/HomeSix/MainBanner';
import Partners from '../components/HomeSix/Partners';
import AboutUs from '../components/HomeSix/AboutUs';
import Flexibility from '../components/HomeSix/Flexibility';
import FunFacts from '../components/HomeSix/FunFacts';
import Security from '../components/HomeSix/Security';
import AwesomeFeatures from '../components/HomeSix/AwesomeFeatures';
import Testimonials from '../components/HomeSix/Testimonials';
import OurBlog from '../components/HomeSix/OurBlog';
import Nesletter from '../components/HomeSix/Nesletter';
import Footer from '../components/Layouts/Footer';

class Index6 extends Component {
    render() {
        return (
            <>
                <NavbarThree />
                
                <MainBanner />

                <Partners />

                <AboutUs />

                <Flexibility />

                <FunFacts />

                <Security />

                <AwesomeFeatures />

                <Testimonials />

                <OurBlog />

                <Nesletter />
                
                <Footer />
            </>
        );
    }
}

export default Index6;