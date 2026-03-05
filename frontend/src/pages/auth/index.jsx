import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api.client";
import { LOGIN_ROUTE, SIGN_UP_ROUTE } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import { useAppstore } from "@/store";

const Auth = () => {
  const { setUserInfo } = useAppstore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const validateSignup = () => {
    if (!firstName.length) {
      toast.error("First Name is Required");
      return false;
    }
    if (!email.length) {
      toast.error("Email is Required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is Required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same");
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (isSubmitting) return;
    if (validateLogin()) {
      setIsSubmitting(true);
      try {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        toast.success("Login Successful");

        if (response.data.user._id) {
          setUserInfo(response.data.user);
          if (response.data.user.profileSetup) {
            navigate("/chat");
          } else {
            navigate("/profile");
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Login failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSignUp = async () => {
    if (isSubmitting) return;
    if (validateSignup()) {
      setIsSubmitting(true);
      try {
        const response = await apiClient.post(
          SIGN_UP_ROUTE,
          { email, password, firstName, lastName },
          {
            withCredentials: true,
          }
        );
        toast.success("Signup Successful");

        if (response.status === 201) {
          setUserInfo(response.data.user);
          navigate("/profile");
        }
      } catch (error) {
        console.error(error);
        toast.error("Signup failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0d14] p-4 sm:p-6">
      <div className="w-full max-w-[900px] shadow-2xl rounded-2xl grid xl:grid-cols-2 bg-[#141726] border border-[#1e2240]">
        <div className="flex flex-col items-center justify-center gap-8 p-6 sm:p-10">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center justify-center gap-3 mb-2">
              <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 20C20 12.268 26.268 6 34 6H66C73.732 6 80 12.268 80 20V58C80 65.732 73.732 72 66 72H50L35 88L36 72H34C26.268 72 20 65.732 20 58V20Z"
                  fill="url(#authGrad)"
                />
                <circle cx="40" cy="45" r="4" fill="white" />
                <circle cx="50" cy="45" r="4" fill="white" />
                <circle cx="60" cy="45" r="4" fill="white" />
                <defs>
                  <linearGradient id="authGrad" x1="20" y1="6" x2="80" y2="88" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#818cf8" />
                    <stop offset="1" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-100">Welcome</h1>
            </div>
            <div className="font-medium text-center mt-1">
              <p className="text-gray-400 text-sm">Fill in the details to get started</p>
            </div>
            <div className="flex items-center justify-center w-full mt-6">
              <Tabs className="w-full sm:w-3/4" defaultValue="login">
                <TabsList className="bg-transparent rounded-none w-full flex border-b border-[#1e2240]">
                  <TabsTrigger
                    value="login"
                    className="text-gray-500 border-b-2 border-b-transparent rounded-none flex-1 
                   data-[state=active]:text-[#818cf8] data-[state=active]:font-semibold 
                   data-[state=active]:border-b-[#818cf8] p-4 transition-all duration-300"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="text-gray-500 border-b-2 border-b-transparent rounded-none flex-1 
                   data-[state=active]:text-[#818cf8] data-[state=active]:font-semibold 
                   data-[state=active]:border-b-[#818cf8] p-3 transition-all duration-300"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="flex flex-col gap-4 mt-4">
                  <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-full p-5 bg-[#1a1d2e] border-[#262a40] text-gray-100 placeholder:text-gray-500 focus:border-[#818cf8]"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="rounded-full p-5 bg-[#1a1d2e] border-[#262a40] text-gray-100 placeholder:text-gray-500 focus:border-[#818cf8]"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    className="rounded-full p-5 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleLogin}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Logging in...
                      </span>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </TabsContent>
                <TabsContent
                  value="signup"
                  className="flex flex-col gap-4 mt-4"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      placeholder="First Name"
                      type="text"
                      className="rounded-full p-5 bg-[#1a1d2e] border-[#262a40] text-gray-100 placeholder:text-gray-500 focus:border-[#818cf8]"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                      placeholder="Last Name"
                      type="text"
                      className="rounded-full p-5 bg-[#1a1d2e] border-[#262a40] text-gray-100 placeholder:text-gray-500 focus:border-[#818cf8]"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-full p-5 bg-[#1a1d2e] border-[#262a40] text-gray-100 placeholder:text-gray-500 focus:border-[#818cf8]"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="rounded-full p-5 bg-[#1a1d2e] border-[#262a40] text-gray-100 placeholder:text-gray-500 focus:border-[#818cf8]"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    className="rounded-full p-5 bg-[#1a1d2e] border-[#262a40] text-gray-100 placeholder:text-gray-500 focus:border-[#818cf8]"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    className="rounded-full p-5 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSignUp}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Signing up...
                      </span>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="justify-center items-center hidden xl:flex p-6">
          <img
            src="../../assets/Background.png"
            alt="background login"
            className="rounded-2xl max-h-[500px] object-cover opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
