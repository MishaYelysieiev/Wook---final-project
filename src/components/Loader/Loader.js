import React from 'react';

import './Loader.scss';

import Logo from '../Logo/Logo';




class Loader extends React.Component {

    render() {
        return (
            <div className='Loader'>
                <Logo/>
            </div>
        );
    }
}

export default Loader;