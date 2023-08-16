import React from 'react';
import { NavLink } from 'react-router-dom';
import CartBtn from './buttons/CartBtn';
import Signup from './buttons/SignupBtn';
import './Header.css';
import './custom-themes.scss';

const Header = () => {
    const handleHomeClick = () => {
        window.scrollTo({
            top: 10,
            behavior: 'smooth',
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <div className="container-fluid py-2 d-flex justify-content-between">
                <div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        Menu
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-1 custom-nav">
                            <NavItem to="/" text="Home" />
                            <NavItem to="/products" text="Products" />
                            <NavItem to="/about" text="About" />
                        </ul>
                    </div>
                </div>
                <div className="header-center">
                    <NavLink className="photo-gear-text text-center" to="/">
                        <span className="red">PHOTO</span>
                        <span className="black">GEAR</span>
                    </NavLink>
                </div>
                <div className="btn-container d-flex align-items-center">
                    <Signup className="me-3" />
                    <CartBtn />
                </div>
            </div>
        </nav>
    );
};

const NavItem = ({ to, text }) => {
    return (
        <li className="nav-item">
            <NavLink
                className="nav-link"
                exact
                to={to}
                activeClassName="active-link" // Apply this class when the link is active
            >
                {text}
            </NavLink>
        </li>
    );
};

export default Header;
