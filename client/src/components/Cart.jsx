import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { delItem } from '../redux/actions';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchImages } from '../redux/actions';
import './Cart.css';
import Footer from './Footer';

const Cart = () => {
    const cartItems = useSelector((state) => state.addItem.cartItems);
    const dispatch = useDispatch();
    const images = useSelector((state) => state.addItem.images);

    useEffect(() => {
        dispatch(fetchProducts()); // Dispatch the action to fetch products
        dispatch(fetchImages()); // Dispatch the action to fetch images
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save cartItems to localStorage
    }, [cartItems]);

    const handleClose = (item) => {
        console.log('Removing item from cart:', item);
        dispatch(delItem(item));
    };

    // Calculate total cart quantity
    const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const renderCartItem = (cartItem) => {
        const productImages = images ? images.filter((img) => img.productId === cartItem.id) : [];
        const imageUrl = productImages.length > 0 ? productImages[0].url : '';

        const imageStyles = {
            width: window.innerWidth <= 910 ? '230px' : '280px',
            height: window.innerWidth <= 910 ? '190px' : '240px',
            marginRight: window.innerWidth <= 910 ? '20px' : '0px'
        };

        return (
            <div className="px-2 my-3 bg-light rounded-3" key={cartItem.id} style={{ width: '100%' }}>
                <div className="container py-4">
                    <button onClick={() => handleClose(cartItem)} className="btn-close float-end" aria-label="Close"></button>
                    <div className="row justify-content-center" style={{ width: '100%' }}>
                        <div className={`col-md-4 col-sm-3 ${window.innerWidth <= 910 ? 'image-container-small' : ''}`}>
                            <img src={imageUrl} alt={cartItem.name} style={imageStyles} />
                        </div>
                        <div className="col-md-6">
                            <h3>{cartItem.name}</h3>
                            <p className="lead fw-bold">${cartItem.price * cartItem.quantity}</p>
                            {/* Updated to display the item's total price */}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const emptyCart = () => {
        return (
            <div className="text-center mt-5">
                <h2>No items in the cart</h2>
            </div>
        );
    };


    const itemList = (item) => {
        const items = Array(item.quantity).fill(item);

        return (
            <>
                {items.map((item, index) => (
                    <li className="list-group-item justify" key={`${item.id}-${index}`}>
                        <div className="row mt-2">
                            <div className="col-md-3 text"></div>
                            <div className="col-md-3 text">
                                <span>{item.name}</span>
                            </div>
                            <div className="col-md-3 text">
                                <span>${item.price}</span>
                            </div>
                        </div>
                        {/* Add any other item details you want to display */}
                    </li>
                ))}
            </>
        );
    };

    const button = () => {
        const isScreenSmallerThan400 = window.innerWidth < 400; // Check if the screen width is smaller than 400px

        return (
            <div className="text-center mt-3">
                <h2>Total Value of Order: ${totalPrice}</h2>
                <Link
                    to={{ pathname: '/checkout', state: { totalPrice: totalPrice, totalCartQuantity: totalCartQuantity } }}
                    className={`btn btn-outline-primary mb-12 w-50 mx-auto ${isScreenSmallerThan400 ? 'custom-button-small' : 'custom-button'}`}
                // Use 'custom-button-small' class if the screen is smaller than 400px, otherwise use 'custom-button' class
                >
                    Proceed To checkout
                </Link>
            </div>
        );
    };


    return (
        <div className="container" style={{ minHeight: "500px" }}>
            <div className="text-center mt-3">
                <h2>Total Cart Quantity: {totalCartQuantity}</h2>
                <div className="text-center">
                    {cartItems.length > 0 && button()}
                    <ul className="list-group-item mb-3">
                        {cartItems.length > 0 ? cartItems.map(itemList) : <li className="list-group-item">No items in the cart</li>}
                    </ul>
                </div>
            </div>
            {cartItems.length === 0 && emptyCart()}
            {cartItems.length !== 0 && cartItems.map(renderCartItem)}
        </div>
    )
};

export default Cart;