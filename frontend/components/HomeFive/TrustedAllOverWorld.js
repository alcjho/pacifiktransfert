import React, { Component } from 'react'

export default class TrustedAllOverWorld extends Component {
    render() {
        return (
            <>
                <div className="global-area ptb-70">
                    <div className="container">
                        <div className="section-title">
                            <h2>Trusted all over the world</h2>
                            <div className="bar"></div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>

                        <div className="row align-items-center">
                            <div className="col-lg-5 col-md-12">
                                <div className="global-content">
                                    <ul>
                                        <li>10 million customers</li>
                                        <li>2M+ API request per day</li>
                                        <li>75+ countries using</li>
                                        <li>2+ sent every month</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-7 col-md-12">
                                <div className="global-image text-center">
                                    <img 
                                        src="/images/global-img.png" 
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
