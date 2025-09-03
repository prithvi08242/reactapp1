import { useEffect, useState } from "react";
import Header from "../common/Header";
import axios from "axios";


function ViewCart() {

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [cartItems, setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8052/cart/${user.userId}`);
            setCartItems(response.data);
        } catch (err) {
            console.log("Failed to fetch Cart Items", err);
        }
    }

    const handleClick = () => {
        if (isLoggedIn) {
            window.location.href = '/products';
        } else {
            window.location.href = '/login';

        }
    }

    const getTotalPrice = () => {
        //console.log(cartItems.length)
        //if(cartItems.length!=0){
             return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        //}
    }

    const renderCartItem = (item) => {
        <div className="card mb-3" key={item.id}>
            <div className="row">
                <div className="col-3">
                    <img src={item.product.imageData} alt=""></img>
                    ${JSON.stringify(item)}
                </div>
                <div className="col-9">
                    <div className="card-body">
                        <h5>{item.product.name}</h5>
                    </div>
                </div>
            </div>
        </div>
    }

    const handleRemoveItem = async (productId) => {
        try {
            await axios.delete(`http://localhost:8052/cart/remove/${productId}?userId=${user.userId}`)
            fetchCartItems();
        }catch(err) {

        }
    }

    const handleQuantityChange = async (item,newQuantity) => {

        if(newQuantity<1) return ;

        const request = {
            userId: item.userId,
            productId : item.productId,
            quantity : newQuantity
        }

        try {
            const response  = await axios.put("http://localhost:8052/cart/update",request);
            //setCartItems(response.data);
            fetchCartItems();
        }catch(err) {
            console.log("Failed to update Quanity",err);
        }
    }

    const handlePlaceOrder = async () => {

        console.log("handlePlaceOrder");
        const request = {
            userId : user.userId
        };

        try {
            const response  = await axios.post("http://localhost:8053/orders",request);
            const orderId = response.data.orderId;

            if(!orderId) {
                alert("Failed to place the order,Please try again")
            }
            console.log("Order Placed ",response.data);
            window.location.href = `/orderSummary/${orderId}`
        }catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="container-fluid">
            <Header />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Cart Items</h3>
               
                {
                    cartItems.length !==0 && (
                     <h5>Total Price : {getTotalPrice()}</h5>
                    )
                }
            </div>

            {
                cartItems.length === 0 ? (
                    <div className="text-center mt-4">
                        <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt=""
                            style={{ width: '500px' }} />
                        <h4>Missing Cart Items</h4>
                        <p>Login to see the items you added previously</p>
                        <button className="btn btn-lg btn-success" onClick={handleClick}>
                            {isLoggedIn ? 'Shop Now': 'Login'}
                        </button>
                    </div>
                ) : (
                    <>
                        {cartItems.map(item => (
                            <div className="card mb-3" key={item.id}>
                                <div className="row">
                                    <div className="col-3 d-flex justify-content-center">
                                        <img src={item.product.imageData} alt=""
                                            className="img-fluid"
                                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}></img>
                                    </div>
                                    <div className="col-9">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.product.name}</h5>
                                            <p className="cart-text">
                                                {
                                                    item.product.description.length > 200 ? item.product.description.substring(0, 200) + "...." : item.description
                                                }
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6>Price : {item.product.price}</h6>
                                                    {/* // RenderQuantity Control */}
                                                    <div className="d-flex align-items-center">
                                                        <h6 className="me-2 ">Quantity:</h6>
                                                        <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleQuantityChange(item,item.quantity-1)}>
                                                            <i className="bi bi-dash-lg"></i>
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => handleQuantityChange(item,item.quantity+1)}>
                                                            <i className="bi bi-plus-lg"></i>
                                                        </button>
                                                    </div>
                                                    <h6>Total: {item.product.price * item.quantity}</h6>
                                                </div>
                                                <button className="btn btn-danger" onClick={() => handleRemoveItem(item.productId)}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="text-end">
                            <button className="btn btn-success btn-lg" onClick={handlePlaceOrder}>Place Order</button>
                        </div>

                    </>
                )
            }


        </div>
    )
}

export default ViewCart;