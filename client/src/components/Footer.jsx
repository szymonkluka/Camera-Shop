import React from 'react';
import './Footer.css';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
    return (
        <footer className="footer-distributed">
            <div className="footer-left vertical">
                <h3 className="rotated-text">Photo<span>Gear</span></h3>

            </div>
            <div className="footer-center">
                <div className="icon-info2">
                    <i className="fa fa-phone"></i>
                    <span style={{ marginRight: '30px' }}><p>Poland, Boryny 6/6, <span className="under">70-017 Szczecin</span></p></span>
                    <i className="fa fa-phone"></i>
                    <span style={{ marginRight: '30px' }}><p>+48508828424</p></span>
                    <i className="fa fa-envelope"></i>
                    <span style={{ marginRight: '30px' }}><p><a href="mailto:support@company.com">szymonkluka@onet.pl</a></p></span>
                </div>
            </div>
            <div className="footer-right">
                <div className="footer-icons">
                    <a href="https://pl-pl.facebook.com/szymon.kluka"><i className="fa fa-facebook"></i></a>
                    <a href="https://www.linkedin.com/in/szymon-kluka"><i className="fa fa-linkedin"></i></a>
                    <a href="https://github.com/szymonkluka"><i className="fa fa-github"></i></a>
                    <a href="twitter.com"><i className="fa fa-twitter"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;