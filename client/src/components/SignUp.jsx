import React, { useState } from 'react';
import './SignUp.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DelieveryDetails from './DelieveryDetails';

const SignUp = () => {
    const history = useHistory();
    const [isSignInActive, setIsSignInActive] = useState(false);

    const handleSignInClick = () => {
        setIsSignInActive(true);
    };

    const handleLogInClick = () => {
        setIsSignInActive(false);
    };

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        zip: '',
        street: '',
        apartmentNumber: '',
        telephone: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Perform validation based on the input name
        if (
            name === 'username' ||
            name === 'password' ||
            name === 'firstName' ||
            name === 'lastName' ||
            name === 'country' ||
            name === 'city' ||
            name === 'street'
        ) {
            const regex = /^[a-zA-Z\s]*$/; // Only allow letters and spaces
            if (!regex.test(value)) {
                // Input contains invalid characters
                return;
            }
        } else if (name === 'apartmentNumber' || name === 'zip' || name === 'telephone') {
            const regex = /^[\d-\/]*$/; // Only allow numbers, '-' and '/'
            if (!regex.test(value)) {
                // Input contains invalid characters
                return;
            }
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true); // Set formSubmitted to true on submit

        // Check if all required fields are filled
        const isFormValid = Object.values(formData).every((value) => value !== '');

        if (isFormValid) {
            // Perform form submission logic
            const register = {
                username: formData.username,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                country: formData.country,
                city: formData.city,
                zip: formData.zip,
                street: formData.street,
                apartmentNumber: formData.apartmentNumber,
                telephone: formData.telephone,
                email: formData.email,
            };

            const dataToSend = {
                ...register,
            };

            fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Register successful:', data);
                    setFormData({
                        username: '',
                        password: '',
                        firstName: '',
                        lastName: '',
                        country: '',
                        city: '',
                        zip: '',
                        street: '',
                        apartmentNumber: '',
                        telephone: '',
                        email: '',
                    });

                    const userDataToSave = {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        country: formData.country,
                        city: formData.city,
                        zip: formData.zip,
                        street: formData.street,
                        apartmentNumber: formData.apartmentNumber,
                        telephone: formData.telephone,
                        email: formData.email,
                    };

                    localStorage.setItem('registerData', JSON.stringify(userDataToSave));
                    history.push('/thankyouregister');
                })
                .catch((error) => {
                    console.error('Register failed:', error);
                    // Perform error handling logic
                });
        } else {
            console.log('Please fill out all forms');
        }
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        // Get the username and password from the formData state
        const { username, password } = formData;

        // Perform login logic here, such as making an API request to authenticate the user
        // You can use a similar fetch approach as in the registration, but this time for login
        // For example:
        fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Login successful:', data);
                // Handle successful login, such as storing the authentication token or redirecting the user
            })
        history.push('/delieverydetails')
            .catch((error) => {
                console.error('Login failed:', error);
                // Perform error handling logic for failed login
            });
    };

    return (
        <div className="container my-4">
            <div className="row">
                <div className={`col-md-6 col-lg-8 signin ${isSignInActive ? 'signin2' : ''}`}>
                    <div className={`back-img ${isSignInActive ? 'active-green' : ''}`}>
                        <div className="background-text">
                            {isSignInActive
                                ? 'Sign In to check your delivery progress and receive discount coupons'
                                : 'Log in to check the status of your order'}
                        </div>
                        <div className="sign-in-text">
                            <h2
                                className={`log-in-button ${isSignInActive ? 'nonactive' : 'actives'}`}
                                onClick={handleLogInClick}
                            >
                                Log In
                            </h2>
                            <h2
                                className={`sign-in-button ${isSignInActive ? 'actives' : 'nonactive'}`}
                                onClick={handleSignInClick}
                            >
                                Sign In
                            </h2>
                        </div>
                        <div className={`layer ${isSignInActive ? 'active-green' : ''}`}></div>
                    </div>
                    <div className="form-section">
                        <form onSubmit={isSignInActive ? handleSubmit : handleLoginSubmit}>
                            <div className="row g-3 col-lg-12 col-md-4 col-sm-12 col-xs-12">
                                {!isSignInActive && (
                                    <>
                                        <div className={`col-lg-12 col-md-12 col-sm-12 col-xs-12 ${isSignInActive ? '' : ''}`}>
                                            <label htmlFor="username" className="form-label">
                                                User Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className={`col-lg-12 col-md-12 col-sm-12 col-xs-12 ${isSignInActive ? '' : ''}`}>
                                            <label htmlFor="password" className="form-label">
                                                Password
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                    </>
                                )}
                                {isSignInActive && (
                                    <>
                                        <div className="col-lg-4 col-md-3 col-sm-3 col-xs-3">
                                            <label htmlFor="username" className="form-label">
                                                User Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-3 col-sm-3 col-xs-3">
                                            <label htmlFor="password" className="form-label">
                                                Password
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-3 col-sm-3 col-xs-12">
                                            <label htmlFor="firstName" className="form-label">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                            <label htmlFor="lastName" className="form-label">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                            <label htmlFor="country" className="form-label">
                                                Country
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="country"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                            <label htmlFor="city" className="form-label">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                            <label htmlFor="zip" className="form-label">
                                                ZIP Code
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="zip"
                                                name="zip"
                                                value={formData.zip}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                            <label htmlFor="street" className="form-label">
                                                Street
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="street"
                                                name="street"
                                                value={formData.street}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                            <label htmlFor="apartmentNumber" className="form-label">
                                                Apartment Number
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="apartmentNumber"
                                                name="apartmentNumber"
                                                value={formData.apartmentNumber}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
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
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                            <label htmlFor="email" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <hr className="my-4" />
                            <button
                                className={`btn btn-primary btn-lg ${isSignInActive ? 'actives' : 'nonactive'} btn-custom`}
                                type="submit"
                                style={{ marginTop: "-15px" }}
                            >
                                {isSignInActive ? 'Register' : 'Login'}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;