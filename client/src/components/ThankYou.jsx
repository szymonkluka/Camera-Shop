import React, { useEffect } from 'react';

const ThankYou = () => {
  const [orderData, setOrderData] = React.useState(null);

  useEffect(() => {
    const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
    setOrderData(storedOrderData);
    localStorage.removeItem('orderData');
  }, []);

  return (
    <div>
      <div className="container py-5 my-3">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <h1 className="text-primary fw-bold mb-4">Thank you for your order!</h1>
          </div>
          <div className="col-md-12 d-flex justify-content-center">
            <img src="/assets/images/thankyou.jpg" alt="About Us" height="350px" width="500px" />
          </div>
          <div>
            <div className="order-details justify-content-center" style={{ marginTop: "20px", marginLeft: "400px" }}>
              <div className="order-details row">
                <div className="col-md-6 order-item row" style={{ marginRight: '-210px', paddingRight: '5px' }}>
                  <p><strong>First Name:</strong> {orderData?.firstName}</p>
                </div>
                <div className="col-md-6 order-item row" style={{ marginRight: '-210px', paddingRight: '5px' }}>
                  <p><strong>Last Name:</strong> {orderData?.lastName}</p>
                </div>
              </div>
            </div>
            <div className="order-details justify-content-center" style={{ marginTop: "20px", marginLeft: "400px" }}>
              <div className="order-details row">
                <div className="col-md-6 order-item row" style={{ marginRight: '-210px', paddingRight: '5px' }}>
                  <p><strong>ZIP Code:</strong> {orderData?.zip}</p>
                </div>
                <div className="col-md-6 order-item row" style={{ marginRight: '-210px', paddingRight: '5px' }}>
                  <p><strong>Country:</strong> {orderData?.country}</p>
                </div>
              </div>
            </div>
            <div className="order-details justify-content-center" style={{ marginTop: "20px", marginLeft: "400px" }}>
              <div className="order-details row">
                <div className="col-md-6 order-item row" style={{ marginRight: '-210px', paddingRight: '5px' }}>
                  <p><strong>Street</strong> {orderData?.street}</p>
                </div>
                <div className="col-md-6 order-item row" style={{ marginRight: '-210px', paddingRight: '5px' }}>
                  <p><strong>Apartment Number:</strong> {orderData?.apartmentNumber}</p>
                </div>
              </div>
            </div>
            <div className="order-details justify-content-center" style={{ marginTop: "20px", marginLeft: "400px" }}>
              <div className="order-details row">
                <div className="col-md-6 order-item row" style={{ marginRight: '-210px', paddingRight: '5px' }}>
                  <p><strong>Payment Type</strong> {orderData?.paymentType}</p>
                </div>
                <div className="col-md-6 order-item row" style={{ marginRight: '-210px', paddingRight: '5px' }}>
                  <p><strong>Cardholder's Name:</strong> {orderData?.cardName}</p>
                </div>
              </div>
            </div>
            <div className="order-details justify-content-center" style={{ marginTop: "20px", marginLeft: "400px" }}>
              <div className="order-details row">
                <div className="col-md-6 order-item row" style={{ marginRight: '-210px', paddingRight: '5px' }}>
                  <p><strong>Card Number</strong> {orderData?.cardNumber}</p>
                </div>
                <div className="col-md-6 order-item row" style={{ marginRight: '-210px', paddingRight: '5px' }}>
                  <p><strong>Card Expiration:</strong> {orderData?.cardExpiration}</p>
                </div>
              </div>
            </div>
            <div className="order-details justify-content-center" style={{ marginTop: "20px", marginLeft: "400px" }}>
              <div className="order-details row">
                <div className="col-md-6 order-item row" style={{ marginRight: '-210px', paddingRight: '5px' }}>
                  <p><strong>Card CVV</strong> {orderData?.cardCVV}</p>
                </div>
                <div className="col-md-6 order-item row" style={{ marginRight: '-210px', paddingRight: '5px' }}>
                  <p><strong>Telephone number:</strong> {orderData?.telephone}</p>
                </div>
              </div>
            </div>
            <div className="order-details justify-content-center" style={{ marginTop: "20px", marginLeft: "400px" }}>
              <div className="order-details row">
                <div className="col-md-6 order-item row" style={{ marginRight: '-210px', paddingRight: '5px' }}>
                  <p><strong>Description:</strong> {orderData?.description}</p>
                </div>
                <div className="col-md-6 order-item row" style={{ marginRight: '-210px', paddingRight: '5px' }}>
                  <p><strong>Comment:</strong> {orderData?.comment}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

