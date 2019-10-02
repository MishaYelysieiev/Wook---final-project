import React from 'react';

import './AddressEditing.scss';

class AddressEditing extends React.Component {
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
        let firstName = document.getElementById("customerFirstName").value;
        let lastName = document.getElementById("customerLastName").value;
        let country = document.getElementById("country").value;
        let city = document.getElementById("city").value;
        let streetAddress = document.getElementById("streetAddress").value;

        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: this.state.externalData.email,
            password: this.state.externalData.password,
            address: {
                country: country,
                city: city,
                street: streetAddress
            },
            phone: this.state.externalData.phone
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
            .then(data => alert("Your data was successfully changed!"))
            .catch(e => 'Error');
    };

    render() {
        let user = {};
        let address = {};
        if(this.state.externalData) {
            user = this.state.externalData;
            if(user.address) {
                address = user.address;
            }
        }
        return (
            <div className="AddressEditing">
                <form onSubmit={(event) => this.putData(event)}>
                    <div className="AddressEditing_info">
                        <div className="info-address">
                            <span className="info-header">Your Address Information</span>
                            <span className="info-address_item">{user.firstName || ''} {user.lastName || ''}</span>
                            {/*<div className="">*/}
                                <span className="info-address_item">{address.country || ''}</span>
                                <span className="info-address_item">{address.city || ''}, {address.street || ''}</span>
                            {/*</div>*/}
                            <span className="info-address_item">{user.phone || ''}</span>
                        </div>
                        <div className="info-delivery">
                            <span className="info-header">Delivery Editing</span>
                            <label htmlFor="customerFirstName">Customer First Name</label>
                            <input type="text" id="customerFirstName" defaultValue={user.firstName || ''} required/>
                            <label htmlFor="customerLastName">Customer Last Name</label>
                            <input type="text" id="customerLastName" defaultValue={user.lastName || ''} required/>
                        </div>
                        <div className="info-contact">
                            <label htmlFor="country">Country</label>
                            <input type="text" id="country" defaultValue={address.country || ''} required/>
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" defaultValue={address.city || ''} required/>
                            <label htmlFor="streetAddress">Street Address</label>
                            <input type="text" id="streetAddress" defaultValue={address.street || ''} required/>
                        </div>
                    </div>
                    <input type="submit" value="Save Changes" className="btn-save-changes" />
                </form>
            </div>
        );
    }
}

export default AddressEditing;