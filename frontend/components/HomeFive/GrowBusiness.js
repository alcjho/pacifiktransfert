import React, { Component } from 'react'

export default class GrowBusiness extends Component {
    render() {
        return (
            <>
                <div className="business-area ptb-70">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="business-content">
                                    <h2>Made to grow with your business</h2>

                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="single-business-box">
                                                <h3>International payments</h3>
                                                <p>Labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo.</p>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="single-business-box">
                                                <h3>Completely customisable</h3>
                                                <p>Labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo.</p>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="single-business-box">
                                                <h3>Real-time alerts</h3>
                                                <p>Labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo.</p>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="single-business-box">
                                                <h3>Fully safe and secure</h3>
                                                <p>Labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <div className="business-image">
                                    <img 
                                        src="/images/business-img.jpg" 
                                        alt="image" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
