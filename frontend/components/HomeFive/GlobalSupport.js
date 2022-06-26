import React, { Component } from 'react'
import Link from 'next/link';

export default class GlobalSupport extends Component {
    render() {
        return (
            <>
                <section className="support-area ptb-70">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="support-image">
                                    <img 
                                        src="/images/support-img1.png" 
                                        alt="image" 
                                    />
                                    <img 
                                        src="/images/support-img2.png" 
                                        alt="image" 
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <div className="support-content">
                                    <h2>Global support in a range of languages</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                                    <Link href="/contact">
                                        <a className="btn btn-primary">Find Out More</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
