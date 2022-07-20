import React, { Component } from 'react';
import FaqTextContent from './FaqTextContent';
import FaqContactForm from './FaqContactForm';
import { BACKEND_URL } from '../../config/constant';


    export default function FaqContentArea({ faq }) {
        return (
            <div className="faq-area ptb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-12">
                            <div className="faq-content">
                                <h2>{faq.faq_content_title}</h2>
                                <div className="bar"></div>
                                <p>{faq.faq_content}</p>

                                <div className="faq-image">
                                    <img src={ BACKEND_URL + faq.faq_content_image?.data.attributes.url} alt="image" />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7 col-md-12">
                            <FaqTextContent faq={faq} />
                        </div>
                    </div>

                    {/* <FaqContactForm /> */}
                </div>
            </div>
        );
}
