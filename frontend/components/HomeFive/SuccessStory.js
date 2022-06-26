import React, { Component } from 'react'
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));
const ModalVideo = dynamic(() => import('react-modal-video'), {
    ssr: false
});

const options = {
    loop: true,
    nav: true,
    dots: false,
    autoplayHoverPause: true,
    autoplay: true,
    items: 1,
    margin: 5,
    navText: [
        "<i class='fas fa-chevron-left'></i>",
        "<i class='fas fa-chevron-right'></i>"
    ]
}

export default class SuccessStory extends Component {

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

    // Popup Video
    state = {
        isOpen: false,
    }
    openModal = () => {
        this.setState({isOpen: true})
    }

    render() {
        return (
            <>
                <div className="success-story-area ptb-70 pt-0">
                    <div className="container">
                        <div className="section-title">
                            <h2>Business success story</h2>
                        </div>

                        <div className="success-story-inner">
                            {this.state.display ? <OwlCarousel 
                                className="success-story-slides owl-carousel owl-theme"
                                {...options}
                            >  
                                <div className="single-success-story-box">
                                    <div className="row m-0 align-items-center">
                                        <div className="col-lg-6 col-md-6 p-0">
                                            <div className="content">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse.</p>
                                                <h3>John Smith <span>CTO at EnvyTheme</span></h3>
                                
                                                <div
                                                    onClick={e => {e.preventDefault(); this.openModal()}}
                                                    className="btn btn-primary popup-youtube"
                                                > 
                                                    Watch Video
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 p-0">
                                            <div className="image">
                                                <img 
                                                    src="/images/success-story1.jpg" 
                                                    alt="image" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="single-success-story-box">
                                    <div className="row m-0 align-items-center">
                                        <div className="col-lg-6 col-md-6 p-0">
                                            <div className="content">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse.</p>
                                                <h3>John Smith <span>CTO at EnvyTheme</span></h3>
                                                <div
                                                    onClick={e => {e.preventDefault(); this.openModal()}}
                                                    className="btn btn-primary popup-youtube"
                                                > 
                                                    Watch Video
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 p-0">
                                            <div className="image">
                                                <img 
                                                    src="/images/success-story1.jpg" 
                                                    alt="image" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </OwlCarousel> : ''}
                        </div>
                    </div>
                </div>

                {/* If you want to change the video need to update below videoID */}
                <ModalVideo 
                    channel='youtube' 
                    isOpen={this.state.isOpen} 
                    videoId='szuchBiLrEM' 
                    onClose={() => this.setState({isOpen: false})} 
                />
            </>
        )
    }
}
