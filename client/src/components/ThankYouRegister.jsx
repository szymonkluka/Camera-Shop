import React, { useEffect } from 'react';
import "./ThankYouRegister.css"
const ThankYouRegister = () => {

  return (
    <div>
      <div className="container py-5 my-5">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center">
            <img src="/assets/images/thankyou.jpg" alt="About Us" height="435px" width="500px" />
          </div>
          <div className="col-md-6">
            <h1 className="text-primary fw-bold mb-4">Thank you for your registration!</h1>
            <p className="lead mb-4">
              <ul>
                <li><span class="checkmark">✔️</span>Log in to track the stages of delivery.</li>
                <li><span class="checkmark">✔️</span>We will use your e-mail to send special offers, discounts and news.</li>
                <li><span class="checkmark">✔️</span>If you have any questions, please contact us at 508 828 424 or email us at photogear@wp.pl. We are looking forward hearing from you!</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ThankYouRegister;

