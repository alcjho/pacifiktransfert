import React, { Component } from 'react'
import Link from 'next/link';

export default class GetStarted extends Component {
    render() {
        return (
            <>
                <div className="get-started-area ptb-70">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="get-started-title">
                                    <h2>Ready to get started?</h2>

                                    <Link href="/sign-up">
                                        <a className="btn btn-primary">Sign Up Now</a>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <div className="get-started-content">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
