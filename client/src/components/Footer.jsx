import React, { useEffect, useState } from 'react';
import './Footer.css';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            if (windowHeight + scrollTop >= documentHeight) {
                setShowFooter(true);
            } else {
                setShowFooter(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="wrapper">
            <div className="content">
                {/* Your page content goes here */}
            </div>
            {showFooter && (
                <footer className="footer-distributed">
                    <div className="footer-left">
                        <h3>Company<span>logo</span></h3>
                        <p className="footer-company-name">Company Name © 2015</p>
                    </div>
                    <div className="footer-center">
                        <div className="icon-info2">
                            <i className="fa fa-phone"></i>
                            <span style={{ marginRight: '30px' }}><p>Poland, Boryny 6/6, 70-017 Szczecin</p></span>
                            <i className="fa fa-phone"></i>
                            <span style={{ marginRight: '30px' }}><p>+1.555.555.5555</p></span>
                            <i className="fa fa-envelope"></i>
                            <span style={{ marginRight: '30px' }}><p><a href="mailto:support@company.com">support@company.com</a></p></span>
                        </div>
                    </div>
                    <div className="footer-right">

                        <div className="footer-icons">
                            <a href="facebook.com"><i className="fa fa-facebook"></i></a>
                            <a href="twitter.com"><i className="fa fa-twitter"></i></a>
                            <a href="linkedin.com"><i className="fa fa-linkedin"></i></a>
                            <a href="github.com"><i className="fa fa-github"></i></a>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default Footer;