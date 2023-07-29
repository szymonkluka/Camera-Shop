import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, delItem } from '../redux/actions';
import { fetchProducts, fetchImages } from '../redux/actions';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ProductDetail.css';
import Footer from './Footer';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const cartItems = useSelector((state) => state.addItem.cartItems);
    const products = useSelector((state) => state.addItem.products);
    const images = useSelector((state) => state.addItem.images);
    const [loading, setLoading] = useState(true);
    const carouselRef = useRef(null);

    useEffect(() => {
        dispatch(fetchProducts()).then(() => setLoading(false));
        dispatch(fetchImages());

        // Add the hover effect when the component mounts
        carouselRef.current && carouselRef.current.classList.add('hover-effect');
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
        const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
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
            <div className="container my-5 py-4">

                <div className="row">
                    <div className={`col-md-${window.innerWidth <= 991 && window.innerWidth >= 768 ? '12' : '5'}`} style={{ marginRight: '80px' }}>
                        <div className="mt-2 d-flex flex-wrap position-relative" style={{ marginRight: '5px', paddingRight: '10px' }}>
                            <div className="hover-effect" ref={carouselRef}>
                                <Carousel
                                    showThumbs={false}
                                    showArrows={true}
                                    showStatus={true}
                                    infiniteLoop={true}
                                    autoPlay={true}
                                    interval={3000}
                                    width="95%"
                                    className="carousel"
                                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                        hasPrev && (
                                            <button className="custom-carousel-prev-arrow custom-controls carousel-control-prev" onClick={onClickHandler}>
                                                <span className="custom-arrow-icon">&lt;</span>
                                            </button>
                                        )
                                    }
                                    renderArrowNext={(onClickHandler, hasNext, label) =>
                                        hasNext && (
                                            <button className="custom-carousel-next-arrow custom-controls carousel-control-next" onClick={onClickHandler}>
                                                <span className="custom-arrow-icon">&gt;</span>
                                            </button>
                                        )
                                    }

                                >
                                    {imageUnderDescription.map((image) => (
                                        <div key={image.id}>
                                            <img
                                                src={image.url}
                                                alt={product.name}
                                                className="product-image"
                                                style={{ objectFit: 'cover', width: '100%', height: '380px' }}
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ marginLeft: '10px' }}>{product.name}</h3>
                            <p style={{ marginLeft: '10px' }}>{product.description}</p>
                            <h5 className="mt-1" style={{ marginLeft: '10px' }}>Price: {product.price}</h5>
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
                                    style={{ width: '300px', marginBottom: '20px' }}
                                >
                                    {summaryBtn}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetail;
