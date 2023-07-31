import React, { useEffect, useState } from 'react';
import './DelieveryDetails.css';

const DelieveryDetails = () => {
  const [showFirstStep, setShowFirstStep] = useState(false);
  const [showSecondStep, setShowSecondStep] = useState(false);
  const [showThirdStep, setShowThirdStep] = useState(false);
  const [showFourthStep, setShowFourthStep] = useState(false);
  const orderData = JSON.parse(localStorage.getItem('orderData'));
  const hasOrderData = !!orderData;

  const delItem = () => {
    localStorage.removeItem('orderData')
  }

  useEffect(() => {
    // Show the first step after 1 second
    const firstStepTimer = setTimeout(() => {
      setShowFirstStep(true);
    }, 1000);

    // Show the second step after 11 seconds (10 seconds delay)
    const secondStepTimer = setTimeout(() => {
      setShowSecondStep(true);
    }, 3100);

    // Show the third step after 21 seconds (10 seconds delay)
    const thirdStepTimer = setTimeout(() => {
      setShowThirdStep(true);
    }, 6100);

    const fourthStepTimer = setTimeout(() => {
      setShowFourthStep(true)
    }, 9100)

    // Clean up timers when the component unmounts
    return () => {
      clearTimeout(firstStepTimer);
      clearTimeout(secondStepTimer);
      clearTimeout(thirdStepTimer);
      clearTimeout(fourthStepTimer);
    };
  }, []);

  useEffect(() => {
    if (showFourthStep) {
      delItem();
    }
  }, [showFourthStep]);

  return (
    <div>
      {hasOrderData ? (
        <div className="container py-5 my-5">
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center">
              <img src="/assets/images/thankyou.jpg" alt="About Us" height="435px" width="500px" />
            </div>
            <div className="col-md-6">
              <h1 className="text-primary fw-bold mb-4"><strong>Order Confirmed: </strong>Your order has been confirmed. We're thrilled to start preparing your package!</h1>
              <p className="lead mb-4">
                <ul>
                  {showFirstStep && (
                    <li>
                      <span className="checkmark">✔️</span>We are preparing your package.
                    </li>
                  )}
                  {showSecondStep && (
                    <li>
                      <span className="checkmark">✔️</span>Your package is being transported to you.
                    </li>
                  )}
                  {showThirdStep && (
                    <li>
                      <span className="checkmark">✔️</span>We'll be at your place today! Our courier will get in touch with you.
                    </li>
                  )}
                  {showFourthStep && (
                    <li>
                      <span className="checkmark">✔️</span>Your order is finished. Thank you for your purchase!
                    </li>
                  )}
                </ul>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container py-5 my-5">
          <h1 className="text-primary fw-bold mb-4">There are no orders right now. Order to check details</h1>
        </div>
      )}
    </div>
  );
};

export default DelieveryDetails;