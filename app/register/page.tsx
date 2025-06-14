"use client"
import React from 'react' 
import { useState } from 'react'
import axios from 'axios'

const BaseUrl = "http://localhost:3000"
const page = () => {

    const[username,setUsername] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    const handleSubmit = async(e:any) =>{
        e.preventDefault();
        const formData = {username,password};
        console.log("form data",formData);
        try{

            const response = await axios.post(`${BaseUrl}/api/user}`,formData);

        }
        catch(error){

        }

    }

  return (
    <div className='min-h-screen flex items-center justify-center p-4  bg-gray-200 '>

        <div className=' w-full max-w-md bg-white rounded-2xl shadow-md p-6 space-y-6 '>
        
                <h1 className='text-xl items-center text-center text-blue-950'>Signup a new account</h1>
         
            <form onSubmit={handleSubmit} >
             
             <div className=''>
               <label className='block text-sm  text-gray-700' htmlFor="">Username</label>
                 <input
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter your username"
              className="mt-1 block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
             </div>
     <div>
            <label className=" mt-2 block text-sm font-medium text-gray-700">Email</label>
            <input
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className=" mt-2  block text-sm font-medium text-gray-700">Password</label>
            <input
            value= {password}
            onChange = {(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
              <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
          >
            Register
          </button>
            </form>
              <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <span className="text-blue-600 hover:underline cursor-pointer">Login</span>
        </p>
        </div>
      
    </div>
  )
}

export default page
