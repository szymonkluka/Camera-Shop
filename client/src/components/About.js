import React from 'react'

const About = () => {
    return (
        <div>
            <div className="container py-5 my-5">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="text-primary fw-bold mb-4">About Us</h1>
                        <p className="lead mb-4">
                            Welcome to our camera haven, where a dedicated team of camera enthusiasts awaits you. John, Christina, Kate, Marlon, George, and Caroline are more than just shop workers – they're your trusted advisors on all things photography. With their technical prowess, artistic insight, and genuine passion for cameras, they'll transform your shopping experience into a personalized journey. Let their expertise guide you to the perfect gear, ensuring every click captures your vision. Your photography adventure begins here, where our knowledgeable and passionate team turns dreams into reality.
                        </p>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <img src="/assets/images/about.jpg" alt="About Us" height="335px" width="350px" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
