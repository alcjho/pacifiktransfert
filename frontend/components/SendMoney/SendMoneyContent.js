import React, { Component, useState } from 'react';
import SendMoneyForm from './SendMoneyForm';
import crypto from 'crypto';

    export default function SendMoneyContent({ contact, banks, user, admconfig, trxtypes, mytransferts, deposit }) {
        const [gencode, setGencode] = useState(crypto.randomBytes(4).toString('hex').substring(0,6));

        return (
            <>
                <div className="contact-area ptb-70">
                    <div className="container">
                        <div className="section-title">
                            <h2>Information sur le destinataire</h2>
                            <div className="bar"></div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <SendMoneyForm contactInfo={contact} banks={banks} userInfo={ user } admconfig={admconfig} trxtypes={trxtypes} deposit={deposit} mytransferts={mytransferts} gencode={gencode}/>
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
