import React, { useEffect, useState } from 'react';
import Product from './Product';
import './Home.css';
import { Element, animateScroll as scroll } from 'react-scroll';

const Home = () => {
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [height, setHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [carouselButtonClicked, setCarouselButtonClicked] = useState(false); // State variable to track carousel button click

    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleCarouselButtonClick = (direction) => {
        const carouselElement = document.getElementById('carouselExampleIndicators');
        if (carouselElement) {
            if (direction === 'prev') {
                carouselElement.querySelector('.carousel-control-prev').click();
            } else if (direction === 'next') {
                carouselElement.querySelector('.carousel-control-next').click();
            }
        }
    };

    useEffect(() => {
        // Set the interval time for the carousel after component mounts
        const carouselElement = document.getElementById('carouselExampleIndicators');
        if (carouselElement) {
            carouselElement.setAttribute('data-bs-interval', '3000'); // Adjust the interval time in milliseconds (e.g., 3000 = 3 seconds)
        }

        // Conditionally call the handleCarouselButtonClick function only if it hasn't been clicked yet
        if (!carouselButtonClicked) {
            handleCarouselButtonClick('next');
            setCarouselButtonClicked(true);
        }

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

        // Clean up the event listeners and interval attribute on component unmount
        return () => {
            carouselElement?.removeAttribute('data-bs-interval'); // Remove the interval attribute when the component unmounts
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [carouselButtonClicked]); // Dependency array with carouselButtonClicked ensures the effect runs when the button is clicked

    const getImageSource = () => {
        if (windowWidth < 600) {
            return '/assets/images/home/fujifilmbackground.jpg';
        } else if (windowWidth < 880) {
            return '/assets/images/home/africa.jpg';
        } else {
            return '/assets/images/home/horizontal1.jpeg';
        }
    };

    const getImageSource2 = () => {
        if (windowWidth < 600) {
            return '/assets/images/home/canonbackgroundsmall.jpg';
        } else if (windowWidth < 880) {
            return '/assets/images/home/canonbackgroundimage.jpg';
        } else {
            return '/assets/images/home/Sony.jpg';
        }
    };

    const getImageSource3 = () => {
        if (windowWidth < 600) {
            return '/assets/images/home/sonybackground2.jpg';
        } else if (windowWidth < 880) {
            return '/assets/images/home/sonybackgroundimage.jpg';
        } else {
            return '/assets/images/home/KillerInsta.jpg';
        }
    };

    const getImageSource4 = () => {
        if (windowWidth < 600) {
            return '/assets/images/home/nikonbackground.png';
        } else if (windowWidth < 880) {
            return '/assets/images/home/packshot.jpg';
        } else {
            return '/assets/images/home/img6.jpg';
        }
    };

    const handleScrollToPixels = () => {
        scroll.scrollTo(630, {
            duration: 500,
            delay: 0,
            smooth: 'easeInOutQuart',
        });
    };

    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={getImageSource3()} className="d-block w-100" alt="camera" height="500px" />
                    </div>
                    <div className="carousel-item">
                        <img src={getImageSource4()} className="d-block w-100" alt="camera" height="500px" />
                    </div>
                    <div className="carousel-item">
                        <img src={getImageSource2()} className="d-block w-100" alt="camera" height="500px" />
                    </div>
                    <div className="carousel-item">
                        <img src={getImageSource()} className="d-block w-100" alt="camera" height="500px" />
                    </div>
                </div>
                <div className="custom-controls" data-bs-interval="400">
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
    );
};

export default Home;