import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import './ContactInformation.scss';

class ContactInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            externalData: null,
            snackbarOpen: false,
            snackbarMsg: '',
            disabled: false
        }
    }

    fetchData() {
        let url = '/api/current';
        let bearer = document.cookie.split(';').filter(el => el.includes('_login'))[0].split('=')[1];
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
        .then(data => this.setState({externalData: data}))
        .catch((error) => {
            console.log('error: ' + error);
            this.setState({snackbarOpen: true, snackbarMsg: 'Oops! Something went wrong! Check your data.'});
            // alert('Oops! Something went wrong. Check your data');
        });
    }

    snackbarClose = (event) => {
        this.setState({snackbarOpen: false});
    };

    componentDidMount() {
        this.fetchData();
    }

    putData = (event) => {
        event.preventDefault();
        this.setState( {disabled: !this.state.disabled, snackbarOpen: true, snackbarMsg: 'Your data was sent to update. Usually takes few seconds!'} )
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let { address } = this.state.externalData;
        let phone = document.getElementById("phoneNumber").value;
        let password = this.state.externalData.password;
        let newPassword = document.getElementById("newPassword").value;
        let repeatNewPassword = document.getElementById("repeatNewPassword").value;

        if(newPassword || repeatNewPassword) {
            if (newPassword !== repeatNewPassword) {
                alert("Please, insert correct password data!");
                return;
            }
            else {
                password = newPassword;
            }
        }

        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            address: {
                country: address.country,
                city: address.city,
                street: address.street
            },
            phone: phone
        };

        let bearer = document.cookie.split(';').filter(el => el.includes('_login'))[0].split('=')[1];

        fetch('/api/user',{
            method: 'PUT',
            headers:{
                'Authorization': bearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            this.setState( {disabled: !this.state.disabled} )
            if (!(response.status === 200)) {
                throw new Error(response);
            } else {
                return response.json();
            }
        })
        .then(data => this.setState({snackbarOpen: true, snackbarMsg: 'Your data was successfully changed!'}))
        .catch((error) => {
            console.log('error: ' + error);
            error.json();
            this.setState({snackbarOpen: true, snackbarMsg:error})
            
            // alert('Oops! Something went wrong. Check your data');
        });
    };

    render() {
        let user = {};
        if(this.state.externalData) {
            user = this.state.externalData;
        }
        return (
            <div className="ContactInformation">
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    open={this.state.snackbarOpen}
                    autoHideDuration={3000}
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
                <form onSubmit={(event) => this.putData(event)}>
                    <div className="ContactInformation_info">
                        <div className="info-name">
                            <span className="info-header">Personal data editing</span>
                            <label htmlFor="firstName">Your First Name</label>
                            <input type="text" id="firstName" defaultValue={user.firstName || ''} required/>
                            <label htmlFor="lastName">Your Last Name</label>
                            <input type="text" id="lastName" defaultValue={user.lastName || ''} required/>
                        </div>
                        <div className="info-contact">
                            <label htmlFor="phoneNumber">Phone number</label>
                            <input type="text" id="phoneNumber" defaultValue={user.phone || ''} required/>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" defaultValue={user.email || ''} required/>
                        </div>
                        <div className="info-password">
                            <span className="info-header">Change Password</span>
                            {/*<label htmlFor="oldPassword">Old Password</label>*/}
                            {/*<input type="password" id="oldPassword" />*/}
                            <label htmlFor="newPassword">New Password</label>
                            <input type="password" id="newPassword" />
                            <label htmlFor="repeatNew">Repeat New Password</label>
                            <input type="password" id="repeatNewPassword" />
                        </div>
                    </div>
                    <input type="submit" value="Save Changes" className="btn-save-changes" disabled = {(this.state.disabled)? "disabled" : ""} />
                </form>
            </div>
        );
    }
}

export default ContactInformation;