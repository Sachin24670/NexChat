import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleLogin =async()=>{

    }

    const handleSignUp = async()=>{
        
    }

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] shadow-2xl w-[80vw]  md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-col-2">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold">Welcome</h1>
            </div>
            <div className="font-medium text-center m-3">
              <p>Fill The details to get started</p>
            </div>
            <div className="flex items-center justify-center w-full">
              <Tabs className="w-3/4">
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
                  <Button className="rounded-full p-5">Login</Button>
                </TabsContent>
                <TabsContent
                  value="signup"
                  className="flex flex-col gap-5 mt-2"
                >
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
                  <Button className="rounded-full p-5">Sign Up</Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="justify-center items-center hidden xl:flex">
            <img src="{Background}" alt="background login"  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
