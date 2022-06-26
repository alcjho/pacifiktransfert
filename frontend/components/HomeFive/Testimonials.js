import React, { Component } from 'react'

export default class Testimonials extends Component {
    render() {
        return (
            <>
                <div className="testimonials-area ptb-70">
                    <div className="container">
                        <div className="section-title">
                            <h2>Luvion score 4.8 out of 5, from 55,495 reviews</h2>
                            <div className="bar"></div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6">
                                <div className="single-testimonials-box">
                                    <div className="rating">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse.</p>
                                    <h3>John Smith <span>CTO at EnvyThme</span></h3>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="single-testimonials-box">
                                    <div className="rating">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse.</p>
                                    <h3>Sarah Taylor <span>CTO at ThemeForest</span></h3>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="single-testimonials-box">
                                    <div className="rating">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse.</p>
                                    <h3>James Andy <span>CEO at Envato</span></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
