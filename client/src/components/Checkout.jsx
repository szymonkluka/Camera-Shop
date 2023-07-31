import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './Checkout.css'


const Checkout = () => {
    const location = useLocation();
    const totalPrice = location.state.totalPrice;
    const totalCartQuantity = location.state.totalCartQuantity;
    const cartItems = useSelector((state) => state.addItem.cartItems);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        zip: '',
        street: '',
        apartmentNumber: '',
        paymentType: 'credit',
        cardName: '',
        cardNumber: '',
        cardExpiration: '',
        cardCVV: '',
        telephone: '',
        email: '',
        comment: ''
    });

    useEffect(() => {
        const savedUserData = JSON.parse(localStorage.getItem('registerData'));
        if (savedUserData) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                firstName: savedUserData.firstName,
                lastName: savedUserData.lastName,
                country: savedUserData.country,
                city: savedUserData.city,
                zip: savedUserData.zip,
                street: savedUserData.street,
                apartmentNumber: savedUserData.apartmentNumber,
                telephone: savedUserData.telephone,
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Perform validation based on the input name
        if (name === 'firstName' || name === 'lastName' || name === 'country' || name === 'city' || name === 'street' || name === 'description' ||
            name === 'comment') {
            const regex = /^[a-zA-Z\s]*$/; // Only allow letters and spaces
            if (!regex.test(value)) {
                // Input contains invalid characters
                return;
            }
        }
        else if (name === 'apartmentNumber' || name === 'zip' || name === 'cardNumber' || name === 'cardExpiration' || name === 'cardCVV' || name === 'telephone') {
            const regex = /^[\d-\/]*$/; // Only allow numbers, '-' and '/'
            if (!regex.test(value)) {
                // Input contains invalid characters
                return;
            }
        }


        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true); // Set formSubmitted to true on submit
        const itemNames = cartItems.map((item) => item.name);
        const description = itemNames.join(', ');

        // Check if all required fields are filled
        const isFormValid = Object.values(formData).every((value) => value !== '');

        if (isFormValid) {
            // Perform form submission logic
            const order = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                country: formData.country,
                city: formData.city,
                zip: formData.zip,
                street: formData.street,
                apartmentNumber: formData.apartmentNumber,
                paymentType: formData.paymentType,
                cardName: formData.cardName,
                cardNumber: formData.cardNumber,
                cardExpiration: formData.cardExpiration,
                cardCVV: formData.cardCVV,
                telephone: formData.telephone,
                description: description,
                comment: formData.comment,
                email: formData.email,
            };

            const dataToSend = {
                totalPrice: totalPrice,
                ...order,
            };

            // Send the order data to the server
            fetch('http://localhost:8000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Order created:', data);
                    setFormData({
                        firstName: '',
                        lastName: '',
                        country: '',
                        city: '',
                        zip: '',
                        street: '',
                        apartmentNumber: '',
                        paymentType: 'credit',
                        cardName: '',
                        cardNumber: '',
                        cardExpiration: '',
                        cardCVV: '',
                        telephone: '',
                        comment: '',
                        email: '',
                    });

                    // Send the order data to the email address
                    fetch('http://localhost:8000/api/orders/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: formData.email,
                            orderData: data,
                        }),
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            console.log('Email sent:', response);
                            // Handle email sent successfully
                        })
                        .catch((error) => {
                            console.error('Error sending email:', error);
                            // Handle email sending error
                        });

                    localStorage.setItem('orderData', JSON.stringify(data));
                    window.location.href = '/thankyou';
                })
                .catch((error) => {
                    console.error('Error creating order:', error);
                    // Perform error handling logic
                });
        } else {
            console.log('Please fill out all forms');
        }
    };

    var total = 0;

    const itemList = (item) => {
        total = total + item.price;
        return (
            <li className="list-group-item d-flex justify-content-between lh-sm" key={item.id}>
                <div>
                    <h6 className="my-0">{item.name}</h6>
                    <span>Price of a single product</span>
                </div>
                <span className="text-muted">${item.price}</span>
            </li>
        );
    };
    return (
        <>
            <div className="container my-5">
                <div className="row g-5">
                    {/* Cart items */}
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Your cart</span>
                            <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Number of products</span>
                                <strong>{totalCartQuantity}</strong>
                            </li>
                        </ul>
                        <ul className="list-group mb-3">
                            {cartItems.length > 0 ? cartItems.map(itemList) : <li className="list-group-item">No items in the cart</li>}
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total Price</span>
                                <strong>${totalPrice}</strong>
                            </li>
                        </ul>
                    </div>
                    {/* Checkout form */}
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Billing address</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3 col-xs-3">
                                <div className="col-sm-6 col-md-6">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className="form-control bold-bolder" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                </div>

                                <div className="col-sm-6 col-md-6">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input type="text" className="form-control" id="country" name="country" value={formData.country} onChange={handleChange} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="zip" className="form-label">ZIP Code</label>
                                    <input type="text" className="form-control" id="zip" name="zip" value={formData.zip} onChange={handleChange} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="street" className="form-label">Street</label>
                                    <input type="text" className="form-control" id="street" name="street" value={formData.street} onChange={handleChange} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="apartmentNumber" className="form-label">Apartment Number</label>
                                    <input type="text" className="form-control" id="apartmentNumber" name="apartmentNumber" value={formData.apartmentNumber} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="telephone" className="form-label">
                                        Telephone number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="telephone"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="invalid-feedback">Telephone is required</div>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="comment" className="form-label">
                                        comment
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="comment"
                                        name="comment"
                                        value={formData.comment}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Payment Details */}
                            <hr className="my-4" />
                            <h4 className="mb-3">Payment Details</h4>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="paymentType" className="form-label">Payment Type</label>
                                    <select className="form-select" id="paymentType" name="paymentType" value={formData.paymentType} onChange={handleChange}>
                                        <option value="credit">Credit Card</option>
                                        <option value="debit">Debit Card</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="cardName" className="form-label">Cardholder's Name</label>
                                    <input type="text" className="form-control" id="cardName" name="cardName" value={formData.cardName} onChange={handleChange} required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                    <input type="text" className="form-control" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="cardExpiration" className="form-label">Card Expiration</label>
                                    <input type="text" className="form-control" id="cardExpiration" name="cardExpiration" value={formData.cardExpiration} onChange={handleChange} required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="cardCVV" className="form-label">Card CVV</label>
                                    <input type="text" className="form-control" id="cardCVV" name="cardCVV" value={formData.cardCVV} onChange={handleChange} required />
                                </div>
                            </div>


                            <hr className="my-4" />
                            <button className="w-100 btn btn-primary btn-lg" type="submit">Place Order</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;