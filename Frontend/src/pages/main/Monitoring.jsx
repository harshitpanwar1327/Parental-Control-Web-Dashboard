import React from 'react'
import Menubar from '../../components/Menubar'

const Monitoring = () => {
  return (
    <div className='page'>
      <Menubar heading="Monitoring"/>
      <div className='grow overflow-auto'>Children</div>
    </div>
  )
}

export default Monitoring