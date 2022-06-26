import React, { Component } from 'react';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: false,
    dots: false,
    autoplayHoverPause: true,
    autoplay: true,
    margin: 30,
    navText: [
        "<i class='fas fa-chevron-left'></i>",
        "<i class='fas fa-chevron-right'></i>"
    ],
    responsive: {
        0: {
            items: 2,
        },
        576: {
            items: 3,
        },
        768: {
            items: 4,
        },
        992: {
            items: 5,
        }
    }
}

class Partners extends Component {

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
                <div className="partner-area-two ptb-70">
                    <div className="container">
                        {this.state.display ? <OwlCarousel 
                            className="partner-slides owl-carousel owl-theme"
                            {...options}
                        > 
                            <div className="partner-item">
                                <img 
                                    src="/images/partner1.png" 
                                    alt="image" 
                                />
                            </div>

                            <div className="partner-item">
                                <img 
                                    src="/images/partner2.png" 
                                    alt="image" 
                                />
                            </div>

                            <div className="partner-item">
                                <img 
                                    src="/images/partner3.png" 
                                    alt="image" 
                                />
                            </div>

                            <div className="partner-item">
                                <img 
                                    src="/images/partner4.png" 
                                    alt="image" 
                                />
                            </div>

                            <div className="partner-item">
                                <img 
                                    src="/images/partner5.png" 
                                    alt="image" 
                                />
                            </div>
                        </OwlCarousel> : ''}
                    </div>
                </div>
            </>
        );
    }
}

export default Partners;