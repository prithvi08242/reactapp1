import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../common/Header";
import { toast } from "react-toastify";

function ViewProduct() {

    const [productId, setProductId] = useState(useParams().id);
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
  
    useEffect(() => {
        getSingleProduct();
    }, []);


    async function handleAddToCart() {

        if(!user) {
            navigate("/login");
            return ;
        }
        const request = {
            userId : user.userId,
            productId : product.id,
            quantity :  1
        }

        try {
            const response = await axios.post("http://localhost:8052/cart/add",request);
            window.location = "/viewCart";
        }catch(err) {
            console.log(err);
            toast.error("Failed to add item to cart");
        }
    }

    async function getSingleProduct() {
        try {

            const response = await axios.get(`http://localhost:8051/products/image/${productId}`);
            setProduct(response.data);
        } catch (err) {
            console.log("Failed to fetch product", err);
        }
    }

    const handleEditProduct = () => {
        navigate(`/edit-product/${productId}`);
    };

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-12">
                    <Header />
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6 border">
                                <img src={product.imageData} alt="" className="img-fluid" />
                            </div>
                            <div className="col-6 border">
                                <h3>{product.name}</h3>
                                <div className="display-5 mt-3">
                                    <i className="bi bi-currency-rupee"></i>{product.price}
                                </div>
                                <h5 className="mt-4">{product.description}</h5>

                                <button className="btn btn-success btn-lg w-100 mt-4" onClick={handleAddToCart}>Add to Cart </button>


                                {
                                    user && user?.credential?.roleBasedAuthority === "ROLE_ADMIN" && (
                                        <button onClick={handleEditProduct} className="btn btn-warning btn-lg w-100 mt-4">Edit Product </button>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default ViewProduct;