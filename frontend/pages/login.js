import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import checkuser from './api/checkuser';

function Login() {
    const router = useRouter();
    const [error, setError] = useState();
    const [userData, setUserData] = useState({
        identifier: '',
        password: ''
    })

    const errors = {
        'Default': 'Erreur de validatioon',
        'Invalid identifier or password': 'Identifiant ou/et mot-de-passe invalide',
        'Your account email is not confirmed': "Compte inactif. Rendez-vous sur votre courriel pour l'activation",
        'Forbidden': "Désolé. vous n'êtes pas autorisé a acceder ce contenu"

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!userData.identifier || !userData.password){
            setError('un identifiant et un mot-de-passe sont obligatoires');
            return;
        }

        try {
            await axios.post('/api/login', userData);
            const redirectUrl = router.query['redirect']
            router.replace(redirectUrl?redirectUrl:'/transactions');
        } catch (err) {
            setError(errors[err.response?.data.error.message] || errors['Default'])
           console.log(err.response?.data.error.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value });
    }
    return (
        <>
            <section className="login-area">
                <div className="row m-0">
                    <div className="col-lg-6 col-md-12 p-0">
                        <div className="login-image">
                            <img src="/images/login-bg.jpg" alt="image" />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12 p-0">
                        <div className="login-content">
                            <div className="d-table">
                                <div className="d-table-cell">
                                    <div className="login-form">
                                        <div className="logo">
                                            <Link href="/">
                                                <a>
                                                    <img src="/images/black-logo.png" alt="image" />
                                                </a>
                                            </Link>
                                        </div>

                                        <h3>Bienvenue</h3>
                                        <p>C'est votre première fois? <Link href="/sign-up"><a>Inscrivez-vous</a></Link></p>

                                        <form onSubmit ={handleSubmit}>
                                            <div className="form-group">
                                                <input type="email" name="identifier" id="identifier" placeholder="Votre adresse courriel" className="form-control" onChange={e => handleChange(e)}/>
                                            </div>

                                            <div className="form-group">
                                                <input type="password" name="password" id="password" placeholder="Votre mot-de-passe" className="form-control" onChange={e => handleChange(e)}/>
                                            </div>

                                            <button type="submit" className="btn btn-primary">Connexion</button>
                                            
                                            <div className="forgot-password">
                                                <Link href="/forgot-password"><a>Mot-de-passe oublié?</a></Link>
                                            </div>
                                            
                                            {/* <div classN>ame="connect-with-social">
                                                <button type="submit" className="facebook">
                                                    <i className="fab fa-facebook-square"></i> Connect with Facebook
                                                </button>
                                                <button type="submit" className="google">
                                                    <i className="fab fa-google"></i> Connect with Google
                                                </button>
                                            </div> */}
                                        </form>
                                        <div className="error mt-5">
                                            {error?
                                                <span className="alert alert-danger">{error}</span>
                                            :''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getStaticProps(ctx){
    return {
        props: {
            pageProps: null
        }
    }
}

export default Login;