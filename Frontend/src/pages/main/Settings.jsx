import React from 'react'
import Menubar from '../../components/Menubar'
import Switch from '@mui/material/Switch'
import {NavLink} from 'react-router-dom'

const Settings = () => {
  const label = { inputProps: { 'aria-label': 'Size switch demo' } };

  return (
    <div className='page'>
      <Menubar heading="Settings"/>
      <div className='grow overflow-auto p-4 flex flex-col gap-4'>
        <div className='bg-[var(--primary-sidebar)] rounded-xl p-4'>
          <h2 className='font-bold text-xl mb-4'>🔔 Notifications</h2>
          <div className='flex gap-4'>
            <div className='flex flex-col items-center w-1/3'>
              <p>App Alerts</p>
              <Switch {...label} defaultChecked />
            </div>
            <div className='flex flex-col items-center w-1/3'>
              <p>Email Notifications</p>
              <Switch {...label} defaultChecked />
            </div>
            <div className='flex flex-col items-center w-1/3'>
              <p>New Feature Alerts</p>
              <Switch {...label} defaultChecked />
            </div>
          </div>
        </div>

        <div className='bg-[var(--primary-sidebar)] rounded-xl p-4'>
          <h2 className='font-bold text-xl mb-4'>🪪 License</h2>
          <div className='flex items-center gap-4'>
            <p className='w-1/4 text-center'><b>License Key:</b><br /> PC-2391-ABCD-9132</p>
            <p className='w-1/4 text-center'><b>Valid Till:</b><br /> 15 Jan 2026</p>
            <p className='w-1/4 text-center'><b>Status:</b><br /> ✔️ Active</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Renew License</button>
          </div>
        </div>

        <div className='bg-[var(--primary-sidebar)] rounded-xl p-4'>
          <h2 className='font-bold text-xl mb-4'>🔗 Support & Resources</h2>
          <div className='flex gap-4'>
            <NavLink to={'/feedback'} className='w-1/4 text-center'>💬 Give Feedback</NavLink>
            <NavLink to={'/policy'} className='w-1/4 text-center'>📜 Privacy Policy</NavLink>
            <NavLink to={'/terms'} className='w-1/4 text-center'>📄 Terms of Service</NavLink>
            <NavLink to={'/faq'} className='w-1/4 text-center'>❓ Help / FAQs</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings