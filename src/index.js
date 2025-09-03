import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Boot1 from './Boot1';
import BoostrapEx1 from './BoostrapExamples/BoostrapEx1';
import BoostrapEx2 from './BoostrapExamples/BoostrapEx2';
import BootstrapEx3_Registration from './BoostrapExamples/BootstrapEx3_Registration';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ViewCart from './Cart/ViewCart';
import CreateProduct from './Products/CreateProduct';
import ProductList from './Products/ProductList';
import ViewProduct from './Products/ViewProduct';
import UserList from './Users/UserList';
import ChangePassword from './Users/ChangePassword';
import OrderSummary from './Order/OrderSummary';
import MyProfile from './Auth/MyProfile';
import Payment from './Payment/Payment';
import OrderList from './Order/OrderList';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/cart" element={<ViewCart />}></Route>
        <Route path="/addProduct" element={<CreateProduct />}></Route>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/viewProduct/:id" element={<ViewProduct />}></Route>
        <Route path="/edit-product/:id" element={<CreateProduct />}></Route>
        <Route path="/viewCart" element={<ViewCart />}></Route>
        <Route path="/users" element={<UserList />}></Route>
        <Route path="/changePassword" element={<ChangePassword />}></Route>
        <Route path="/orderSummary/:orderId" element={<OrderSummary />}></Route>
        <Route path="/profile" element={<MyProfile />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
         <Route path="/ordersList" element={<OrderList />}></Route>
      </Routes>

    </BrowserRouter>


 // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
