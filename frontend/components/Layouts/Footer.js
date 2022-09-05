import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { BACKEND_URL } from '../../config/constant';
import Image from 'next/image'

    export default function Footer() {
        let currentYear = new Date().getFullYear();

        const [contact, setContact] = useState({})
        const [aboutUs, setAboutUs] = useState({})

        const getAboutUs = async () => {
            axios.get(BACKEND_URL+'/api/a-propos-de-nous', {params: {populate:'*'}})
              .then(function (response) {
                setAboutUs(response.data.data.attributes)
              })
              .catch(function (error) {
                console.log(error);
              });
        }

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
            getContact();
            getAboutUs()
          }, [])

        return (
            <footer className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-footer-widget">
                                <div className="logo">
                                    <Link href="/">
                                        <a>
                                            {/* <img src="/images/logo/logo.png" alt="logo" /> */}
                                            <Image
                                                src="/images/logo/pacifik.svg"
                                                alt="PacifikTransfert"
                                                width={'113px'}
                                                height={'44px'}
                                            />
                                        </a>
                                    </Link>
                                    <p><div dangerouslySetInnerHTML={{__html: aboutUs.about_us_content_desc?.substring(0,200)+"..."}}/></p>
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
                                <h3>Entreprise</h3>
                                
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
                                <h3>Contact</h3>
                                
                                <ul className="footer-contact-info">
                                    
                                    {contact.contact_email?
                                        <li>
                                            <span className="mr-1">{contact.contact_email_title}:</span> 
                                            {contact.contact_email}
                                        </li>
                                    : ''}

                                    {contact.contact_phone?
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