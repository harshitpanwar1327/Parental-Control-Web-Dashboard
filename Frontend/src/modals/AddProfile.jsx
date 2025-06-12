import React, { useState, useRef } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import ProfileImg from '../assets/profile-icon.png'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import {toast, Bounce} from 'react-toastify'
import API from '../utils/API'

const AddProfile = ({setOpenModal, fetchChildrenProfiles}) => {
  const [profile, setProfile] = useState();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const parentId = sessionStorage.getItem('parentId');
  const fileRef = useRef(null);

  const handleProfileClick = () => {
    fileRef.current.click();
  }

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    
    if(file) {
      setImageFileName(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('parentId', parentId);
      formData.append('name', name);
      formData.append('age', age);
      formData.append('imageFileName', imageFileName);

      let response = await API.post('/children/insert-child', formData, {
        "Content-type": "multipart/form-data"
      });

      setOpenModal(false);
      fetchChildrenProfiles();

      toast.success('Profile added successfully!', {
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
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || 'Profile not saved!', {
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
    }
  }

  return (
    <div className='fixed top-0 left-0 bg-[#0000005a] dark:bg-[#ffffff5a] w-screen h-screen flex items-center justify-center z-100' onClick={()=>setOpenModal(false)}>
      <div className='bg-[var(--primary-sidebar)] p-4 rounded-md' onClick={(e)=>e.stopPropagation()}>
        <div className='flex justify-between'>
          <h2 className='font-semibold'>Child Profile</h2>
          <CancelIcon className='text-red-500 hover:text-red-600 cursor-pointer' onClick={(e)=>setOpenModal(false)}/>
        </div>

        <form className='flex flex-col items-center mt-4' onSubmit={handleSaveProfile}>
          <div className='relative group w-24 h-24 mb-4' onClick={handleProfileClick}>
            <img src={profile || ProfileImg} alt="Profile" className='w-full h-full object-cover border border-gray-300 rounded-full' />
            <div className='absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer'>
              <CameraAltIcon className='text-white' />
            </div>
            <input type="file" name='profile' id='profile' className='hidden' ref={fileRef} onChange={handleProfileChange}/>
          </div>
          <input type="text" name='name' id='name' placeholder='Enter the child name' className='modals-input' value={name} onChange={(e)=>setName(e.target.value)} required/>
          <input type="number" name="age" id="age" placeholder='Enter the age' className='modals-input' value={age} onChange={(e)=>setAge(e.target.value)} required/>
          <button className='bg-blue-500 text-white hover:bg-blue-700 mt-2'>Save Profile</button>
        </form>
      </div>
    </div>
  )
}

export default AddProfile