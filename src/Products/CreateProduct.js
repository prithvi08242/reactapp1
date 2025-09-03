import axios from "axios";
import Header from "../common/Header";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";

function CreateProduct() {

    const [name, setName] = useState('');
    const [description, Setdescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);

    const { id } = useParams();
    const isEditMode = Boolean(id);
    console.log(isEditMode);
    const  navigate = useNavigate();

    useEffect(() => {
        if (isEditMode) {
            getSingleProduct();
        }

    }, []);


    async function getSingleProduct() {
        try {

            const response = await axios.get(`http://localhost:8051/products/image/${id}`);
            const product = response.data;
            setName(product.name);
            Setdescription(product.description);
            setPrice(product.price);
            setStock(product.stock);
            console.log(product);
        } catch (err) {
            console.log("Failed to fetch product", err);
        }
    }


    async function handleSubmit() {

        if (isEditMode) {   
            await editProduct();
        } else {
            await addProduct();
        }

        async function addProduct() {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('stock', stock);
            formData.append('status', "ACTIVE");
            if (image) {
                formData.append('image', image);
            }

            try {
                await axios.post("http://localhost:8051/products/image", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                toast.success("Product Added Successfully");
                window.location = "/products";

            } catch (error) {
                toast.error("Failed to add Product");
                console.log(error);
            }
        }

        async function editProduct() {
            const productData = {
                name,
                description,
                price,
                stock,
                status: "ACTIVE"
            };
            try {
                await axios.put(`http://localhost:8051/products/image/${id}`, productData);
                toast.success("Product Updated Successfully");
                //navigate('/products');
                window.location = "/products";
            } catch (err) {
                console.log(err);
                toast.error("Failed to update product");
            }
        }
    }

    return (
        <div className="container-fluid">
            <Header />
            <div className="row justify-content-center">
                <div className="col-5 card shadow-lg rounded border-0 p-4 mt-3">
                    <h4 className="text-center text-success mb-4">
                        {isEditMode ? "Edit Product" : "Add New Product"}

                    </h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder="ProductName" value={name} onChange={(e) => setName(e.target.value)} required />
                            <label>Product Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea type="text" className="form-control" placeholder="Description" value={description} onChange={(e) => Setdescription(e.target.value)} required />
                            <label>Description</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                            <label>Price</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
                            <label>Stock</label>
                        </div>

                        {
                            !isEditMode && (

                                <div className=" mb-3">
                                    <label>Product Image</label>
                                    <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
                                </div>
                            )
                        }

                        <div className="d-grid">
                            <button type="submit" className="btn btn-success rounded-pill py-2">

                                {isEditMode ? "Update Product" : "Add Product"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    )
}

export default CreateProduct;