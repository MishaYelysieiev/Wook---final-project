import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import './Registration.scss';

class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            firstName: '',
            lastName: '',
            _login: '',
            isSignedUp: false,
            snackbarOpen: false,
            snackbarMsg: '',
            // formValid: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.checkPassword = this.checkPassword.bind(this);
    }

    // checkPassword = () => {
    //     let password = document.getElementById('registration-password').value;
    //     let newPassword = document.getElementById('registration-repeat-password').value;
    //     if (newPassword === password) {
    //         this.setState( {formValid: true})
    //     } else {
    //         this.setState({snackbarOpen: true, snackbarMsg: 'Passwords should match!'});
    //     }
    // };

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        // this.checkPassword();
        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const {firstName, lastName, email, password, _login} = this.state;
        // this.checkPassword();

        // if (!this.state.formValid) {
        //     this.setState({snackbarOpen: true, snackbarMsg: 'Oops! Something went wrong. Check your data!'});
        // } else {
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'firstName': firstName,
                    'lastName': lastName,
                    'email': email,
                    'password': password
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
                        // alert('Registration is successful!');
                        this.setState({snackbarOpen: true, snackbarMsg: 'Registration is successful!'});
                        window.location.href = '/';
                    }
                )
                .catch((error) => {
                    console.log('error: ' + error);
                    // alert('Oops! Something went wrong. Check your data');
                    this.setState({snackbarOpen: true, snackbarMsg: 'Oops! Something went wrong. Check your data!'});
                });
        // }



    };

    render() {
        return (
            <div className='registration'>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    open={this.state.snackbarOpen}
                    autoHideDuration={2000}
                    onClose={this.snackbarClose}
                    message={this.state.snackbarMsg}
                    action={[
                        <IconButton
                            key='close'
                            arial-label='Close'
                            color='white'
                            onClick={this.snackbarClose}
                        >
                            x
                        </IconButton>
                    ]}

                />
                <div className='registration__container'>
                    <h1 className='registration__title'>Registration</h1>
                    <form className='registration__form' onSubmit={this.handleSubmit}>
                        <div className='registration__email-form'>
                            <label>Email</label>
                            <input className='registration__input' type='email' name='email'
                                   placeholder='email@example.com' value={this.state.email} onChange={this.handleChange}
                                   required/>
                            <label>Password</label>
                            <input className='registration__input' id='registration-password' type='password' name='password'
                                   minLength='6'
                                   value={this.state.password}
                                   onChange={this.handleChange} required/>
                            <label>Repeat Password</label>
                            <input className='registration__input' id='registration-repeat-password' type='password' name='passwordConfirmation'
                                   minLength='6'
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
                </div>
            </div>
        )
    }
}

export default Registration;