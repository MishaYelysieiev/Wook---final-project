import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import './AddressEditing.scss';

class AddressEditing extends React.Component {
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
            .then(response => response.json())
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
    }

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
                    <div className="AddressEditing_info">
                        <div className="info-address">
                            <span className="info-header">Your Address Information</span>
                            <span className="info-address_item">{user.firstName || ''} {user.lastName || ''}</span>
                            {/*<div className="">*/}
                                <span className="info-address_item">{address.country || ''}</span>
                                <span className="info-address_item">{address.city || ''} {address.street || ''}</span>
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
                    <input type="submit" value="Save Changes" className="btn-save-changes"  disabled = {(this.state.disabled)? "disabled" : ""}/>
                </form>
            </div>
        );
    }
}

export default AddressEditing;