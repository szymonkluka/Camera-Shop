import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartBtn = () => {
    const cartItems = useSelector((state) => state.addItem.cartItems);

    // Calculate total cart quantity
    const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <NavLink to={{ pathname: "/cart", state: { totalCartQuantity } }} className="btn btn-outline-primary ms-2" style={{ fontSize: '20px' }}>
                <span className="fa fa-shopping-cart me-1"></span> Cart ({totalCartQuantity})
            </NavLink>
        </>
    );
};

export default CartBtn;
