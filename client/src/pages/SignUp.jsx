import Link from "next/link";
import React, { useState } from 'react';

import Header from '../components/Header'


import Image from 'next/image';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { FaFacebookSquare, FaGithubSquare } from 'react-icons/fa';

const SignUpPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the signup endpoint of your backend API
      const response = await axios.post('/api/signup', { email, password });

      // Handle successful signup
      console.log(response.data); // Replace with your own logic
    } catch (error) {
      // Handle signup error
      console.log(error); // Replace with your own logic
    }
  };

  return (
  <div className="bg-gradient-to-r from-[#14293d55] to-[#3e94a0]">
    <Header/>
    <section>
      <div className="flex justify-center items-center h-screen gap-10 ">
        <div className="animate-slideRight shadow-card">
          <form  
            onSubmit={handleSignup}
            className="flex flex-col items-center p-6 border border-gray-300 rounded-lg shadow-lg w-96 h-150"
          >
            <h2 className="text-[24px] font-bold mb-6">Sign Up</h2>
            <input className="rounded-lg border-gray-300 focus:outline-none focus:border-gray-400 p-3 w-full mb-4" type="text" placeholder="Username" />
            <input className="rounded-lg border-gray-300 focus:outline-none focus:border-gray-400 p-3 w-full mb-4" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="rounded-lg border-gray-300 focus:outline-none focus:border-gray-400 p-3 w-full mb-4" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className="rounded-lg border-gray-300 focus:outline-none focus:border-gray-400 p-3 w-full mb-4" type="password" placeholder="Confirm Password" />
            <button
              className="p-3 m-2 rounded-lg border border-gray-300 shadow-md w-32 hover:bg-[#0e9c7d]" 
              type="submit"       
            >
              
                Sign Up
              </button>
            <h6 className="text-[13px] mb-4">or sign up with</h6>
            <div className="flex justify-between w-full">
              <button className="flex items-center justify-center rounded-lg border-gray-300 bg-red-600 hover:bg-red-700 hover:text-white focus:outline-none focus:border-red-400 p-3 w-full h-10 mr-2" type="button">
                <span className="mr-2"><AiFillGoogleCircle /></span>
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center rounded-lg border-gray-300 bg-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none focus:border-blue-400 p-3 w-full h-10 mr-2" type="button">
                <span className="mr-2"><FaFacebookSquare /></span>
                <span>Facebook</span>
              </button>
              <button className="flex items-center justify-center rounded-lg border-gray-300 bg-gray-700 hover:bg-gray-800 hover:text-white focus:outline-none focus:border-gray-400 p-3 w-full h-10" type="button">
                <span className="mr-2"><FaGithubSquare /></span>
                <span>Github</span>
              </button>
            </div>
          </form>
        </div>
        <div className="hidden md:block ml-8 w-1/2 animate-slideLeft">
          <Image src="/signup.png" alt="Sign Up" width={500} height={800} objectFit="cover" />
        </div>
      </div>
    </section>
  </div>  
  );
};

export default SignUpPage;
