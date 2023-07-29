import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchImages } from '../redux/actions';
import Footer from './Footer';

const Product = () => {
    const products = useSelector((state) => state.addItem.products);
    const images = useSelector((state) => state.addItem.images);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts()); // Dispatch the action to fetch products
        dispatch(fetchImages()); // Dispatch the action to fetch images
    }, [dispatch]);

    const cardItem = (item) => {
        const productImages = images ? images.filter((img) => img.productId === item.id) : [];
        const imageUrl = productImages.length > 0 ? productImages[0].url : '';

        return (
            <div className="card my-5 py-4 d-flex flex-column align-items-center" key={item.id} style={{ width: '18rem' }}>
                <img src={imageUrl} className="card-img-top" alt={item.name} style={{ width: '200px', height: '200px', objectFit: 'contain' }} />
                <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="lead">${item.price}</p>
                    <NavLink to={`/products/${item.id}`} className="btn btn-outline-primary">
                        Buy Now
                    </NavLink>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="container py-1" style={{ marginTop: '70px' }}>
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Products</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-around">
                    {products && products.map(cardItem)} {/* Add conditional check before rendering products */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Product;