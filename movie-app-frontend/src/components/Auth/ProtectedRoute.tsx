import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("userData");

      if (token && userData) {
        try {
          const decodedToken: any = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp && decodedToken.exp < currentTime) {
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();

    const handleStorageChange = () => {
      checkAuthentication();
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup: Remove event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [
    localStorage.getItem("token"),
    localStorage.getItem("userData"),
    isAuthenticated,
  ]);

  if (!isAuthenticated) {
    // Redirect to the login page if the token or userData is missing or expired
    return <Navigate to="/login" replace />;
  }

  // Render children if the user is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
