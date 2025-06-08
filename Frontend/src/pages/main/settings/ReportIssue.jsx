import React, { useState, useRef } from 'react'
import Menubar from '../../../components/Menubar'
import SupportImage from '../../../assets/support.png'
import {motion} from 'motion/react'
import {v4 as uuidv4} from 'uuid'
import {toast, Bounce} from 'react-toastify'
import API from '../../../utils/API'

const ReportIssue = () => {
  const [deviceId, setDeviceId] = useState('');
  const [urgency, setUrgency] = useState('');
  const [issueType, setIssueType] = useState('');
  const [issueDesc, setIssueDesc] = useState('');
  const [screenshot, setScreenshot] = useState({});
  const parentId = sessionStorage.getItem('parentId');
  const fileInputRef = useRef();

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
      <form className='flex flex-col grow m-2 py-4 px-8 rounded-md bg-[var(--primary-sidebar)]' onSubmit={handleForm}>
        <motion.h2 className='text-xl font-bold'
          initial={{opacity: 0, x: -100}}
          animate={{opacity: 1, x: 0}}
          transition={{type: 'spring', stiffness: 100, damping: 12, delay: 0.2}}
        >
          Tell Us About a Problem You’re Facing
        </motion.h2>
        <div className='flex my-4'>
          <div className='w-1/2 flex flex-col justify-center gap-2'>
            <motion.select name="deviceId" id="deviceId" className='auth-input' value={deviceId} onChange={(e) => setDeviceId(e.target.value)} required
              initial={{opacity: 0, y: 100}}
              animate={{opacity: 1, y: 0}}
              transition={{type: 'spring', stiffness: 100, damping: 12, delay: 0.2}}
            >
              <option className='dark:bg-black' value="">Select Device</option>
              <option className='dark:bg-black' value="1">Kacey</option>
              <option className='dark:bg-black' value="2">Bob</option>
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
              <option className='dark:bg-black' value="issue1">Issue 1</option>
              <option className='dark:bg-black' value="issue2">Issue 2</option>
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
          </div>
          <div className='w-1/2 flex items-center justify-center bg-[#FCEBCF] dark:bg-[var(--secondary-sidebar)] support-image-custom-radius'>
            <motion.img src={SupportImage} alt="Support Image" className='h-95 md:h-65'
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
        <motion.button className='text-white bg-blue-600 hover:bg-blue-700 self-start'
          initial={{opacity: 0, y: 100}}
          animate={{opacity: 1, y: 0}}
          transition={{type: 'spring', stiffness: 100, damping: 12, delay: 1.2}}
        >Submit Issue</motion.button>
      </form>
    </div>
  )
}

export default ReportIssue