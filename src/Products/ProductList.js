import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../common/Header";
import { Link } from "react-router-dom";

function ProductList() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);


    async function fetchProducts() {
        try {
            const response = await axios.get('http://localhost:8051/products/image');
            setProducts(response.data);
            console.log(response.data);
        } catch (err) {
            console.log("Error fetching Products", err);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-12">
                    <Header />
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    Filters
                </div>

                <div className="col-9">
                    <div className="row">
                        {products.length > 0 ? (

                            products.map((product, index) => (
                                <div className="col-4 mb-4" key={index}>

                                    <Link to={`/viewProduct/${product.id}`} className="text-decoration-none">
                                    <div className="card h-100">
                                        {
                                            product.imageData && (
                                                <img src={product.imageData} alt="" className="card-img-top" style={{ height: "200px", objectFit: "cover" }}></img>
                                            )
                                        }
                                          <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">

                                            {

                                                product.description.length > 200 ? product.description.substring(0, 200) + "...." : product.description

                                            }
                                        </p>
                                        <p className="card-text fw-bold"><strong>{product.price}</strong></p>
                                        <p className="card-text">Stock: {product.stock}</p>
                                    </div>
                                    </div>
                                    </Link>
                                  
                                </div>
                            ))

                        ) : (
                            <div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList;