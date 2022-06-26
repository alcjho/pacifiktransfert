import React, { Component } from 'react'
import Link from 'next/link';

export default class FunFacts extends Component {
    render() {
        return (
            <>
                <div className="funfacts-style-area">
                    <div className="container">
                        <div className="funfacts-style-inner-box ptb-100">
                            <div className="row">
                                <div className="col-lg-3 col-sm-3 col-md-3 col-6">
                                    <div className="funfact">
                                        <h3><span>180</span>K</h3>
                                        <p>Downloaded</p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-sm-3 col-md-3 col-6">
                                    <div className="funfact">
                                        <h3><span>20</span>K</h3>
                                        <p>Feedback</p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-sm-3 col-md-3 col-6">
                                    <div className="funfact">
                                        <h3><span>500</span>+</h3>
                                        <p>Workers</p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-sm-3 col-md-3 col-6">
                                    <div className="funfact">
                                        <h3><span>70</span>+</h3>
                                        <p>Contrubutors</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-cta-box">
                                <h3>Have any question about us?</h3>
                                <p>Don't hesitate to contact us</p>

                                <Link href="/contact">
                                    <a className="btn btn-primary">Contact Us</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
