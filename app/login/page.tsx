"use client"
import axios from 'axios'
import React from "react";
import Link from "next/link";
import toast from 'react-hot-toast';
import { useState } from "react";


const BaseUrl= "http://localhost:3000"
const page = () => {
const [email,setEmail] = useState("");
  const[password,setPassword] = useState("");

  const handleLogin = async(e:any) =>{
    e.preventDefault();
    const formData = {email,password}
    try{
      const response = await axios.post(`${BaseUrl}/api/login`,formData);
      toast.success("login sucessfully");
      setEmail("");
      setPassword("");
      
    }
    catch(error:any){
      console.log("error login",error.message);

    }

  }
   
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-500">
      <div className="w-full shadow-md p-6 max-w-md bg-white space-y-6 rounded-2xl ">
        <h1 className="text-xl text-blue-700 text-center">Please Login to continue</h1>
        <form onSubmit={handleLogin}
          action="
        
        "
        >
          <div>
            <label htmlFor="" className="block text-sm text-gray-800">
              Email:
            </label>
            <input
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
              type="text"
              className="mt-2 block border border-gray-300 rounded-xl w-full px-2 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="enter yor email"
            />
          </div>
          <div>
            <label htmlFor="" className="block text-sm text-gray-800">
              Password:
            </label>
            <input
            value={password}
             onChange={(e) =>setPassword(e.target.value)}
              type="text"
              className="block mt-2 w-full px-2 py-2 text-gray-800 "
              placeholder="enter yor password"
            />
          </div>
          <div>
            <button type="submit" className="bg-blue-800 w-full mt-2 p-2 rounde-2xl">
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-gray-700">Didnt have an account?
       <Link href="/register">

          <span className="text-purple-900">Signup</span>
       </Link>
          </p>
       
      </div>
    </div>
  );
};

export default page;
