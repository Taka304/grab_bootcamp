import React from 'react';
import './header.css'
import { Link } from 'react-router-dom'
import grab from '../images/grab-2.svg'


function Header(props) {
    // clear local storage when sign out and back to login page
    const handleSignOut = () => {
        localStorage.clear()
        window.location.href = "/login";
    }

    var log = localStorage.getItem("username")

    if (!log) {
        return (
            <nav class="navbar bg-green">
                <a class="navbar-brand-logo" href="/">
                    <img src={grab} alt="logo" width="60" height="54" />
                </a>
                <span class="navbar-brand-title">Bootcamp - NER</span>
                <Link to="/login">
                    <button class="btn btn-outline-success-signin" type="button" >Sign In</button>
                </Link>
                <Link to="/signup">
                    <button class="btn btn-outline-success-signup" type="button" href="/signup">Sign Up</button>
                </Link>
            </nav>
        )
    }
    return (
        <nav class="navbar bg-green">
            <a class="navbar-brand-logo" href="/">
                <img src={grab} alt="logo" width="60" height="54" />
            </a>
            <span class="navbar-brand-title">Bootcamp - NER</span>
            <Link to="/history">
                <button class="btn btn-outline-success-signin" type="button" >{log}</button>
            </Link>
            <Link to="/login">
                <button class="btn btn-outline-success-signup" type="button" onClick={handleSignOut}>Log Out</button>
            </Link>
        </nav>
    )
}

export default Header
