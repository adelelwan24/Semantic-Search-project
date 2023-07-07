import React, { useState } from 'react';
import axios from './api/axios';
import Cookies from 'js-cookie';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { FaFacebookSquare, FaGithubSquare } from 'react-icons/fa';
import { useRouter } from 'next/navigation'

import Header from '../components/Header';
import { styles } from "../styles/style";

const LoginPage = () => {

  const router = useRouter();
  const [email_address, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform client-side validation
    if (!email_address || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('/users/login', { email_address, password } , {
        headers: {
          "Content-Type": 'application/json'
        }
      });

      if (response.status === 200) {
        const { token } = response.data;
        // Store the token in a cookie
        Cookies.set('token', token, { expires: 7 }); // Set the cookie with a name 'token' and an expiry of 7 days
        console.log('Login successful:', response.data);
        
        // Redirect to the home page
        router.push('/');
        
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      if (error.response) {
        // Error response received from the server
        setError(error.response.data.error);
      } else {
        // Error without a response (e.g., network error)
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#050816] to-[#100D25]">
      <Header />
      <section>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-slideRight shadow-card ">
            <form
              className="flex flex-col items-center p-8 border border-gray-300 rounded-lg shadow-lg w-120 h-120 bg-black-100"
              onSubmit={handleLogin}
            >
              <h2 className={styles.sectionHeadText}>Log In</h2>

              <input
                type="text"
                id="email"
                placeholder="Email"
                value={email_address}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-tertiary placeholder:text-secondary p-3 m-2 rounded-lg border border-gray-300 shadow-md w-80"
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-tertiary p-3 m-2 rounded-lg border border-gray-300 shadow-md w-80 placeholder:text-secondary"
              />

              <button
                type="submit"
                // type="button" onClick={() => router.push('/')}
                className="p-3 m-2 rounded-lg border border-gray-300 shadow-md w-32 hover:bg-[#0e9c7d]"
              >
                Log In
              </button>

              <h5 className="my-4">or log in with</h5>

              <div className="flex justify-between w-full">
                <button
                  className="flex items-center justify-center rounded-lg border-gray-300 bg-red-600 hover:bg-red-700 hover:text-white focus:outline-none focus:border-red-400 p-3 w-full h-10 mr-2"
                  type="button"
                >
                  <span className="mr-2">
                    <AiFillGoogleCircle />
                  </span>
                  <span>Google</span>
                </button>
                <button
                  className="flex items-center justify-center rounded-lg border-gray-300 bg-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none focus:border-blue-400 p-3 w-full h-10 mr-2"
                  type="button"
                >
                  <span className="mr-2">
                    <FaFacebookSquare />
                  </span>
                  <span>Facebook</span>
                </button>
                <button
                  className="flex items-center justify-center rounded-lg border-gray-300 bg-gray-700 hover:bg-gray-800 hover:text-white focus:outline-none focus:border-gray-400 p-3 w-full h-10"
                  type="button"
                >
                  <span className="mr-2">
                    <FaGithubSquare />
                  </span>
                  <span>Github</span>
                </button>
              </div>
            </form>
          </div>
          <div className="animate-slideLeft">
            <img
              src="/Login.png"
              alt="login image"
              className="w-96 h-96 object-cover rounded-lg shadow-lg ml-8"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
