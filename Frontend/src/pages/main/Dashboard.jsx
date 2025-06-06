import React from 'react'
import Menubar from '../../components/Menubar'

const Dashboard = () => {
  return (
    <div className='page'>
      <Menubar heading="Dashboard"/>
      <div className='grow overflow-auto'>Children</div>
    </div>
  )
}

export default Dashboard