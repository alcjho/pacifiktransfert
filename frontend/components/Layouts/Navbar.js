import React, { useState, useEffect } from 'react';
import Link from '../../utils/ActiveLink';

export default function Navbar() {

    const [display, setDisplay] = useState(false)
    const [collapsed, setCollapsed] = useState(false)

    // Navbar 
    const _isMounted = false;
    const toggleNavbar = () => {
        setCollapsed(!collapsed)
    }

    useEffect(() => {
        let elementId = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });
    }, [])
    


        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

        return (
            <>
                <div id="navbar" className="navbar-area">
                    <div className="luvion-nav">
                        <div className="container">
                            <nav className="navbar navbar-expand-md navbar-light">
                                <Link href="/">
                                    <a className="navbar-brand">
                                        <img src="/images/logo.png" alt="logo" />
                                        <img src="/images/black-logo.png" alt="logo" />
                                    </a>
                                </Link>

                                <button 
                                    onClick={()=> toggleNavbar()} 
                                    className={classTwo}
                                    type="button" 
                                    data-toggle="collapse" 
                                    data-target="#navbarSupportedContent" 
                                    aria-controls="navbarSupportedContent" 
                                    aria-expanded="false" 
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon-bar top-bar"></span>
                                    <span className="icon-bar middle-bar"></span>
                                    <span className="icon-bar bottom-bar"></span>
                                </button>

                                <div className={classOne} id="navbarSupportedContent">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link href="/index3" activeClassName="active">
                                                <a className="nav-link">
                                                    Acceuil 
                                                </a>
                                            </Link>
                                            {/* <ul className="dropdown-menu">
                                                <li className="nav-item">
                                                    <Link href="/" activeClassName="active">
                                                        <a className="nav-link">Home Demo - 1</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/index2" activeClassName="active">
                                                        <a className="nav-link">Home Demo - 2</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/index3" activeClassName="active">
                                                        <a className="nav-link">Home Demo - 3</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/index4" activeClassName="active">
                                                        <a className="nav-link">Home Demo - 4</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/index5" activeClassName="active">
                                                        <a className="nav-link">Home Demo - 5</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/index6" activeClassName="active">
                                                        <a className="nav-link">Home Demo - 6</a>
                                                    </Link>
                                                </li>
                                            </ul> */}
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/about-us" activeClassName="active">
                                                <a className="nav-link">À propos de nous</a>
                                            </Link>
                                        </li>
 
                                        {/* <li className="nav-item">
                                            <Link href="#">
                                                <a className="nav-link" onClick={e => e.preventDefault()}>
                                                    Features <i className="fas fa-chevron-down"></i>
                                                </a>
                                            </Link>

                                            <ul className="dropdown-menu">
                                                <li className="nav-item">
                                                    <Link href="/features-one" activeClassName="active">
                                                        <a className="nav-link">Features Style One</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/features-two" activeClassName="active">
                                                        <a className="nav-link">Features Style Two</a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li> */}

                                        {/* <li className="nav-item">
                                            <Link href="#">
                                                <a className="nav-link" onClick={e => e.preventDefault()}>
                                                    Pages <i className="fas fa-chevron-down"></i>
                                                </a>
                                            </Link>

                                            <ul className="dropdown-menu">
                                                <li className="nav-item">
                                                    <Link href="/about-us" activeClassName="active">
                                                        <a className="nav-link">About Us</a>
                                                    </Link>
                                                </li>
 
                                                <li className="nav-item">
                                                    <Link href="#">
                                                        <a className="nav-link" onClick={e => e.preventDefault()}>
                                                            New Dropdown <i className="fas fa-chevron-down"></i>
                                                        </a>
                                                    </Link>

                                                    <ul className="dropdown-menu">
                                                        <li className="nav-item">
                                                            <Link href="#" activeClassName="active">
                                                                <a className="nav-link">2nd Level</a>
                                                            </Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link href="#">
                                                                <a className="nav-link" onClick={e => e.preventDefault()}>
                                                                    Another Dropdown <i className="fas fa-chevron-down"></i>
                                                                </a>
                                                            </Link>

                                                            <ul className="dropdown-menu">
                                                                <li className="nav-item">
                                                                    <Link href="#" activeClassName="active">
                                                                        <a className="nav-link">3rd Level</a>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/team" activeClassName="active">
                                                        <a className="nav-link">Team</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/pricing" activeClassName="active">
                                                        <a className="nav-link">Pricing</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/faq" activeClassName="active">
                                                        <a className="nav-link">FAQ</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/sign-up" activeClassName="active">
                                                        <a className="nav-link">Signup</a>
                                                    </Link>
                                                </li>
                                                
                                                <li className="nav-item">
                                                    <Link href="/login" activeClassName="active">
                                                        <a className="nav-link">Login</a>
                                                    </Link>
                                                </li>
 
                                                <li className="nav-item">
                                                    <Link href="/404" activeClassName="active">
                                                        <a className="nav-link">404 Error Page</a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li> */}
 
                                        {/* <li className="nav-item">
                                            <Link href="/pricing" activeClassName="active">
                                                <a className="nav-link">Pricing</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="#">
                                                <a className="nav-link" onClick={e => e.preventDefault()}>
                                                    Blog <i className="fas fa-chevron-down"></i>
                                                </a>
                                            </Link>

                                            <ul className="dropdown-menu">
                                                <li className="nav-item">
                                                    <Link href="/blog-one" activeClassName="active">
                                                        <a className="nav-link">Blog Grid</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/blog-two" activeClassName="active">
                                                        <a className="nav-link">Blog Right Sidebar</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/single-blog" activeClassName="active">
                                                        <a className="nav-link">Blog Details</a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li> */}

                                        <li className="nav-item">
                                            <Link href="/contact" activeClassName="active">
                                                <a className="nav-link">Contact</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="others-options">
                                    {/* <Link href="/login"> */}
                                    <Link href="/index3">
                                        <a className="login-btn">
                                            <i className="flaticon-user"></i> Login
                                        </a>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        );
    }
