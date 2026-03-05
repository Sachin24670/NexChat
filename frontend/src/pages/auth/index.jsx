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
import { MessageCircle } from "lucide-react";

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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#09090b] p-4 sm:p-6">
      <div className="w-full max-w-[900px] rounded-2xl grid md:grid-cols-2 bg-[#13131a] border border-[#2a2a3a] shadow-[0_0_60px_rgba(124,58,237,0.1)]">
        <div className="flex flex-col items-center justify-center gap-8 p-6 sm:p-10">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#7c3aed] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-100">Welcome</h1>
            </div>
            <div className="font-medium text-center mt-1">
              <p className="text-gray-500 text-sm">Fill in the details to get started</p>
            </div>
            <div className="flex items-center justify-center w-full mt-6">
              <Tabs className="w-full sm:w-3/4" defaultValue="login">
                <TabsList className="bg-transparent rounded-none w-full flex border-b border-[#2a2a3a]">
                  <TabsTrigger
                    value="login"
                    className="text-gray-500 border-b-2 border-b-transparent rounded-none flex-1
                   data-[state=active]:text-[#a78bfa] data-[state=active]:font-semibold
                   data-[state=active]:border-b-[#a78bfa] p-4 transition-all duration-300"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="text-gray-500 border-b-2 border-b-transparent rounded-none flex-1
                   data-[state=active]:text-[#a78bfa] data-[state=active]:font-semibold
                   data-[state=active]:border-b-[#a78bfa] p-3 transition-all duration-300"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="flex flex-col gap-4 mt-4">
                  <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-full p-5 bg-[#1a1a24] border-[#2a2a3a] text-gray-100 placeholder:text-gray-500 focus:border-[#a78bfa]"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="rounded-full p-5 bg-[#1a1a24] border-[#2a2a3a] text-gray-100 placeholder:text-gray-500 focus:border-[#a78bfa]"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    className="rounded-full p-5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="rounded-full p-5 bg-[#1a1a24] border-[#2a2a3a] text-gray-100 placeholder:text-gray-500 focus:border-[#a78bfa]"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                      placeholder="Last Name"
                      type="text"
                      className="rounded-full p-5 bg-[#1a1a24] border-[#2a2a3a] text-gray-100 placeholder:text-gray-500 focus:border-[#a78bfa]"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-full p-5 bg-[#1a1a24] border-[#2a2a3a] text-gray-100 placeholder:text-gray-500 focus:border-[#a78bfa]"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="rounded-full p-5 bg-[#1a1a24] border-[#2a2a3a] text-gray-100 placeholder:text-gray-500 focus:border-[#a78bfa]"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    className="rounded-full p-5 bg-[#1a1a24] border-[#2a2a3a] text-gray-100 placeholder:text-gray-500 focus:border-[#a78bfa]"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    className="rounded-full p-5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="justify-center items-center hidden md:flex p-6">
          <img
            src="/assets/Background.png"
            alt="background login"
            className="rounded-2xl max-h-[500px] object-cover opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
