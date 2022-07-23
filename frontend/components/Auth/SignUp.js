import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import axios from 'axios';



const SignUp = () => {

    const router = useRouter();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post('/api/register', userData);
            console.log('res',res);
            //router.replace('/profile');
        } catch (err) {
            console.log(err.response.data);
        }
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value });
    }

    return (
        <>
            <div className="signup-area">
                <div className="row m-0">
                    <div className="col-lg-6 col-md-12 p-0">
                        <div className="signup-image">
                            <img src="/images/signup-bg.jpg" alt="image" />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12 p-0">
                        <div className="signup-content">
                            <div className="d-table">
                                <div className="d-table-cell">
                                    <div className="signup-form">
                                        <div className="logo">
                                            <Link href="/">
                                                <a>
                                                    <img src="/images/black-logo.png" alt="image" />
                                                </a>
                                            </Link>
                                        </div>

                                        <h3>Open up your Haiper account now</h3>
                                        <p>Already signed up? <Link href="/login"><a>Log in</a></Link></p>

                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input type="text" name="username" id="username" placeholder="Your username" className="form-control" onChange={e => handleChange(e)}/>
                                            </div>

                                            <div className="form-group">
                                                <input type="email" name="email" id="email" placeholder="Your email address" className="form-control" onChange={e => handleChange(e)}/>
                                            </div>

                                            <div className="form-group">
                                                <input type="password" name="password" id="password" placeholder="Create a password" className="form-control" onChange={e => handleChange(e)}/>
                                            </div>

                                            <button type="submit" className="btn btn-primary">Sign Up</button>

                                            {/* <div className="connect-with-social">
                                                <span>Or</span>
                                                <button type="submit" className="facebook">
                                                    <i className="fab fa-facebook-square"></i> Connect with Facebook
                                                </button>
                                                
                                                <button type="submit" className="google">
                                                    <i className="fab fa-google"></i> Connect with Google
                                                </button>
                                            </div> */}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;