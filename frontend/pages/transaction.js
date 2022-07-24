import React, { Component } from 'react';
import Link from 'next/link';
import Transaction from "../components/Transaction/Transaction";
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import SendMoneyContent from '../components/SendMoney/SendMoneyContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';

export default function transaction() {

    return (
        <>
            <Navbar />
            <PageBannerContent 
                pageTitle={"Transactions"} 
                pageCaption={"Votre historique de tous les transactions"}
            />
            <Transaction />
            <Footer />
        </>
    )
}