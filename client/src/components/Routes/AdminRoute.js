

import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  const backendUrl = "https://mern-app-e-commerce-app.onrender.com"; // Your Rendor backend URL

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/v1/auth/admin-auth`, {
          headers: {
            Authorization: `Bearer ${auth.token}` // Assuming you're passing JWT token for authentication
          }
        });
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
