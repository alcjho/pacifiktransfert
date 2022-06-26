import React, { Component } from 'react'
import Link from 'next/link';

export default class MainBanner extends Component {
    render() {
        return (
            <>
                <div className="main-banner-woman-area">
                    <div className="container">
                        <ul className="banner-woman-list">
                            <li>
                                <i className="fa-solid fa-user"></i> Over 10 million customers
                            </li>
                            <li>
                                <i className="fa-solid fa-certificate"></i> FCA regulated
                            </li>
                        </ul>

                        <div className="row align-items-center">
                            <div className="col-lg-7 col-md-12">
                                <div className="main-banner-woman-content">
                                    <h1>Easy, fee-free banking for entrepreneurs</h1>
                                    <p>Get the financial tools and insights to start, build, and grow your business.</p>
                                    
                                    <ul className="btn-list">
                                        <li>
                                            <Link href="/contact">
                                                <a className="btn btn-primary">
                                                    Get Started
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/contact">
                                                <a className="discover-more-btn">
                                                    Discover More <i className="fa-solid fa-chevron-right"></i>
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-5 col-md-12">
                                <div className="main-banner-woman-image">
                                    <img 
                                        src="/images/home-six/banner/banner-woman.png" 
                                        alt="image" 
                                    />
                                    <div className="woman-shape">
                                        <img 
                                            src="/images/home-six/banner/woman-shape-1.png" 
                                            alt="image" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="banner-woman-shape">
                        <img 
                            src="/images/home-six/banner/woman-shape-2.png" 
                            alt="image" 
                        />
                    </div>
                </div>
            </>
        )
    }
}
