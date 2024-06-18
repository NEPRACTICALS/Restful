/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

const protectedRoutes = ["/book"];

export const AuthProvider = (props) => {
  // Fix children props destructuring
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // check if the token is available if not first login 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && protectedRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [location.pathname]);

  // function to login  the user which takes email & password and if logged in successfully token is set in headers 

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("response: " + response.data.token);

      if (response.data.token) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        // Set the token in the headers
        axios.defaults.headers.common[
          "Authorization"
        ] = ` ${response.data.token}`;

        localStorage.setItem("token", response.data.token);
        // Navigate to the employee component after successful login
        toast.success("Logged in successfully");
        navigate("/book");
      }
    } catch (error) {
      toast.error("error occurred while logging in ");
    }
  };

  // function to sign up user with firstName, lastName ,email,Password 
  

  const signup = async (firstName , lastName ,email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/user/create",
        { firstName ,lastName ,email, password }
      );
      console.log(response.data);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Error creating account");
    }
  };


  // logout function whick also removed the token 
  
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, signup }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};
