

// provider for data 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppProvider = ( children ) => {
  // Fix children props destructuring
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default AppProvider;
