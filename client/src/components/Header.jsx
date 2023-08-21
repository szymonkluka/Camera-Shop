import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CartBtn from './buttons/CartBtn';
import Signup from './buttons/SignupBtn';
import './Header.css';
import './custom-themes.scss';

const Header = () => {
    const [isSmallerScreen, setIsSmallerScreen] = useState(false);
    const menuButtonRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallerScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <div className="container-fluid py-2 d-flex justify-content-between">
                <div>
                    <button
                        ref={menuButtonRef}
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
                    <div className={`collapse navbar-collapse ${isSmallerScreen ? 'show' : ''}`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-1 custom-nav">
                            <NavItem to="/" text="Home" menuButtonRef={menuButtonRef} isSmallerScreen={isSmallerScreen} />
                            <NavItem to="/products" text="Products" menuButtonRef={menuButtonRef} isSmallerScreen={isSmallerScreen} />
                            <NavItem to="/about" text="About" menuButtonRef={menuButtonRef} isSmallerScreen={isSmallerScreen} />
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

const NavItem = ({ to, text, menuButtonRef, isSmallerScreen }) => {
    const handleNavLinkClick = () => {
        if (isSmallerScreen && menuButtonRef.current) {
            setTimeout(() => {
                menuButtonRef.current.click();
            }, 200);
        }
    };

    return (
        <li className="nav-item">
            <NavLink
                className="nav-link"
                exact
                to={to}
                activeClassName="active-link" // Apply this class when the link is active
                onClick={handleNavLinkClick}
            >
                {text}
            </NavLink>
        </li>
    );
};

export default Header;
