import React, { useState } from 'react';


    export default function HowItWorks({ homeInfo }) {
        return (
            <section className="how-it-works-area ptb-70">
                <div className="container">
                    <div className="section-title">
                        <h2>{homeInfo.steppers_title}</h2>
                        <div className="bar"></div>
                        <p>{homeInfo.steppers_description}</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-how-it-works">
                                <img src={process.env.BACKEND_URL + homeInfo.step1_icon?.data.attributes.url} alt="image" />
                                <h3>{homeInfo.step1_title}</h3>
                                <p>{homeInfo.step1_description}</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-how-it-works">
                                <img src={process.env.BACKEND_URL + homeInfo.step2_icon?.data.attributes.url} alt="image" />
                                <h3>{homeInfo.step2_title}</h3>
                                <p>{homeInfo.step2_description}</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-how-it-works">
                                <img src={process.env.BACKEND_URL + homeInfo.step3_icon?.data.attributes.url} alt="image" />
                                <h3>{homeInfo.step3_title}</h3>
                                <p>{homeInfo.step3_description}</p>
                            </div>
                        </div>

                        {/* <div className="col-lg-4 col-md-6">
                            <div className="single-how-it-works">
                                <img src="/images/how-it-works/how-it-work4.png" alt="image" />
                                <h3>4. Verify your identity {homeInfo.step_4_title}</h3>
                                <p>Ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel adipiscing aliqua. {homeInfo.step_4_description}</p>
                            </div>
                        </div> */}

                        {/* <div className="col-lg-4 col-md-6">
                            <div className="single-how-it-works">
                                <img src="/images/how-it-works/how-it-work5.png" alt="image" />
                                <h3>5. Pay for your transfer</h3>
                                <p>Ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel adipiscing aliqua.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-how-it-works">
                                <img src="/images/how-it-works/how-it-work6.png" alt="image" />
                                <h3>6. That’s it</h3>
                                <p>Ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel adipiscing aliqua.</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        );
}
