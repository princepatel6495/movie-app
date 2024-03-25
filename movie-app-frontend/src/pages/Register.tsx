import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const handleRegister = async (formData: any) => {
    try {
      const response = await registerUser(formData);
      navigate("/login");
      console.log("Registration successful:", response);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
