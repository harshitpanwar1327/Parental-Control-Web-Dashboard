import React, { useEffect, useState } from 'react'
import Menubar from '../../components/Menubar'
import Switch from '@mui/material/Switch'
import {NavLink} from 'react-router-dom'
import API from '../../utils/API'
import {toast, Bounce} from 'react-toastify'
import {motion} from 'motion/react'

const Settings = () => {
  const label = { inputProps: { 'aria-label': 'Size switch demo' } };
  const [notificationData, setNotificationData] = useState({});
  const [licenseData, setLicenseData] = useState({});
  const parentId = sessionStorage.getItem('parentId');

  const fetchNotification = async () => {
    const response = await API.get(`/settings/get-settings/${parentId}`);
    setNotificationData(response.data.data[0]);
  }

  const fetchLicense = async () => {
    const response = await API.get(`/users/get-license/${parentId}`);
    setLicenseData(response.data.data[0]);
  }

  useEffect(() => {
    try {
      fetchNotification();
      fetchLicense();
    } catch (error) {
      console.log(error);
    }
  }, [])

  const interpretPolicy = (value) => {
    if(value === 1) {
      return true;
    } else {
      return false;
    }
  }

  const handleToggle = async (key, value) => {
    try {
      await API.put(`/settings/update-settings/${parentId}`, {
        key: key,
        value: value
      });

      setNotificationData((prev)=>({...prev, [key]: value? 1: 0}));

      toast.success('Notification updated successfully', {
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
      toast.error(error.response.data.message || "Something went wrong!", {
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

  const handleRenewal = () => {
    toast.info("Renewal process coming soon!", {
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

  return (
    <div className='page'>
      <Menubar heading="Settings"/>
      <div className='grow overflow-auto p-4 flex flex-col gap-4'>
        <motion.div className='bg-[var(--primary-sidebar)] rounded-xl p-4'
          initial={{opacity: 0, y: 100}}
          animate={{opacity: 1, y: 0}}
          transition={{type: 'spring', stiffness: 100, damping: 12, delay: 0.4}}
        >
          <h2 className='font-bold text-xl mb-4'>🔔 Notifications</h2>
          <div className='flex gap-4'>
            <div className='flex flex-col items-center w-1/3'>
              <p>App Alerts</p>
              <Switch {...label} checked={interpretPolicy(notificationData?.app_alerts)} onChange={(e)=>handleToggle('app_alerts', e.target.checked)}/>
            </div>
            <div className='flex flex-col items-center w-1/3'>
              <p>Email Notifications</p>
              <Switch {...label} checked={interpretPolicy(notificationData?.email_notifications)} onChange={(e)=>handleToggle('email_notifications', e.target.checked)}/>
            </div>
            <div className='flex flex-col items-center w-1/3'>
              <p>Offers & Subscription</p>
              <Switch {...label} checked={interpretPolicy(notificationData?.offers_notifications)} onChange={(e)=>handleToggle('offers_notifications', e.target.checked)}/>
            </div>
          </div>
        </motion.div>

        <motion.div className='bg-[var(--primary-sidebar)] rounded-xl p-4'
          initial={{opacity: 0, y: 100}}
          animate={{opacity: 1, y: 0}}
          transition={{type: 'spring', stiffness: 100, damping: 12, delay: 0.8}}
        >
          <h2 className='font-bold text-xl mb-4'>🪪 License</h2>
          <div className='flex items-center gap-4'>
            <p className='w-1/4 text-center'><b>License Key:</b><br /> {licenseData.license ? licenseData.license : "No license"}</p>
            <p className='w-1/4 text-center'><b>Valid Till:</b><br /> {licenseData.expiry_date ? new Date(licenseData.expiry_date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) : "N/A"}</p>
            <p className='w-1/4 text-center'><b>Status:</b><br /> {licenseData.expiry_date ? (new Date(licenseData.expiry_date) > new Date() ? '✔️ Active' : '❌ Expired') : "N/A"}</p>
            <button className={`text-white ${licenseData.expiry_date && new Date(licenseData.expiry_date) > new Date() ? 'bg-gray-400 dark:bg-gray-600 !cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`} onClick={handleRenewal} disabled={licenseData.expiry_date && new Date(licenseData.expiry_date) > new Date()}>Renew License</button>
          </div>
        </motion.div>

        <motion.div className='bg-[var(--primary-sidebar)] rounded-xl p-4'
          initial={{opacity: 0, y: 100}}
          animate={{opacity: 1, y: 0}}
          transition={{type: 'spring', stiffness: 100, damping: 12, delay: 1.2}}
        >
          <h2 className='font-bold text-xl mb-4'>🔗 Support & Resources</h2>
          <div className='flex gap-4'>
            <NavLink to={'/report-issue'} className='w-1/4 text-center'>💬 Report an Issue</NavLink>
            <NavLink to={'/policy'} className='w-1/4 text-center'>📜 Privacy Policy</NavLink>
            <NavLink to={'/terms'} className='w-1/4 text-center'>📄 Terms of Service</NavLink>
            <NavLink to={'/faq'} className='w-1/4 text-center'>❓ Help / FAQs</NavLink>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings