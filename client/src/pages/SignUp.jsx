import Link from "next/link";
import Image from 'next/image';
import Header from '../components/Header'

import { useRouter } from 'next/navigation'
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';


import { AiFillGoogleCircle } from 'react-icons/ai';
import { FaFacebookSquare, FaGithubSquare } from 'react-icons/fa';

const SignUpPage = () => {

  const [email_address, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();


  const handleSignup = async (e) => {
    e.preventDefault();

    // Perform client-side validation
    if (!email_address || !password || !username) {
      alert('Please check your email and password again ');
      return;
    }

    try {
      const response = await axios.post('/users/create', { email_address, password,username }, {
        headers: {
          "Content-Type": 'application/json'
        }
      });

      console.log(response)

      if (response.status === 201) {
          router.push('/LogIn');
      } else {
        throw new Error('Sign Up failed');
      }
    } catch (error) {
      router.push('/SignUp');
      // Need to be FIXED #############################################################
      // if (error.response) {
      //   // Error response received from the server
      //   setError(error.response.data.error);
      // // } else {
      // //   // Error without a response (e.g., network error)
      // //   setError('An error occurred. Please try again later.');
      // }
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#050816] to-[#100D25]">
    <Header/>
    <section>
      <div className="flex justify-center items-center h-screen gap-10 ">
        <div className="animate-slideRight shadow-card">
          <form  
            onSubmit={handleSignup}
            className="flex flex-col items-center p-6 border border-gray-300 rounded-lg shadow-lg w-120 h-120 bg-black-100  w-96 h-150"
          >
            <h2 className="text-[24px] font-bold mb-6">Sign Up</h2>
            <input className="rounded-lg border border-gray-300 focus:outline-none focus:border-gray-300 p-3 w-full mb-4 bg-tertiary placeholder:text-secondary" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input className="rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400 p-3 w-full mb-4 bg-tertiary placeholder:text-secondary" type="email" placeholder="Email" value={email_address} onChange={(e) => setEmail(e.target.value)} />
            <input className="rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400 p-3 w-full mb-4 bg-tertiary placeholder:text-secondary" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className="rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400 p-3 w-full mb-4 bg-tertiary placeholder:text-secondary" type="password" placeholder="Confirm Password" />
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
