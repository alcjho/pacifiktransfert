import React, { Component } from 'react'
import Link from 'next/link';

export default class AboutUs extends Component {
    render() {
        return (
            <>
                <div className="about-us-area ptb-100">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="about-us-content">
                                    <span>About Us</span>
                                    <h3>Committed to helping our customers succeed</h3>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum randomised</p>

                                    <div className="row justify-content-center">
                                        <div className="col-lg-6 col-md-6">
                                            <ul className="list">
                                                <li>
                                                    <i className="flaticon-check-mark"></i> Free plan available
                                                </li>

                                                <li>
                                                    <i className="flaticon-check-mark"></i> 100% transparent costs
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="col-lg-6 col-md-6">
                                            <ul className="list">
                                                <li>
                                                    <i className="flaticon-check-mark"></i> Full data privacy compliance
                                                </li>

                                                <li>
                                                    <i className="flaticon-check-mark"></i> Commitment-free
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="about-btn">
                                        <Link href="/sign-up">
                                            <a className="sign-up-btn">
                                                signup now <i className="fa-solid fa-chevron-right"></i>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <div className="about-us-right-content">
                                    <p>“Dear Customers, we are thrilled you chose to purchase the Tryo from us. We are working hard to build even higher-quality products for our customers. We would love to hear your thoughts and opinion. Please go Tryo to share with us your feedback. Thank you.”</p>

                                    <div className="information d-flex align-items-center">
                                        <img 
                                            src="/images/home-six/user.png" 
                                            className="rounded-circle" alt="image" 
                                        />

                                        <div className="title">
                                            <h3>Alex Smith</h3>
                                            <span>Founder & CEO</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="about-us-shape">
                        <img 
                            src="/images/home-six/vector-shape-1.png" 
                            alt="image" 
                        />
                    </div>
                </div>
            </>
        )
    }
}
