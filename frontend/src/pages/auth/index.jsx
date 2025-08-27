import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api.client";
import { LOGIN_ROUTE, SIGN_UP_ROUTE } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import { useAppstore } from "@/store";

const Auth = () => {
    const {setUserInfo} = useAppstore()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")

    const navigate = useNavigate()
    const validateSignup = () => {
      if (!firstName.length) {
        toast.error("First Name is Required");
        return false;
      }
      if (!email.length) {
        toast.error("Email is Required");
        return false;
      }if (!password.length) {
        toast.error("Password is Required");
        return false;
      }if (password !== confirmPassword) {
        toast.error("Password and confirm password should be same");
        return false;
      }
      return true
      
    };

    const validateLogin=()=>{
      if(!email.length){
        toast.error("Email is required")
        return false
      }if (!password.length) {
        toast.error("Password is required");
        return false;

      }return true
    }

    const handleLogin =async()=>{
      if(validateLogin()){
        try {
                  const response = await apiClient.post(
                    LOGIN_ROUTE,
                    { email, password },
                    { withCredentials: true }
                  );
                  console.log(response)
                  toast.success("Login Successful")

            if(response.data.user._id){
              setUserInfo(response.data.user)
              if(response.data.user.profileSetup){
                navigate("/chat")
              }else{
                navigate("/profile")
              }
            }
            console.log("Login response:", response.data);

        } catch (error) {
          console.log(error)
        }
      }


    }

    const handleSignUp = async()=>{
        if(validateSignup())
        {
        try {
          const response = await apiClient.post(
            SIGN_UP_ROUTE,
            { email, password, firstName, lastName },{
              withCredentials:true
            }
          );
          console.log(response)
          toast.success("Signup Successfull")

          if (response.status === 201) {
             setUserInfo(response.data.user);

            navigate("/profile")
          }
        } catch (error) {
          console.error(error)
        }
        }
        

    }
    

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] shadow-2xl w-[80vw]  md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold">Welcome</h1>
            </div>
            <div className="font-medium text-center m-3">
              <p>Fill The details to get started</p>
            </div>
            <div className="flex items-center justify-center w-full">
              <Tabs className="w-3/4" defaultValue="login">
                <TabsList className="bg-transparent rounded-none w-full flex">
                  <TabsTrigger
                    value="login"
                    className=" data-[state=active]:bg-transparent text-black border-b-2 rounded-none flex-1 
                   data-[state=active]:text-black data-[state=active]:font-semibold 
                   data-[state=active]:border-b-purple-500 p-4 transition-all duration-300"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className=" data-[state=active]:bg-transparent text-black border-b-2 rounded-none flex-1 
                   data-[state=active]:text-black data-[state=active]:font-semibold 
                   data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="flex flex-col gap-5 mt-2">
                  <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-full p-5"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="rounded-full p-5"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button className="rounded-full p-5" onClick={handleLogin}>Login</Button>
                </TabsContent>
                <TabsContent
                  value="signup"
                  className="flex flex-col gap-5 mt-2"
                >
                  <div className="flex gap-4 contain xl:flex-col">
                    <Input
                      placeholder="First Name"
                      type="text"
                      className="rounded-full p-5"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                      placeholder="Last Name"
                      type="text"
                      className="rounded-full p-5"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-full p-5"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="rounded-full p-5"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    className="rounded-full p-5"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button className="rounded-full p-5" onClick={handleSignUp}>
                    Sign Up
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="justify-center items-center hidden xl:flex">
            <img src="{Background}" alt="background login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
