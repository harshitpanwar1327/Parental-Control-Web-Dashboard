import React, { useState, useRef, useEffect } from 'react'
import './reportIssue.css'
import Menubar from '../../../components/Menubar'
import SupportImage from '../../../assets/support.png'
import {motion} from 'motion/react'
import {v4 as uuidv4} from 'uuid'
import {toast, Bounce} from 'react-toastify'
import API from '../../../utils/API'

const ReportIssue = () => {
  const [deviceOptions, setDeviceOptions] = useState([]);
  const issueOptions = [
    // Installation & Setup
    "Application not installing on Windows/macOS/Android/iOS",
    "License key invalid or not accepted",
    "App crashes during launch",
    "Device not appearing in the dashboard",
    "Internet required to complete setup but not detected",
    "App blocked by antivirus or security software",
    // Permissions & Access
    "Missing permissions (screen recording, activity access)",
    "Parental control app not granted admin/root privileges",
    "Screen time or app usage tracking not working",
    "Cannot enable background service or monitoring",
    "Notification access denied or not functioning",
    // Monitoring & Logging
    "Live screen not streaming or delayed",
    "Keystrokes not being recorded",
    "Web history not syncing",
    "App usage tracking not updating",
    "Reports showing blank or outdated data",
    // Control & Restriction
    "App blocking not working",
    "Time limits not applying",
    "Inappropriate content not detected",
    "Control rules being bypassed",
    "Unable to unblock apps or websites",
    // Communication & Sync
    "Device not syncing with dashboard",
    "Actions from dashboard not applying to device",
    "Notification or alert delays",
    "Multiple devices showing as one",
    "Duplicate devices in dashboard",
    // User Experience
    "UI glitches or misaligned elements",
    "Slow dashboard performance",
    "Dark mode/theme issues",
    "Settings not saving",
    "Language or locale issues",
    // Account & Licensing
    "Account not logging in",
    "License expired unexpectedly",
    "Wrong user/device linked to account",
    "Cannot change password or email",
    "No option to renew or upgrade license",
    // Miscellaneous
    "High battery consumption on device",
    "App slowing down system",
    "QR code not displaying properly",
    "Inaccurate or missing analytics",
    "Unexpected errors or crash messages"
  ];

  const [deviceId, setDeviceId] = useState('');
  const [urgency, setUrgency] = useState('');
  const [issueType, setIssueType] = useState('');
  const [issueDesc, setIssueDesc] = useState('');
  const [screenshot, setScreenshot] = useState({});
  const parentId = sessionStorage.getItem('parentId');
  const license = sessionStorage.getItem('license');

  const fileInputRef = useRef();

  const fetchDevices = async () => {
    try {
      let response = await API.get(`/devices/get-devices/${license}`);
      setDeviceOptions(response.data.data);     
    } catch (error) {
      console.log(error.response.data.message || error);
    }
  }

  useEffect(() => {
    try {
      fetchDevices();
    } catch (error) {
      console.log(error);
    }
  }, [])

  const handleForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const ticket = uuidv4().slice(0,16);
    formData.append('ticket_no', ticket);
    formData.append('deviceId', deviceId);
    formData.append('urgency', urgency);
    formData.append('issue_type', issueType);
    formData.append('issue_desc', issueDesc);
    formData.append('screenshot', screenshot);

    try {
      let response = await API.post(`/report-issue/insert-feedback/${parentId}`, formData, {
        "Content-type": "multipart/form-data"
      });

      setDeviceId('');
      setUrgency('');
      setIssueType('');
      setIssueDesc('');
      setScreenshot();
      fileInputRef.current.value = '';

      toast.success(`Issue raised with ticket no: ${ticket}`, {
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
      toast.error(error.reponse.data.message || 'Form not submitted!', {
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
    <div className='page'>
      <Menubar heading="Feedback"/>
      <div className='flex flex-col grow m-2 py-4 px-8 rounded-md bg-[var(--primary-sidebar)] overflow-auto md:overflow-hidden'>
        <motion.h2 className='text-xl font-bold'
          initial={{opacity: 0, x: -100}}
          animate={{opacity: 1, x: 0}}
          transition={{type: 'spring', stiffness: 100, damping: 12, delay: 0.2}}
        >
          Tell Us About a Problem You’re Facing
        </motion.h2>
        <div className='flex flex-col gap-10 my-4 lg:flex-row'>
          <form className='flex flex-col justify-center gap-2 lg:w-1/2' onSubmit={handleForm}>
            <motion.select name="deviceId" id="deviceId" className='auth-input' value={deviceId} onChange={(e) => setDeviceId(e.target.value)} required
              initial={{opacity: 0, y: 100}}
              animate={{opacity: 1, y: 0}}
              transition={{type: 'spring', stiffness: 100, damping: 12, delay: 0.2}}
            >
              <option className='dark:bg-black' value="">Select Device</option>
              {deviceOptions.map((data, index) => (
                <option value={data.id} key={index}>{data.device_name}</option>
              ))}
            </motion.select>
            <motion.select name="urgency" id="urgency" className='auth-input' value={urgency} onChange={(e) => setUrgency(e.target.value)} 
              initial={{opacity: 0, y: 100}}
              animate={{opacity: 1, y: 0}}
              transition={{type: 'spring', stiffness: 100, damping: 12, delay: 0.4}}
            >
              <option className='dark:bg-black' value="">Select Urgency</option>
              <option className='dark:bg-black' value="high">High</option>
              <option className='dark:bg-black' value="medium">Medium</option>
              <option className='dark:bg-black' value="low">Low</option>
            </motion.select>
            <motion.select name="issue_type" id="issue_type" className='auth-input' value={issueType} onChange={(e) => setIssueType(e.target.value)}  required
              initial={{opacity: 0, y: 100}}
              animate={{opacity: 1, y: 0}}
              transition={{type: 'spring', stiffness: 100, damping: 12, delay: 0.6}}
            >
              <option className='dark:bg-black' value="">Select Issue Type</option>
              {issueOptions.map((data, index) => (
                <option className='dark:bg-black' value={data} key={index}>{data}</option>
              ))}
            </motion.select>
            <motion.textarea name="issue_desc" id="issue_desc" className='auth-input' placeholder='Describe your issue...' rows={4} value={issueDesc} onChange={(e) => setIssueDesc(e.target.value)}  required
              initial={{opacity: 0, y: 100}}
              animate={{opacity: 1, y: 0}}
              transition={{type: 'spring', stiffness: 100, damping: 12, delay: 0.8}}
            ></motion.textarea>
            <motion.input type="file" name="screenshot" id="screenshot" accept='image/*' className='w-1/2 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded border border-dashed' onChange={(e) => setScreenshot(e.target.files[0])} ref={fileInputRef}
              initial={{opacity: 0, y: 100}}
              animate={{opacity: 1, y: 0}}
              transition={{type: 'spring', stiffness: 100, damping: 12, delay: 1}}
            />
            <motion.button className='text-white bg-blue-600 mt-2 hover:bg-blue-700 self-start'
              initial={{opacity: 0, y: 100}}
              animate={{opacity: 1, y: 0}}
              transition={{type: 'spring', stiffness: 100, damping: 12, delay: 1.2}}
            >Submit Issue</motion.button>
          </form>
          <div className='w-2/3 flex items-center justify-center bg-[#FCEBCF] dark:bg-[#a0b6ff] support-image-custom-radius'>
            <motion.img src={SupportImage} alt="Support Image" className='h-100'
              animate={{
                scale: [1, 1.1, 1],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportIssue