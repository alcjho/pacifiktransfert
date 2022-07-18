import React, { Component } from 'react';
import ContactInfoContent from './ContactInfoContent';
import ContactForm from './ContactForm';

    export default function ContactContent({ contact }) {
        return (
            <>
                <div className="contact-area ptb-70">
                    <div className="container">
                        <div className="section-title">
                            <h2>{contact.contact_content_title}</h2>
                            <div className="bar"></div>
                            <p>{contact.contact_content_description}</p>
                        </div>

                        <div className="row">
                            <div className="col-lg-5 col-md-12">
                                <ContactInfoContent contact={contact} />
                            </div>

                            <div className="col-lg-7 col-md-12">
                                <ContactForm contactInfo={contact} />
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
