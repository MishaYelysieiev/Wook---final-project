import React from 'react';

import './SubscribeSection.scss';

class SubscribeSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
      event.preventDefault();
      this.setState({
         email: ''
       });
//получение значения в консоль 
      console.log('email value is', this.state.email);
    }
    handleEmailChange(event) {
//console.log('form submitted and email value is', event.target.value);
      this.setState({email: event.target.value});
    }
    
    render() {
        return (
            <div className="Subscribe">
               <div className="Subscribe_block">
                    <h1 className="Subscribe_name">Join Our Newsletter</h1>
                    <h6 className="Subscribe_text">Sign up to hear about new books and promotions</h6>
            
                 <form onSubmit={this.handleSubmit}>
                  <input
                    className="EmailSubscribe"
                    type="text"
                    placeholder="E-mail"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                  <button className="BtnSubscribe">Sign up</button>
                </form>
            
            

               </div>
            </div>
        );
    }
  
}

export default SubscribeSection;


//                    <form>
//                        <input className="EmailSubscribe" type="email" name="emailaddress" placeholder="email@example.com "/>
//                        <input className="BtnSubscribe" type="submit" value="Sign up" />
//                    </form>