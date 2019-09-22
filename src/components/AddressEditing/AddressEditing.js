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
        let bearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODBiN2M3MGY4NTE0NmQyNTcyOTQ0ZSIsImZpcnN0TmFtZSI6IlRlc3QiLCJsYXN0TmFtZSI6IlVzZXIxMSIsInVzZXJFbWFpbCI6InRlc3QxMUB0ZXN0LmNvbSIsImlhdCI6MTU2ODc1MzMxNSwiZXhwIjoxNTY4NzU2OTE1fQ.6gCbeRk_MIdu4c6cQA_B9sAvWh4QWFpK6twrMjKrlCQ';
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

    putData() {

    }

    render() {
        let user = {};
        let address = {};
        if(this.state.externalData) {
            user = this.state.externalData;
            address = user.address;
        }
        const addressInfo = address.country && (<div className="">
                                                    <span className="info-address_item">{address.country}</span>
                                                    <span className="info-address_item">{address.city + ', ' + address.street}</span>
                                               </div>);
        return (
            <div className="AddressEditing">
                <form>
                    <div className="AddressEditing_info">
                        <div className="info-address">
                            <span className="info-header">Your Address Information</span>
                            <span className="info-address_item">{user.firstName + ' ' + user.lastName}</span>
                            {addressInfo}
                            <span className="info-address_item">{user.phone}</span>
                        </div>
                        <div className="info-delivery">
                            <span className="info-header">Delivery Editing</span>
                            <label htmlFor="customerFirstName">Customer First Name</label>
                            <input type="text" id="customerFirstName" defaultValue={user.firstName} required/>
                            <label htmlFor="customerLastName">Customer Last Name</label>
                            <input type="text" id="customerLastName" defaultValue={user.lastName} required/>
                        </div>
                        <div className="info-contact">
                            <label htmlFor="country">Country</label>
                            <input type="text" id="country" defaultValue={address.country} required/>
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" defaultValue={address.city} required/>
                            <label htmlFor="streetAddress">Street Address</label>
                            <input type="text" id="streetAddress" defaultValue={address.street} required/>
                        </div>
                    </div>
                    <button onSubmit={() => this.putData()} className="btn-save-changes">Save Changes</button>
                </form>
            </div>
        );
    }
}

export default AddressEditing;
