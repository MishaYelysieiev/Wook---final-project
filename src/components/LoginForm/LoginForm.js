import React from 'react';
import {Link} from 'react-router-dom';

import registrationBg from './img/registration-form-text.png'

import './LoginForm.scss';

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

                    </div>
                    <div className='create-account-block'>
                        <div className='create-account-block__container'>
                            <h1 className='create-account-block__title'>Registration</h1>
                            <Link className='create-account-block__create-acc-btn btn' to='/registration'>Create
                                Account</Link>
                            <img className='create-account-block__registration-bg' src={registrationBg}/>

                        </div>
                    </div>
                </div>
            </div>
        )

    }
}


export default LoginForm;