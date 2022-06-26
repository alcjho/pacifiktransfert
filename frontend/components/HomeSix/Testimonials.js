import React, { Component } from 'react'
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    nav: true,
    loop: true,
    dots: false,
    autoplayHoverPause: true,
    animateOut: 'fadeOut',
    autoplayTimeout: 8000,
    animateIn: 'fadeIn',
    autoplay: true,
    items: 1,
    navText: [
        "<i class='fas fa-chevron-left'></i>",
        "<i class='fas fa-chevron-right'></i>"
    ]
}

export default class Testimonials extends Component {

    _isMounted = false;
    state = {
        display:false
    }

    componentDidMount(){ 
        this._isMounted = true;
        this.setState({ display: true }) 
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <>
                <div className="testimonials-wrap-area ptb-100">
                    <div className="container">

                        {this.state.display ? <OwlCarousel 
                            className="testimonials-wrap-slides owl-carousel owl-theme"
                            {...options}
                        >  
                            <div className="testimonials-card">
                                <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself.</p>

                                <div className="information d-flex align-items-center justify-content-center">
                                    <img 
                                        src="/images/home-six/user.png" 
                                        className="rounded-circle" 
                                        alt="image" 
                                    />
                                    <div className="title">
                                        <h3>Alex Smith</h3>
                                        <span>Founder & CEO</span>
                                    </div>
                                </div>
                                <div className="vector-icon-image">
                                    <img 
                                        src="/images/home-six/vector-icon.png" 
                                        alt="icon" 
                                    />
                                </div>
                            </div>

                            <div className="testimonials-card">
                                <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself.</p>

                                <div className="information d-flex align-items-center justify-content-center">
                                    <img 
                                        src="/images/home-six/user.png" 
                                        className="rounded-circle" 
                                        alt="image" 
                                    />
                                    <div className="title">
                                        <h3>Steven Smith</h3>
                                        <span>Web Developer</span>
                                    </div>
                                </div>
                                <div className="vector-icon-image">
                                    <img 
                                        src="/images/home-six/vector-icon.png" 
                                        alt="icon" 
                                    />
                                </div>
                            </div>

                            <div className="testimonials-card">
                                <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself.</p>

                                <div className="information d-flex align-items-center justify-content-center">
                                    <img 
                                        src="/images/home-six/user.png" 
                                        className="rounded-circle" 
                                        alt="image" 
                                    />
                                    <div className="title">
                                        <h3>Sarah Taylor</h3>
                                        <span>Co-Founder</span>
                                    </div>
                                </div>
                                <div className="vector-icon-image">
                                    <img 
                                        src="/images/home-six/vector-icon.png" 
                                        alt="icon" 
                                    />
                                </div>
                            </div>
                        </OwlCarousel> : ''}
                    </div>

                    <div className="testimonials-wrap-shape">
                        <img 
                            src="/images/home-six/vector-shape-2.png" 
                            alt="image" 
                        />
                    </div>
                </div>
            </>
        )
    }
}
