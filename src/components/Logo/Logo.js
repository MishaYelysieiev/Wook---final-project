import React from 'react';
import {Link} from "react-router-dom";

import './Logo.scss';


function Logo(props) {

    return (
        <div className="Logo">
            <Link to='/' className='Logo' onClick={props.click}>
                <svg width="99" height="72" viewBox="0 0 99 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6387 39.9316L17.1309 43.3066L17.8516 40.2656L22.9141 22.4062H25.7617L30.7012 40.2656L31.4043 43.3594L31.9492 39.9141L35.9219 22.4062H39.3145L33.1094 48H30.0332L24.7598 29.3496L24.3555 27.3984L23.9512 29.3496L18.4844 48H15.4082L9.2207 22.4062H12.5957L16.6387 39.9316ZM41.1426 38.3145C41.1426 36.4512 41.5059 34.7754 42.2324 33.2871C42.9707 31.7988 43.9902 30.6504 45.291 29.8418C46.6035 29.0332 48.0977 28.6289 49.7734 28.6289C52.3633 28.6289 54.4551 29.5254 56.0488 31.3184C57.6543 33.1113 58.457 35.4961 58.457 38.4727V38.7012C58.457 40.5527 58.0996 42.2168 57.3848 43.6934C56.6816 45.1582 55.668 46.3008 54.3438 47.1211C53.0312 47.9414 51.5195 48.3516 49.8086 48.3516C47.2305 48.3516 45.1387 47.4551 43.5332 45.6621C41.9395 43.8691 41.1426 41.4961 41.1426 38.543V38.3145ZM44.4121 38.7012C44.4121 40.8105 44.8984 42.5039 45.8711 43.7812C46.8555 45.0586 48.168 45.6973 49.8086 45.6973C51.4609 45.6973 52.7734 45.0527 53.7461 43.7637C54.7188 42.4629 55.2051 40.6465 55.2051 38.3145C55.2051 36.2285 54.707 34.541 53.7109 33.252C52.7266 31.9512 51.4141 31.3008 49.7734 31.3008C48.168 31.3008 46.873 31.9395 45.8887 33.2168C44.9043 34.4941 44.4121 36.3223 44.4121 38.7012ZM61.6738 38.3145C61.6738 36.4512 62.0371 34.7754 62.7637 33.2871C63.502 31.7988 64.5215 30.6504 65.8223 29.8418C67.1348 29.0332 68.6289 28.6289 70.3047 28.6289C72.8945 28.6289 74.9863 29.5254 76.5801 31.3184C78.1855 33.1113 78.9883 35.4961 78.9883 38.4727V38.7012C78.9883 40.5527 78.6309 42.2168 77.916 43.6934C77.2129 45.1582 76.1992 46.3008 74.875 47.1211C73.5625 47.9414 72.0508 48.3516 70.3398 48.3516C67.7617 48.3516 65.6699 47.4551 64.0645 45.6621C62.4707 43.8691 61.6738 41.4961 61.6738 38.543V38.3145ZM64.9434 38.7012C64.9434 40.8105 65.4297 42.5039 66.4023 43.7812C67.3867 45.0586 68.6992 45.6973 70.3398 45.6973C71.9922 45.6973 73.3047 45.0527 74.2773 43.7637C75.25 42.4629 75.7363 40.6465 75.7363 38.3145C75.7363 36.2285 75.2383 34.541 74.2422 33.252C73.2578 31.9512 71.9453 31.3008 70.3047 31.3008C68.6992 31.3008 67.4043 31.9395 66.4199 33.2168C65.4355 34.4941 64.9434 36.3223 64.9434 38.7012ZM88.375 39.1934L86.3359 41.3203V48H83.084V21H86.3359V37.3301L88.0762 35.2383L94 28.9805H97.9551L90.5547 36.9258L98.8164 48H95.002L88.375 39.1934Z" fill="#331B22"/>
                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="72" height="72">
                    <circle cx="36" cy="36" r="36" fill="#0096A1"/>
                </mask>
                <g mask="url(#mask0)">
                    <circle cx="36" cy="36" r="36" fill="#0096A1"/>
                    <path d="M30.3223 40.6172L33.7676 22.4062H39.0234L33.3457 48H28.0371L23.8711 30.8789L19.7051 48H14.3965L8.71875 22.4062H13.9746L17.4375 40.582L21.6562 22.4062H26.1211L30.3223 40.6172ZM41.2031 38.3145C41.2031 36.4512 41.5664 34.7754 42.293 33.2871C43.0312 31.7988 44.0508 30.6504 45.3516 29.8418C46.6641 29.0332 48.1582 28.6289 49.834 28.6289C52.4238 28.6289 54.5156 29.5254 56.1094 31.3184C57.7148 33.1113 58.5176 35.4961 58.5176 38.4727V38.7012C58.5176 40.5527 58.1602 42.2168 57.4453 43.6934C56.7422 45.1582 55.7285 46.3008 54.4043 47.1211C53.0918 47.9414 51.5801 48.3516 49.8691 48.3516C47.291 48.3516 45.1992 47.4551 43.5938 45.6621C42 43.8691 41.2031 41.4961 41.2031 38.543V38.3145ZM44.4727 38.7012C44.4727 40.8105 44.959 42.5039 45.9316 43.7812C46.916 45.0586 48.2285 45.6973 49.8691 45.6973C51.5215 45.6973 52.834 45.0527 53.8066 43.7637C54.7793 42.4629 55.2656 40.6465 55.2656 38.3145C55.2656 36.2285 54.7676 34.541 53.7715 33.252C52.7871 31.9512 51.4746 31.3008 49.834 31.3008C48.2285 31.3008 46.9336 31.9395 45.9492 33.2168C44.9648 34.4941 44.4727 36.3223 44.4727 38.7012ZM61.7344 38.3145C61.7344 36.4512 62.0977 34.7754 62.8242 33.2871C63.5625 31.7988 64.582 30.6504 65.8828 29.8418C67.1953 29.0332 68.6895 28.6289 70.3652 28.6289C72.9551 28.6289 75.0469 29.5254 76.6406 31.3184C78.2461 33.1113 79.0488 35.4961 79.0488 38.4727V38.7012C79.0488 40.5527 78.6914 42.2168 77.9766 43.6934C77.2734 45.1582 76.2598 46.3008 74.9355 47.1211C73.623 47.9414 72.1113 48.3516 70.4004 48.3516C67.8223 48.3516 65.7305 47.4551 64.125 45.6621C62.5312 43.8691 61.7344 41.4961 61.7344 38.543V38.3145ZM65.0039 38.7012C65.0039 40.8105 65.4902 42.5039 66.4629 43.7812C67.4473 45.0586 68.7598 45.6973 70.4004 45.6973C72.0527 45.6973 73.3652 45.0527 74.3379 43.7637C75.3105 42.4629 75.7969 40.6465 75.7969 38.3145C75.7969 36.2285 75.2988 34.541 74.3027 33.252C73.3184 31.9512 72.0059 31.3008 70.3652 31.3008C68.7598 31.3008 67.4648 31.9395 66.4805 33.2168C65.4961 34.4941 65.0039 36.3223 65.0039 38.7012ZM89.5254 40.3711L87.6973 42.1992V48H82.6172V21H87.6973V35.959L88.6816 34.6934L93.5508 28.9805H99.6504L92.7773 36.9082L100.248 48H94.4121L89.5254 40.3711Z" fill="white"/>
                </g>
            </svg>
            </Link>
        </div>
    );
}

export default Logo;