import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import { Provider } from 'react-redux';


const cartItemsFromStorage = localStorage.getItem('cartItems');
const initialState = {
  addItem: {
    cartItems: cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [],
    // ... other initial state values
  },
  // ... other initial state values
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();