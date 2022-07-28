import React, { Component } from 'react';
import SendMoneyForm from './SendMoneyForm';

    export default function SendMoneyContent({ contact, user }) {
        return (
            <>
                <div className="contact-area ptb-70">
                    <div className="container">
                        <div className="section-title">
                            <h2>Information de la destinataire</h2>
                            <div className="bar"></div>
                            <p>Remplisser la formulaire</p>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <SendMoneyForm contactInfo={contact} userInfo={ user } />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-map">
                        <img src="/images/bg-map.png" alt="image" />
                    </div>
                </div>
            </>
        );
}
