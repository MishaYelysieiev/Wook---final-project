import React from 'react';

import './ContactInformation.scss';

class ContactInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            externalData: null
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
            .then(response => response.json())
            .then(data => this.setState({externalData: data}));
    }

    componentDidMount() {
        this.fetchData();
    }

    putData = (event) => {
        event.preventDefault();
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
            .then(response => response.json())
            .then(data => {
            document.cookie = '_login =;max-age=0';
            document.cookie = `_login = ${data.token};max-age=3600`;
            alert("Your data was successfully changed!");
        }).catch(e => 'Error');
    };

    render() {
        let user = {};
        if(this.state.externalData) {
            user = this.state.externalData;
        }
        return (
            <div className="ContactInformation">
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
                    <input type="submit" value="Save Changes" className="btn-save-changes" />
                </form>
            </div>
        );
    }
}

export default ContactInformation;