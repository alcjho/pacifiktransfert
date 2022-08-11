import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { BACKEND_URL } from '../../config/constant';

const ModalVideo = dynamic(() => import('react-modal-video'), {
    ssr: false
});

    export default function AboutContent({ aboutUs }) {

        return (
            <div className="about-area ptb-70">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="about-content">
                                <span>{aboutUs.about_us_content_uptitle}</span>
                                <h2>{aboutUs.about_us_content_title}</h2>
                                <div dangerouslySetInnerHTML={{__html: aboutUs.about_us_content_desc }}/>   
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="about-image">
                                <img src={BACKEND_URL + aboutUs.about_us_content_image?.data?.attributes.url} alt="image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}
