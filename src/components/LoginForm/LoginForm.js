import React from 'react';
import {Link} from 'react-router-dom';

// import registrationBg from './img/registration-form-text.png'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import './LoginForm.scss';

const GOOGLE_KEY =`${process.env.REACT_APP_GOOGLEId}`
const FACEBOOK_KEY =`${process.env.REACT_APP_FACEBOOK_KEY}`



class LoginForm extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {
                fullName: '',
                email: '',
                password: '',
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    // handleChange = (event) => {
    //     event.preventDefault();
    //     const {name, value} = event.target;
    //     const validEmailRegex =
    //         RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    //     let errors = this.state.errors;
    //
    //     switch (name) {
    //         case 'email':
    //             errors.email =
    //                 validEmailRegex.test(value)
    //                     ? ''
    //                     : 'Email is not valid!';
    //             break;
    //         case 'password':
    //             errors.password =
    //                 value.length < 8
    //                     ? 'Password must be 8 characters long!'
    //                     : '';
    //             break;
    //         default:
    //             break;
    //     }
    //     this.setState({errors, [name]: value}, () => {
    //         console.log(errors)
    //     })
    // };


    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Logining');
        const {email, password} = this.state;

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
            .then(response => {
                if (!(response.status === 200)) {
                    throw new Error(response);
                } else {
                    return response.json();
                }
            })
            .then(data => {
                document.cookie = '_login =;max-age=0';
                document.cookie = `_login = ${data.token};max-age=3600`;
                alert('Login successful!');
                window.location.href = '/';
                }
            )
            .catch((error) => {
                console.log('error: ' + error);
                alert('Oops! Something went wrong. Check your data');
            });
    };

    onFailure = (error) => {
        alert(error);
    };

    googleResponse = (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type: 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('/api/authentication/google', options)
            .then(response => {
                if (!(response.status === 200)) {
                    throw new Error(response);
                } else {
                    return response.json();
                }
            })
            .then(data => {
                document.cookie = '_login =;max-age=0';
                document.cookie = `_login = ${data.token};max-age=3600`;
                alert('Login successful!');
                window.location.href = '/';
            })
            .catch((error) => {
                console.log('error: ' + error);
                alert('Oops! Something went wrong. Check your data');
            });
    };

    facebookResponse = (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type: 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('/api/authentication/facebook', options)
            .then(response => {
                if (!(response.status === 200)) {
                    throw new Error(response);
                } else {
                    return response.json();
                }
            })
            .then(data => {
                document.cookie = '_login =;max-age=0';
                document.cookie = `_login = ${data.token};max-age=3600`;
                alert('Login successful!');
                window.location.href = '/';
            })
            .catch((error) => {
                console.log('error: ' + error);
                alert('Oops! Something went wrong. Check your data');
            });
    }


    render() {
        return (
            <div className='LoginForm'>
                <div className='LoginForm__container'>
                    <div className='login-block'>
                        <div className='login-block__container'>
                            <h1 className='login-block__title'>Login</h1>
                            <form className='login-block__form' onSubmit={this.handleSubmit} action='api/login'
                                  method='POST'>
                                <label>Email</label>
                                <input className='login-block__input' type='email' name='email'
                                       placeholder='email@example.com' value={this.state.email}
                                       onChange={this.handleChange} required/>
                                <label>Password</label>
                                <input className='login-block__input' type='password' name='password'
                                       value={this.state.password}
                                       onChange={this.handleChange} required/>
                                <Link className='login-block__forgot-password-btn' to=''>Forgot password?</Link>
                                <input type='submit' className='login-block__submit-btn btn' value='Sign In'
                                       disabled={!this.validateForm()}/>
                            </form>
                        </div>
                        <div className='login-block__auth'>
                            <GoogleLogin
                            clientId= {GOOGLE_KEY}
                            className='googleClass'
                            buttonText="Google"
                            onSuccess={this.googleResponse}
                            onFailure={this.onFailure}  
                            >
                            </GoogleLogin>

                            <FacebookLogin
                                appId={FACEBOOK_KEY}
                                cssClass='fbclass'
                                autoLoad={false}
                                icon="fa-facebook"
                                textButton="Facebook"
                                fields="name,email,picture"
                                callback={this.facebookResponse} />
                        </div>
                    </div>
                    <div className='create-account-block'>
                        <div className='create-account-block__container'>
                            <h1 className='create-account-block__title'>Registration</h1>
                            <Link className='create-account-block__create-acc-btn btn' to='/registration'>Create
                                Account</Link>

                            {/*<img className='create-account-block__registration-bg' src={registrationBg}/>*/}

                        </div>
                        <div className='create-account-block__text-bg'>
                            <p className='create-account-block__text-left'>
                                checkLogin()
                            </p>
                            <p className='create-account-block__text-left'>
                                function checkLogin()&#123;
                            </p>
                            <p className='create-account-block__text-right'>
                                let loginStatus = confirm(&ldquo;Do you have an account?&rdquo;)
                            </p>
                            <p className='create-account-block__text-right'>
                                if(!loginStatus)&#123;
                            </p>
                            <p className='create-account-block__text-right'>
                                &#125;
                            </p>
                            <p className='create-account-block__text-right'>
                                &#125;
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        )

    }
}


export default LoginForm;