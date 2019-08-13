import React from 'react';

import './Banner.scss';




class Banner extends React.Component {

    render() {
        return (
            <div className='Banner'>
                <div className="Banner_pagintaion">
                    <div className="indicator">
                    </div>
                </div>
                <div className="Banner_slider">
                    <div className="Banner_image-wrapper Banner_first">
                    </div>
                    <div className="Banner_image-wrapper Banner_second">
                    </div>
                    <div className="Banner_image-wrapper Banner_third">
                    </div>
                </div>

            </div>
        );
    }
}

export default Banner;