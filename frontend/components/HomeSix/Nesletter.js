import React, { Component } from 'react'

export default class Nesletter extends Component {
    render() {
        return (
            <>
                <div className="subscribe-wrap-area pb-100">
                    <div className="container">
                        <div className="subscribe-wrap-inner-box">
                            <div className="subscribe-wrap-box-content">
                                <div className="row align-items-center">
                                    <div className="col-lg-6 col-md-12">
                                        <div className="subscribe-content">
                                            <h3>Subscribe our nesletter</h3>
                                            <p>Don’t miss any update on new promotions</p>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <form className="newsletter-form">
                                            <input 
                                                type="text" 
                                                className="input-newsletter" 
                                                placeholder="Enter your email address" 
                                                name="EMAIL" 
                                                required
                                            />
                                            <button type="submit" className="btn btn-primary">
                                                Subscribe Now <span></span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
