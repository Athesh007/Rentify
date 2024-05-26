import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${__URI__}/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigateTo("/properties");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <div className="text-center">
            <p className="mt-2">Don't have an account?</p>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
