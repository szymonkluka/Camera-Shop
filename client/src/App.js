import './App.css';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import SignUp from './components/SignUp';
import Checkout from './components/Checkout';
import ThankYou from './components/ThankYou';
import ThankYouRegister from './components/ThankYouRegister';
import DelieveryDetails from './components/DelieveryDetails';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Product} />
        <Route exact path="/products/:id" component={ProductDetail} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/about" component={About} />
        <Route exact path="/thankyou" component={ThankYou} />
        <Route exact path="/thankyouregister" component={ThankYouRegister} />
        <Route exact path="/delieverydetails" component={DelieveryDetails} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;