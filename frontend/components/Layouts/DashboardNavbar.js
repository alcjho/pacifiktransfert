import React, { useState, useEffect } from 'react';
import Link from '../../utils/ActiveLink';
import { useRouter } from 'next/router';

import axios from 'axios';

export default function Navbar({ pagination }) {
    const router = useRouter();
    const [display, setDisplay] = useState(false)
    const [collapsed, setCollapsed] = useState(false)

    // Navbar 
    const _isMounted = false;
    const toggleNavbar = () => {
        setCollapsed(!collapsed)
    }

    const logout = async () => {
        try {
          await axios.get('/api/logout');
          router.push('/login');
        } catch (e) {
          console.log(e);
        }
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
                                            <Link href="/profile" activeClassName="active">
                                                <a className="nav-link">
                                                    Mon profile 
                                                </a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href={"/transactions?page=1&items=20"} activeClassName="active">
                                                <a className="nav-link">Mes transactions</a>
                                            </Link>
                                        </li>

                                    </ul>
                                </div>

                                <div className="others-options">
                                    {/* <Link href="/login"> */}
                                    <Link href="#">
                                        <a className="login-btn" onClick={logout}>
                                            <i className="flaticon-user"></i>Deconnexion</a>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        );
    }
