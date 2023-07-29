import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


const SignupBtn = () => {


    return (
        <>
            <NavLink
                to={{ pathname: "/signup" }}
                className="btn btn-outline-primary ms-2 signup-button"
                style={{ fontSize: '20px' }}
            >
                <span className="fa fa-user-plus me-1"></span>Log In/Sign In
            </NavLink>
        </>
    );
};

export default SignupBtn;