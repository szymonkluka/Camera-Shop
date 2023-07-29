import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


const LoginBtn = () => {


  return (
    <>
      <NavLink
        to={{ pathname: "/login" }}
        className="btn btn-outline-primary ms-2 login-button"
        style={{ fontSize: '20px' }}
      >
        <span className="fa fa-user me-1"></span> Login
      </NavLink>
    </>
  );
};

export default LoginBtn;