import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { loginapi } from '../api/auth.api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin =async()=>{
    if(!email || !password){
      setError("Email and Passowrd are required");
      return;
    }
    try{
      setLoading(true)
      setError("");

      const res = await loginapi({email,password});

      login(res.token,res.user);
      navigate("/dashboard");

    }catch(error:any){
       setError("Invalid email or password");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-300 px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8'>
        <div className='flex justify-center mb-4'>
          <div className='bg-gradient-to-br from-blue-600 to-indigo-300 w-16 h-16 flex items-center justify-center mb-4 rounded-xl'>
            <h4 className='text-white font-bold'>CRM</h4>
          </div>
        </div>
        <h2 className='text-2xl font-bold text-center text-gray-800'>
          CRM Admin Login
        </h2>
          {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-600 mb-1'>
            Email Address
          </label>
          <input
            placeholder='email'
            type='email'
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
             value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-600 mb-1'>
            Password
          </label>
          <input
            placeholder='password'
            type='password'
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className='text-right mb-4'>
          <button className='text-sm text-blue-600 hover:underline'>
            Forgot password?
          </button>
        </div>
        <button className='w-full bg-gradient-to-br from-blue-600 to-indigo-300 text-white font-bold py-2 rounded-lg hover:from-blue-700 hover:to-indigo-400 transition-colors'
        onClick={handleLogin}
        disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className='text-xs text-gray-400 text-center mt-6'>
          © 2025 CRM System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
