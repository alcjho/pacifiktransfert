import React, { Component, useState } from 'react';
import SendMoneyForm from './SendMoneyForm';
import crypto from 'crypto';

    export default function SendMoneyContent({ contact, user, admconfig }) {
        const [gencode, setGencode] = useState(crypto.randomBytes(4).toString('hex').substring(0,6));

        return (
            <>
                <div className="contact-area ptb-70">
                    <div className="container">
                        <div className="section-title">
                            <h2>Information sur le destinataire</h2>
                            <div className="bar"></div>
                            <p>Afin de traiter vos transferts au plus vite, envoyez-nous votre interac à <b style={{color:'red'}}>{admconfig?.interac_email}</b>  utilisant le code à 6 chiffres <b style={{color:'red'}}>{gencode}</b></p>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <SendMoneyForm contactInfo={contact} userInfo={ user } admconfig={admconfig} gencode={gencode}/>
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
