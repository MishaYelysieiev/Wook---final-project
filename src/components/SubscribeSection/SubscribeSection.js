import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

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
    
    snackbarClose = (event) => {
      this.setState({snackbarOpen: false});
    };

    handleSubmit(event) {
      event.preventDefault();
      this.setState({
         email: '',
         snackbarOpen: false,
         snackbarMsg: '',
       });
//получение значения в консоль 
        fetch(`/api/send_email/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'email': this.state.email
          })  
        })
        .then(response => {
          if (!(response.status === 200)) {
            throw new Error(response);
          } else {
              this.setState({snackbarOpen: true, snackbarMsg: "Email have succesfully sended"})
          }
        })
        .catch((error) => {
          console.log('error: ' + error);
          this.setState({snackbarOpen: true, snackbarMsg: 'Oops! Something went wrong! Check your data.'});
          // alert('Oops! Something went wrong. Check your data');
      });
    }
    handleEmailChange(event) {
//console.log('form submitted and email value is', event.target.value);
      this.setState({email: event.target.value});
    }
    
    render() {
        return (
            <div className="Subscribe">
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

