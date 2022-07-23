import React from 'react';
import logo from '../../assets/img/Netflix_Logo_RGB.png'
import user from '../../assets/img/user.png'
import './index.css'

export default function Header({black}){
    return (
        <header className= {black ? 'black' : ''}>
            <div className='header--logo'>
                <a href= "/">
                    <img src = {logo} alt= 'logo' />
                </a>
            </div>
            <div className='header--user'>
                <a href='/'>
                    <img src= {user} alt="usuario" />
                </a>
            </div>
        </header>
    )
}