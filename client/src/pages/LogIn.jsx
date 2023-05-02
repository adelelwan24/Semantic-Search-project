import { AiFillGoogleCircle } from 'react-icons/ai';
import { FaFacebookSquare, FaGithubSquare } from 'react-icons/fa';

const LoginPage = () => {
  return (
    <section>
      <div className="flex justify-center items-center h-screen">
        <form className="flex flex-col items-center p-8 border border-gray-300 rounded-lg shadow-lg w-96 h-96">
          <h2 className="text-2xl font-bold mb-8">Log In</h2>

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

          <button className="p-3 m-2 rounded-lg border border-gray-300 shadow-md w-32 hover:bg-red-500">
            Log In
          </button>

          <h5 className="my-4">or log in with</h5>

          <div className="flex space-x-4">
            <button className="p-3 m-2 rounded-lg border border-gray-300 shadow-md w-32 flex items-center justify-center bg-blue-600 text-white hover:bg-blue-800">
              
              Google
            </button>

            <button className="p-3 m-2 rounded-lg border border-gray-300 shadow-md w-32 flex items-center justify-center bg-gray-800 text-white hover:bg-gray-900">
              
              Facebook
            </button>

            <button className="p-3 m-2 rounded-lg border border-gray-300 shadow-md w-32 flex items-center justify-center bg-gray-900 text-white hover:bg-gray-800">
              
              Github
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
  );
};

export default LoginPage;
