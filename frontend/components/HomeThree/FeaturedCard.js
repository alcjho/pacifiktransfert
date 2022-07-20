import React, { useState } from 'react';
import Link from 'next/link';
import { BACKEND_URL } from '../../config/constant';


    export default function FeaturedCard({ homeInfo }) {
        return (
            <div className="featured-boxes-area">
                <div className="container">
                    <div className="featured-boxes-inner">
                        <div className="row m-0">
                            {/* {homeInfo.feature_1_title && */}
                                <div className="col-lg-3 col-sm-6 col-md-6 p-0">
                                    <div className="single-featured-box">
                                        <img src={BACKEND_URL + homeInfo.reason1_icon?.data.attributes.url} className="single-featured-box-icon mb-3" alt="image" />
                                        <h3>{homeInfo.reason1_title}</h3>
                                        <p>{homeInfo.reason1_description}</p>
                                    </div>
                                </div>
                            {/* } */}
                            {/* {homeInfo.feature_2_title && */}
                                <div className="col-lg-3 col-sm-6 col-md-6 p-0">
                                    <div className="single-featured-box">
                                        <img src={BACKEND_URL + homeInfo.reason2_icon?.data.attributes.url} className="single-featured-box-icon mb-3" alt="image" />
                                        <h3>{homeInfo.reason2_title}</h3>
                                        <p>{homeInfo.reason2_description}</p>
                                    </div>
                                </div>
                            {/* } */}
                            {/* {homeInfo.feature_3_title &&  */}
                                <div className="col-lg-3 col-sm-6 col-md-6 p-0">
                                    <div className="single-featured-box">
                                        <img src={BACKEND_URL + homeInfo.reason3_icon?.data.attributes.url} className="single-featured-box-icon mb-3" alt="image" />
                                        <h3>{homeInfo.reason3_title}</h3>
                                        <p>{homeInfo.reason3_description}</p>
                                    </div>
                                </div>
                            {/* } */}

                            {/* {homeInfo.feature_4_title &&  */}
                                <div className="col-lg-3 col-sm-6 col-md-6 p-0">
                                    <div className="single-featured-box">
                                        <img src={BACKEND_URL + homeInfo.reason4_icon?.data.attributes.url} className="single-featured-box-icon mb-3" alt="image" />
                                        <h3>{homeInfo.reason4_title}</h3>
                                        <p>{homeInfo.reason4_description}</p>
                                    </div>
                                </div>
                            {/* } */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }