import React, { useState } from 'react'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'
import LoginImg from '../../assets/Login.webp'
import {toast, Bounce} from 'react-toastify'
import API from '../../utils/API'
import {useNavigate} from 'react-router-dom'
import { ClipLoader } from "react-spinners"
import { motion } from "motion/react"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await API.post('/users/login', {
        email: email,
        password: password
      })

      const token = response.data.token;
      const parentId = response.data.parentId;
      sessionStorage.setItem('authUser', email);
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('parentId', parentId);
      sessionStorage.setItem('isAuthenticated', true);

      setEmail('');
      setPassword('');

      toast.success('Login successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || 'Login Failed!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-screen h-screen flex'>
      {loading && (
        <div className='fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-[rgba(255,255,255,0.5)] backdrop-blur-sm'>
          <ClipLoader color='rgb(123, 72, 255'/>
        </div>
      )}
      <div className='w-1/2 flex flex-col justify-center px-16'>
        <motion.div className='flex'
          initial={{opacity: 0, x: -400}}
          animate={{opacity: 1, x: 0}}
          transition={{type:'spring', stiffness: 100, damping: 12, delay: 0.4}}
        >
          <FamilyRestroomIcon sx={{color: 'rgb(123, 72, 255)', fontSize: '1.25rem'}} />
          <p className='font-semibold ml-1'>Parental Control</p>
        </motion.div>

        <motion.div className='py-8'
          initial={{opacity: 0, y: 100}}
          animate={{opacity: 1, y: 0}}
          transition={{type:'spring', stiffness: 100, damping: 10, delay: 0.6}}
        >
          <h1>Holla,</h1>
          <h1>Welcome Back</h1>
          <p className='text-gray-500'>Hey, welcome back to your special place</p>
        </motion.div>

        <motion.form className='flex flex-col' onSubmit={handleLogin}
          initial={{opacity: 0, y: 100}}
          animate={{opacity: 1, y: 0}}
          transition={{type:'spring', stiffness: 100, damping: 10, delay: 0.8}}
        >
          <input type="email" name="email" id="email" placeholder='enter your email' className='auth-input' value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" name="password" id="password" placeholder='enter your password' className='auth-input' value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <button className="bg-[#7B48FF] hover:bg-[#5e34cc] w-1/3 mt-2 text-white py-2 rounded-lg ">Sign in</button>
        </motion.form>
      </div>

      <motion.div className='w-1/2 m-2'
        initial = {{opacity: 0, scale: 0}}
        animate = {{opacity: 1, scale: 1}}
        transition={{type: 'spring', stiffness: 100, damping: 20, delay: 0.8}}
      >
        <img src={LoginImg} alt="Login Img" className='h-full w-full rounded-2xl'/>
      </motion.div>
    </div>
  )
}

export default Login