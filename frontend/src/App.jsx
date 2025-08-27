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

        if(response.status=== 200 && response.data.UserId){
          setUserInfo(response.data)
          
        }else{
          setUserInfo(undefined)
        }
      } catch (error) {
        setUserInfo(undefined)
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo])

  if (loading) {
    return <div>Loading...</div>;
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
