import Link from "next/link";
import Header from '../components/Header'

import { AiFillGoogleCircle } from 'react-icons/ai';
import { FaFacebookSquare, FaGithubSquare } from 'react-icons/fa';

  const LoginPage = () => {
    return (
    <>
      <Header/>
      <section>
        <div className="flex justify-center items-center h-screen">
          <form className="flex flex-col items-center p-8 border border-gray-300 rounded-lg shadow-lg w-120 h-120">
            <h2 className="text-2xl font-bold mb-8 ">Log In</h2>

            <input
              type="text"
              placeholder="Username"
              className="p-3 m-2 rounded-lg border border-gray-300 shadow-md w-80"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 m-2 rounded-lg border border-gray-300 shadow-md w-80"
            />

            <button className="p-3 m-2 rounded-lg border border-gray-300 shadow-md w-32 hover:bg-[#0e9c7d]">
              Log In
            </button>

            <h5 className="my-4">or log in with</h5>

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

          <img
            src="/Login.png"
            alt="login image"
            className="w-96 h-96 object-cover rounded-lg shadow-lg ml-8"
          />
        </div>
      </section>
    </>
  );
};

export default LoginPage;
