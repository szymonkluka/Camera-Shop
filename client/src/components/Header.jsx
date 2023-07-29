import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CartBtn from './buttons/CartBtn';
import Signup from './buttons/SignupBtn';
import './Header.css';


const Header = () => {
    const handleHomeClick = () => {
        window.scrollTo({
            top: 10,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid py-2">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    > Menu
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-1 custom-nav">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    exact
                                    aria-current="page"
                                    to="/"
                                    onClick={handleHomeClick}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">
                                    Products
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">
                                    About
                                </NavLink>
                            </li>
                        </ul>
                        <div className="header-center">
                            <NavLink className="photo-gear-text" to="/">
                                PHOTO GEAR
                            </NavLink>
                        </div>
                        <Signup className="btn-container" />
                        <CartBtn className="btn-container" />

                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;