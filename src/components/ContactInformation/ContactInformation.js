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
        if(this.state.externalData) {
            user = this.state.externalData;
        }
        return (
            <div className="ContactInformation">
                <form>
                    <div className="ContactInformation_info">
                        <div className="info-name">
                            <span className="info-header">Personal data editing</span>
                            <label htmlFor="firstName">Your First Name</label>
                            <input type="text" id="firstName" defaultValue={user.firstName} required/>
                            <label htmlFor="lastName">Your Last Name</label>
                            <input type="text" id="lastName" defaultValue={user.lastName} required/>
                        </div>
                        <div className="info-contact">
                            <label htmlFor="phoneNumber">Phone number</label>
                            <input type="text" id="phoneNumber" defaultValue={user.phone} required/>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" defaultValue={user.email} required/>
                        </div>
                        <div className="info-password">
                            <span className="info-header">Change Password</span>
                            <label htmlFor="oldPassword">Old Password</label>
                            <input type="password" id="oldPassword" defaultValue={user.password} required/>
                            <label htmlFor="newPassword">New Password</label>
                            <input type="password" id="newPassword" />
                            <label htmlFor="repeatNew">Repeat New Password</label>
                            <input type="password" id="repeatNew" />
                        </div>
                    </div>
                    <button onSubmit={() => this.putData()} className="btn-save-changes">Save Changes</button>
                </form>
            </div>
        );
    }
}

export default ContactInformation;
