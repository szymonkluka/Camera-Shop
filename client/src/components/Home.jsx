import React from 'react'
import Product from './Product'
import './Home.css';
import { useEffect, useState } from 'react';
import { Element, animateScroll as scroll } from 'react-scroll'


const Home = () => {
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [height, setHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        const handleScroll = () => {
            // Calculate the scroll position
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            // Define the threshold after which the button should be hidden
            const scrollThreshold = 500; // Adjust the value as needed

            // Update the visibility state of the button
            setIsButtonVisible(scrollPosition < scrollThreshold);

            // Update the visibility and height states for the content to hide
            const heightToHideFrom = 50;
            setHeight(scrollPosition);

            if (scrollPosition > heightToHideFrom) {
                isVisible && setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleWindowResize);

        // Clean up the event listeners on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    const getImageSource = () => {
        if (windowWidth < 880) {
            return '/assets/images/home/africa.jpg';
        } else {
            return '/assets/images/home/purecolor.jpg';
        }
    };

    const getImageSource2 = () => {
        if (windowWidth < 880) {
            return '/assets/images/home/canonbackgroundimage.jpg';
        }
        else {
            return '/assets/images/home/Sony.jpg';
        }
    }

    const getImageSource3 = () => {
        if (windowWidth < 880) {
            return '/assets/images/home/sonybackgroundimage.jpg';
        }
        else {
            return '/assets/images/home/KillerInsta.jpg';
        }
    }
    const handleScrollToPixels = () => {
        scroll.scrollTo(630, {
            duration: 500,
            delay: 0,
            smooth: 'easeInOutQuart',
        });
    };

    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={getImageSource3()} className="d-block w-100" alt="IPhone" height="500px" />
                    </div>
                    <div className="carousel-item">
                        <img src="/assets/images/home/img6.jpg" className="d-block w-100" alt="IPhone" height="500px" />
                    </div>
                    <div className="carousel-item">
                        <img src={getImageSource2()} className="d-block w-100" alt="IPhone" height="500px" />
                    </div>
                    <div className="carousel-item">
                        <img src={getImageSource()} className="d-block w-100" alt="IPhone" height="500px" />
                    </div>
                </div>
                <div className="custom-controls" data-bs-interval="200">
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className={`col-12 text-center ${isVisible ? '' : 'hidden'}`}>
                <h2 className="discover">DISCOVER OUR PRODUCTS</h2>
                <button className={`down-arrow custom-down-arrow ${isButtonVisible ? '' : 'hidden'}`} onClick={handleScrollToPixels}></button>
            </div>


            <Element name="productSection">
                <Product />
            </Element>

        </div>

    )
}

export default Home
