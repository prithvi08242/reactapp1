import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../common/Header";


function OrderList() {

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        try {
           const response  =  await axios.get(`http://localhost:8053/orders/user/${user.userId}`);
           setOrders(response.data);
        }catch(err) {
            console.log("Failed to fetch Orders", err);
        }
    }

    return (
        <div className="container-fluide">
            <Header />
            <h3>My Orders</h3>
            {
                orders.length === 0 ? (
                    <div className="alert alert-info">You have not placed any orders yet</div>
                ) : (
                    <div className="row">
                        {orders.map(order => (
                            <div className="col-4 mb-4" key={order.orderId}>
                                <div className="card">
                                    <div className="card-body"> 
                                        <h5 className="card-title">Order #{order.orderId}</h5>
                                        <p className="card-text mb-1">
                                            <strong>Placed:</strong> {new Date(order.placedAt).toLocaleString()}
                                        </p>
                                        <p className="card-text mb-1">
                                            <strong>Status:</strong> {""}
                                             <span className={`badge ${order.status === 'PLACED' ? 'bg-success': 'bg-dark'}`}>{order.status}</span>
                                        </p>
                                        <p className="card-text mb-2">
                                            <strong>Total:</strong> {order.totalPrice}
                                        </p>

                                        {
                                            order.items && order.items.length > 0 && (
                                                <div className="d-flex align-items-center gap-2"> 
                                                    <img src={order.items[0].product.imageData} alt="" style={{width: "60px",height: "60px",objectFit: "cover"}}></img>
                                                    <div>
                                                        <div className="small">{order.items[0].product.name}</div>
                                                        <div className="text-muted small">
                                                            + {order.items.length -1} more items
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        <div className="text-end mt-3">
                                            <button className="btn btn-sm btn-success"
                                                onClick={() => window.location.href = `/orderSummary/${order.orderId}`}>
                                                View Details
                                            </button>

                                        </div>


                                        
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
}
export default OrderList;