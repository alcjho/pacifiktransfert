import React, { Component } from 'react';
import Link from 'next/link';
import Profile from "../components/Profile/Profile";
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import SendMoneyContent from '../components/SendMoney/SendMoneyContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';

export default function envoyerArgent() {

    return (
        <>
            <Navbar />
            <PageBannerContent 
                pageTitle={"Profile Settings"} 
                pageCaption={"rapide, confidentiel et sécurisé"}
            />
            <Profile />
            <Footer />
        </>
    )
}