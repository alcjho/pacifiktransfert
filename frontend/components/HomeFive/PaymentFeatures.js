import React, { Component } from 'react'
import Link from 'next/link';

export default class PaymentFeatures extends Component {
    render() {
        return (
            <>
                <div className="payment-features-area ptb-70">
                    <div className="container">
                        <div className="payment-features-overview">
                            <div className="payment-features-image">
                                <div className="image">
                                    <img 
                                        src="/images/payment-features1.jpg" 
                                        alt="image" 
                                    />
                                </div>
                            </div>

                            <div className="payment-features-content">
                                <div className="content">
                                    <h2>Retail Payment Processing</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                                    <Link href="#">
                                        <a className="link-btn">Get started now</a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="payment-features-overview">
                            <div className="payment-features-content">
                                <div className="content">
                                    <h2>Online & eCom Payment Processing</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <Link href="#">
                                        <a className="link-btn">Get started now</a>
                                    </Link>
                                </div>
                            </div>

                            <div className="payment-features-image">
                                <div className="image">
                                    <img 
                                        src="/images/payment-features2.jpg" 
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
