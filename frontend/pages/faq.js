import React, { useState } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import FaqContentArea from '../components/Faq/FaqContentArea';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';

    export default function Faq() {
        const [faq, setFaq] = useState({})
        return (
            <>
                <Navbar />

                <PageBannerContent 
                    pageTitle={"FAQ" + faq.title} 
                    pageCaption={"Frequently Asked Questions" + faq.description} 
                />

                <FaqContentArea faq={faq} />

                {/* <AccountCreateArea /> */}

                <Footer />
            </>
        );
}
