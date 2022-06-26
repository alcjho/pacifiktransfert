import React, { Component } from 'react'

export default class AwesomeFeatures extends Component {
    render() {
        return (
            <>
                <div className="awesome-features-area pt-100">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="awesome-features-content">
                                    <span>Our Awesome Features</span>
                                    <h3>Stay ahead of the curve, ready for everything</h3>

                                    <div className="row justify-content-center">
                                        <div className="col-lg-6 col-md-6">
                                            <ul className="list">
                                                <li>
                                                    <i className="flaticon-check-mark"></i> Deadline reminders
                                                </li>

                                                <li>
                                                    <i className="flaticon-check-mark"></i> Information retrieval
                                                </li>

                                                <li>
                                                    <i className="flaticon-check-mark"></i> Email notifications
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="col-lg-6 col-md-6">
                                            <ul className="list">
                                                <li>
                                                    <i className="flaticon-check-mark"></i>  Drag and drop functionality 
                                                </li>

                                                <li>
                                                    <i className="flaticon-check-mark"></i> Simple dashboard
                                                </li>

                                                <li>
                                                    <i className="flaticon-check-mark"></i> Incredible infrastructure
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum randomised</p>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <div className="awesome-features-image">
                                    <img 
                                        src="/images/home-six/awesome-features.png" 
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
