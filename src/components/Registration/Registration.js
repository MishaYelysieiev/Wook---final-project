import React from 'react';
import {Link} from 'react-router-dom';

import './Registration.scss';

class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: 'test4@mail.com',
            password: '123321',
            passwordConfirmation: '123321',
            firstName: 'test4',
            lastName: 'testov4',
            _login: '',
            isSignedUp: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        console.log('Submiting...');
        event.preventDefault();
        console.log(this.state);

        const {firstName, lastName, email, password, _login} = this.state;

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'firstName': firstName,
                'lastName': lastName,
                'email': email,
                'password': password,
                'phone': '0951736412',
                'address': {
                    'country': 'USA',
                    'city': 'Oklahoma City',
                    'street': '2609  Ottis Street'
                }
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
                }
            )
            .catch((error) => {
                console.log('error: ' + error);
                alert('Oops! Something went wrong. Check your data');
            });

    };

    render() {
        return (
            <div className='registration'>
                <div className='registration__container'>
                    <h1 className='registration__title'>Registration</h1>
                    <form className='registration__form' onSubmit={this.handleSubmit}>
                        <div className='registration__email-form'>
                            <label>Email</label>
                            <input className='registration__input' type='email' name='email'
                                   placeholder='email@example.com' value={this.state.email} onChange={this.handleChange}
                                   required/>
                            <label>Password</label>
                            <input className='registration__input' type='password' name='password'
                                   value={this.state.password}
                                   onChange={this.handleChange} required/>
                            <label>Repeat Password</label>
                            <input className='registration__input' type='password' name='passwordConfirmation'
                                   value={this.state.passwordConfirmation}
                                   onChange={this.handleChange} required/>
                        </div>
                        <div className='registration__name-form'>
                            <label>First Name</label>
                            <input className='registration__input' type='text' name='firstName'
                                   value={this.state.firstName} onChange={this.handleChange} required/>
                            <label>Second Name</label>
                            <input className='registration__input' type='text' name='lastName'
                                   value={this.state.lastName} onChange={this.handleChange} required/>
                            <div className='registration__checkbox-container'>
                                <input className='registration__checkbox' type='checkbox' name='isSignedUp'
                                       checked={this.state.isSignedUp} onChange={this.handleChange}/>
                                <label className='registration__checkbox-label'>Yes, sign me up for emails to get
                                    exclusive offers</label>
                            </div>
                            <input type='submit' className='registration__submit-btn btn' value='Submit'/>
                        </div>
                    </form>
                    {/*<form className='registration__form' onSubmit={this.handleSubmit}>*/}
                    {/*<label>Email</label>*/}
                    {/*<input className='registration__input' type='email' name='email'*/}
                    {/*placeholder='email@example.com' value={this.state.email} onChange={this.handleChange}*/}
                    {/*required/>*/}
                    {/*<label>Password</label>*/}
                    {/*<input className='registration__input' type='password' name='password'*/}
                    {/*value={this.state.password}*/}
                    {/*onChange={this.handleChange} required/>*/}
                    {/*<label>Repeat Password</label>*/}
                    {/*<input className='registration__input' type='password' name='passwordConfirmation'*/}
                    {/*value={this.state.passwordConfirmation}*/}
                    {/*onChange={this.handleChange} required/>*/}
                    {/*<label>First Name</label>*/}
                    {/*<input className='registration__input' type='text' name='firstName'*/}
                    {/*value={this.state.firstName} onChange={this.handleChange} required/>*/}
                    {/*<label>Second Name</label>*/}
                    {/*<input className='registration__input' type='text' name='lastName'*/}
                    {/*value={this.state.lastName} onChange={this.handleChange} required/>*/}
                    {/*<div className='registration__checkbox-container'>*/}
                    {/*<input className='registration__checkbox' type='checkbox' name='isSignedUp'*/}
                    {/*checked={this.state.isSignedUp} onChange={this.handleChange}/>*/}
                    {/*<label>Yes, sign me up for emails to get exclusive offers</label>*/}

                    {/*</div>*/}
                    {/*<input type='submit' className='registration__submit-btn btn' value='Sign In'/>*/}

                    {/*</form>*/}
                </div>
            </div>
        )
    }
}

export default Registration;