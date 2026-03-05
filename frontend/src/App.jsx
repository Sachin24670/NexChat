import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./pages/auth";
import React, { useEffect, useState } from "react";
import Profile from "./pages/profile";
import Chat from "./pages/chat";
import { useAppstore } from "./store";
import { apiClient } from "./lib/api.client";
import { GET_USER_INFO } from "./lib/constants";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppstore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppstore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

function App() {
  const { userInfo, setUserInfo } = useAppstore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data._id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) {
    return (
      <div className="loading-overlay">
        <svg
          width="64"
          height="64"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginBottom: "24px", animation: "pulse-glow 2s ease-in-out infinite" }}
        >
          <path
            d="M20 20C20 12.268 26.268 6 34 6H66C73.732 6 80 12.268 80 20V58C80 65.732 73.732 72 66 72H50L35 88L36 72H34C26.268 72 20 65.732 20 58V20Z"
            fill="url(#loadGrad)"
          />
          <circle cx="40" cy="45" r="4" fill="white" />
          <circle cx="50" cy="45" r="4" fill="white" />
          <circle cx="60" cy="45" r="4" fill="white" />
          <defs>
            <linearGradient id="loadGrad" x1="20" y1="6" x2="80" y2="88" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a78bfa" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
        <div className="loading-spinner" style={{ marginBottom: "20px" }}></div>
        <p style={{ color: "#94a3b8", fontSize: "15px", fontWeight: 500, letterSpacing: "0.5px" }}>
          Please Wait Connecting to The Server
        </p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


