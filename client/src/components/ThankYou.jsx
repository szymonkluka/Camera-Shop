import React, { useEffect } from 'react';
import "./ThankYou.css"
const ThankYou = () => {
  const [orderData, setOrderData] = React.useState(null);

  useEffect(() => {
    const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
    setOrderData(storedOrderData);
  }, []);

  const renderOrderDetails = (label, value) => (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );

  const renderTotalPrice = () => renderOrderDetails('Total Price:', `$${orderData?.totalPrice}`);

  return (
    <div>
      <div className="container py-5 my-3">
        <div className="column">
          <div className="col-md-12 d-flex justify-content-center">
            <h1 className="text-primary fw-bold mb-4">Thank you for your order!</h1>
          </div>
          <div className="d-flex justify-content-center" style={{ marginBottom: '40px' }}>
            <img src="/assets/images/thankyou.jpg" alt="About Us" height="350px" width="500px" style={{ borderRadius: '32px', boxShadow: '10px 10px 10px -5px rgba(0, 0, 0, 0.3)' }} />
          </div>
          <table>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
            {renderTotalPrice()}
            {renderOrderDetails('First Name:', orderData?.firstName)}
            {renderOrderDetails('Last Name:', orderData?.lastName)}
            {renderOrderDetails('ZIP Code:', orderData?.zip)}
            {renderOrderDetails('Country:', orderData?.country)}
            {renderOrderDetails('Street:', orderData?.street)}
            {renderOrderDetails('Apartment Number:', orderData?.apartmentNumber)}
            {renderOrderDetails('Payment Type:', orderData?.paymentType)}
            {renderOrderDetails("Cardholder's Name:", orderData?.cardName)}
            {renderOrderDetails('Card Number:', orderData?.cardNumber)}
            {renderOrderDetails('Card Expiration:', orderData?.cardExpiration)}
            {renderOrderDetails('Card CVV:', orderData?.cardCVV)}
            {renderOrderDetails('Telephone number:', orderData?.telephone)}
            {renderOrderDetails('Description:', orderData?.description)}
            {renderOrderDetails('Comment:', orderData?.comment)}
            {renderOrderDetails('Email:', orderData?.email)}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

