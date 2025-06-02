import React from 'react'
import Menubar from '../../components/Menubar'

const Settings = () => {
  return (
    <div className='page'>
      <Menubar heading="Settings"/>
      <div className='grow overflow-auto'>Children</div>
    </div>
  )
}

export default Settings