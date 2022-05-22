import React from 'react';
import './header.css'
import grab from '../images/grab-2.svg'

function Header() {
    return (
        <nav class="navbar bg-green">
                <a class="navbar-brand-logo" href="#">
                    <img src={grab} alt="logo" width="60" height="54" />
                </a>
                <span class="navbar-brand-title">Bootcamp - NER</span>
                <button class="btn btn-outline-success-signin" type="button">Sign In</button>
                <button class="btn btn-outline-success-signup" type="button">Sign Up</button>
        </nav>
    )
}

export default Header