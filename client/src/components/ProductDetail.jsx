import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, delItem } from '../redux/actions';
import { fetchProducts, fetchImages } from '../redux/actions';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const cartItems = useSelector((state) => state.addItem.cartItems);
    const products = useSelector((state) => state.addItem.products);
    const images = useSelector((state) => state.addItem.images);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchProducts()).then(() => setLoading(false));
        dispatch(fetchImages());
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleCart = (product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        if (cartItem) {
            dispatch(delItem(product));
        } else {
            dispatch(addItem(product));
        }
    };

    const getProductQuantity = (productId) => {
        const cartItem = cartItems.find((item) => item.id === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    const handleIncreaseQuantity = (product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        if (cartItem) {
            const updatedQuantity = cartItem.quantity + 1;
            const updatedPrice = product.price * 2;
            dispatch(addItem({ ...cartItem, quantity: updatedQuantity, price: updatedPrice }));
        } else {
            dispatch(addItem({ ...product, quantity: 1 }));
        }
    };

    const handleDecreaseQuantity = (product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        if (cartItem && cartItem.quantity > 1) {
            dispatch(delItem(product));
        }
    };

    const handleSummaryCart = () => {
        // Calculate total cart quantity
        const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

        // Navigate to the cart page with the total cart quantity
        history.push({ pathname: '/cart', state: { totalCartQuantity } });
    };

    if (loading || !products || !images) {
        return <div>Loading...</div>;
    }

    const product = products.find((item) => item.id === id);

    if (!product) {
        return <div>Loading...</div>;
    }

    const productImages = images.filter((img) => img.productId === product.id);
    const imageUnderDescription = productImages.slice(1);

    const cartBtn = cartItems.find((item) => item.id === product.id) ? 'Remove from Cart' : 'Add to Cart';
    const productQuantity = getProductQuantity(product.id);
    const summaryBtn = 'Proceed to summary';

    return (
        <>
            <div className="container my-5 py-2">
                <div className="row">
                    <div className="col-md-5 d-flex flex-column justify-content-center" style={{ marginRight: '80px' }}>
                        <div className="mt-2 d-flex flex-wrap position-relative" style={{ marginRight: '5px', paddingRight: '10px' }}>
                            <Carousel
                                showThumbs={false}
                                showArrows={true}
                                showStatus={true}
                                infiniteLoop={true}
                                autoPlay={true}
                                interval={3000}
                                width="100%"
                            >
                                {imageUnderDescription.map((image) => (
                                    <div key={image.id}>
                                        <img
                                            src={image.url}
                                            alt={product.name}
                                            className="product-image"
                                            style={{ objectFit: 'cover', width: '100%', height: '320px' }}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ marginLeft: '10px' }}>{product.name}</h3>
                            <p style={{ marginLeft: '10px' }}>{product.description}</p>
                            <h5 className="mt-2" style={{ marginLeft: '10px' }}>Price: {product.price}</h5>
                            <h5 className="mt-2" style={{ marginLeft: '10px' }}>Quantity: {productQuantity}</h5>
                            <div className="d-flex justify-content-center">
                                <button
                                    onClick={() => handleDecreaseQuantity(product)}
                                    className="btn btn-outline-primary btn-sm me-3 d-flex flex-column"
                                >
                                    -
                                </button>
                                <span className="me-3">{productQuantity}</span>
                                <button
                                    onClick={() => handleIncreaseQuantity(product)}
                                    className="btn btn-outline-primary btn-sm d-flex flex-column"
                                >
                                    +
                                </button>
                            </div>
                            <div className="d-flex flex-column align-items-center">
                                <button
                                    onClick={() => handleCart(product)}
                                    className="btn btn-primary btn-sm mt-3 smaller-button"
                                    style={{ width: '300px' }}
                                >
                                    {cartBtn}
                                </button>
                                <button
                                    onClick={handleSummaryCart}
                                    className="btn btn-success btn-sm mt-3 smaller-button"
                                    style={{ width: '300px', marginBottom: '80px' }}
                                >
                                    {summaryBtn}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
