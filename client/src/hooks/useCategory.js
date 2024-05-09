
import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const backendUrl = "https://mern-app-e-commerce-app.onrender.com"; // Your Rendor backend URL
    //get cat
    const getCategories = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/v1/category/get-category`);
        setCategories(data?.category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  return categories;
}
