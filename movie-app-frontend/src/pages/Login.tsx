import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import { loginUser } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = async (formData: any) => {
    try {
      const response = await loginUser(formData);
      const { token, userData } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/home", { replace: true });
      toast.success("Login successful");
    } catch (error: any) {
      console.error("Login failed:", error);
      // Display error toast
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
