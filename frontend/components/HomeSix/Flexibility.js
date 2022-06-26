import React, { Component } from 'react'

export default class Flexibility extends Component {
    render() {
        return (
            <>
                <div className="flexibility-area pt-100">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="flexibility-image">
                                    <img 
                                        src="/images/home-six/flexibility.png" 
                                        alt="image" 
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <div className="flexibility-content">
                                    <span>Flexibility</span>
                                    <h3>To give you the power to make things happen</h3>

                                    <div className="row justify-content-center">
                                        <div className="col-lg-6 col-md-6">
                                            <ul className="list">
                                                <li>
                                                    <i className="flaticon-check-mark"></i> Easy transfers
                                                </li>

                                                <li>
                                                    <i className="flaticon-check-mark"></i> Business without borders
                                                </li>

                                                <li>
                                                    <i className="flaticon-check-mark"></i> International Payments
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="col-lg-6 col-md-6">
                                            <ul className="list">
                                                <li>
                                                    <i className="flaticon-check-mark"></i>  A powerful open API 
                                                </li>

                                                <li>
                                                    <i className="flaticon-check-mark"></i> Affiliates and partnerships
                                                </li>

                                                <li>
                                                    <i className="flaticon-check-mark"></i> Automated accounting
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum randomised</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
