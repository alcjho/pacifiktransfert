import React, { Component } from 'react'
import Link from 'next/link';

export default class PaymentExperience extends Component {
    render() {
        return (
            <>
                <div className="payment-experience-area bg-f4fcff ptb-70">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-5 col-md-12">
                                <div className="payment-experience-content">
                                    <h2>Create seamless payment experiences</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel.</p>

                                    <Link href="#">
                                        <a className="link-btn">Start with payments</a>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-7 col-md-12">
                                <div className="payment-experience-image text-center">
                                    <img 
                                        src="/images/experience-img1.png" 
                                        alt="image" 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 col-sm-6 col-md-6">
                                <div className="single-payment-experience-box">
                                    <div className="icon">
                                        <i className="fas fa-chart-line"></i>
                                    </div>
                                    <h3>Faster Growth</h3>
                                    <p>Labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-sm-6 col-md-6">
                                <div className="single-payment-experience-box">
                                    <div className="icon">
                                        <i className="fab fa-audible"></i>
                                    </div>
                                    <h3>Amazing Experiences</h3>
                                    <p>Labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-sm-6 col-md-6">
                                <div className="single-payment-experience-box">
                                    <div className="icon">
                                        <i className="fas fa-credit-card"></i>
                                    </div>
                                    <h3>Global Payments</h3>
                                    <p>Labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-sm-6 col-md-6">
                                <div className="single-payment-experience-box">
                                    <div className="icon">
                                        <i className="fab fa-expeditedssl"></i>
                                    </div>
                                    <h3>Secure Payments</h3>
                                    <p>Labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
