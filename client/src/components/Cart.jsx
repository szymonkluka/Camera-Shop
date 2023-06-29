import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { delItem } from '../redux/actions';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchImages } from '../redux/actions';
import './Cart.css';

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

        return (
            <div className="px-2 my-3 bg-light rounded-3" key={cartItem.id}>
                <div className="container py-4">
                    <button onClick={() => handleClose(cartItem)} className="btn-close float-end" aria-label="Close"></button>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img src={imageUrl} alt={cartItem.name} height="200px" width="180px" />
                        </div>
                        <div className="col-md-4">
                            <h3>{cartItem.name}</h3>
                            <p className="lead fw-bold">${cartItem.price * cartItem.quantity}</p> {/* Updated to display the item's total price */}
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
        return (
            <div className="text-center mt-3">
                <h2>Total Value of Order: ${totalPrice}</h2>
                <Link to={{ pathname: '/checkout', state: { totalPrice: totalPrice, totalCartQuantity: totalCartQuantity } }} className="btn btn-outline-primary mb-5 w-25 mx-auto">
                    Proceed To checkout
                </Link>
            </div>
        );
    };

    return (
        <div className="container"> {/* Add a container around the component */}
            <div className="text-center mt-3">
                <h2>Total Cart Quantity: {totalCartQuantity}</h2>
                <div className="text-center">
                    {cartItems.length > 0 && button()} {/* Place the button here */}
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