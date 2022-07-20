import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { BACKEND_URL } from '../../config/constant';
    export default function Footer() {
        let currentYear = new Date().getFullYear();

        const [contact, setContact] = useState({})

        const getContact = async () => {
            axios.get(BACKEND_URL+'/api/contact', {params: {populate:'*'}})
              .then(function (response) {
                setContact(response.data.data.attributes)
              })
              .catch(function (error) {
                console.log(error);
              });
        } 

        useEffect(() => {
            getContact()
          }, [])

        return (
            <footer className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-footer-widget">
                                <div className="logo">
                                    <Link href="/">
                                        <a><img src="/images/logo.png" alt="logo" /></a>
                                    </Link>
                                    <p>pacifiktransfert.com est un produit de onetransfer money transfer systems inc. l'entreprise est enregistrée au Canada auprès de CANAFE et de l'AMF en tant qu'entreprise de services monétaires.</p>
                                </div>
                                
                                {/* <ul className="social-links">
                                    <li>
                                        <a href="https://www.facebook.com/" target="_blank">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/" target="_blank">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/" target="_blank">
                                            <i className="fab fa-instagram"></i>
                                        </a> 
                                    </li>
                                    <li> 
                                        <a href="https://www.linkedin.com/" target="_blank">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a> 
                                    </li>
                                </ul> */}
                            </div>
                        </div>

                        <div className="col-lg-3 offset-lg-3 col-sm-6 col-md-6">
                            <div className="single-footer-widget">
                                <h3>Support</h3>
                                
                                <ul className="list">
                                    <li>
                                        <Link href="/faq">
                                            <a>FAQ's</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy-policy">
                                            <a>Privacy Policy</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/terms-condition">
                                            <a>Terms & Condition</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>Contact Us</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-footer-widget">
                                <h3>Address</h3>
                                
                                <ul className="footer-contact-info">
                                    {contact.contact_address?
                                        <li>
                                            <span className="mr-1">{contact.contact_address_title}:</span> 
                                            {contact.contact_address}
                                        </li>
                                    : ''}
                                    
                                    {contact.contact_email?
                                        <li>
                                            <span className="mr-1">{contact.contact_email_title}:</span> 
                                            {contact.contact_email}
                                        </li>
                                    : ''}

                                    {contact.contact_contact_phone?
                                        <li>
                                            <span className="mr-1">{contact.contact_phone_title}:</span> 
                                            {contact.contact_phone}
                                        </li>
                                    : ''}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="copyright-area">
                        <p>© {currentYear} pacifiktransfert.com - All rights Reserved </p>
                    </div>
                </div>
            </footer>
        );
}