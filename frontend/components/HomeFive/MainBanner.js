import React from 'react';
import Link from 'next/link';

const MainBanner = () => {
    return (
		<>
			<div className="banner-wrapper">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="banner-wrapper-content">
                                <h1>Easy, fee-free banking for entrepreneurs</h1>
                                <p>Get the financial tools and insights to start, build, and grow your business.</p>

                                <Link href="/contact">
                                    <a className="btn btn-primary">Get Started</a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="banner-wrapper-image">
                                <img 
                                    src="/images/banner-img1.png" 
                                    alt="image" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</>
    );
}

export default MainBanner;