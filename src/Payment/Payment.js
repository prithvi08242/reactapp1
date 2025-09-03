import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const razorpayKey = "rzp_test_l1o6qKkq2Arljp"; // Replace with your actual key
  // Destructure payment details from state
  const { name, email, amount, orderId, phone } = location.state || {};

  // 🚀 Automatically initiate payment
  useEffect(() => {
      if (orderId && amount) {
        startPayment();
      } else {
        navigate("/cart");
      }
  }, []);

  const handlePaymentSuccess = async (response) => { 

    try {
      await axios.post("http://localhost:8080/payment_success",null,{
        params: {
          razorpay_payment_id : response.razorpay_payment_id,
          razorpay_order_id : response.razorpay_order_id,
          amount : parseInt(amount)
        }
      })


      await axios.delete(`http://localhost:8052/cart/clear/${user.userId}`);
      await axios.put(`http://localhost:8053/orders/${orderId}/status/CONFIRMED`);

      navigate("/ordersList");
    }catch(err){
      console.log(err);
    }
  };
    

   const startPayment = async () => {

      try {
      
        const response = await axios.post("http://localhost:8080/create_order", {
          name,
          email,
          amount: parseInt(amount),
          orderId: parseInt(orderId),
        });

        const orderData = response.data;

        const options = {
          key: razorpayKey,
          amount: orderData.amount,
          currency: "INR",
          name: name,
          description: "E-Commerce Payment",
          order_id: orderData.id,
          handler: handlePaymentSuccess,
          prefill: {
            name,
            email,
            contact: phone
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment error:", error);
        alert("Payment initialization failed.");
      }
    };

  return (
    <div className="container text-center">
      <h4>Redirecting to Payment Gateway</h4>
      <p>Please wait. Do not refresh the page</p>
    </div>
  );
};

export default Payment;
