import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [backendUrl, setBackendUrl] = useState("");

  useEffect(() => {
    setBackendUrl("https://mern-app-e-commerce-app.onrender.com"); // Your Rendor backend URL

    const getSingleProduct = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/v1/product/get-product/${params.slug}`);
        setName(data.product.name);
        setId(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        setCategory(data.product.category._id);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Something went wrong");
      }
    };
    getSingleProduct();
  }, [params.slug]);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/v1/category/get-category`);
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Something went wrong in getting categories");
      }
    };
    getAllCategory();
  }, [backendUrl]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(`${backendUrl}/api/v1/product/update-product/${id}`, productData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;
      const { data } = await axios.delete(`${backendUrl}/api/v1/product/delete-product/${id}`);
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              {/* Your form components */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
