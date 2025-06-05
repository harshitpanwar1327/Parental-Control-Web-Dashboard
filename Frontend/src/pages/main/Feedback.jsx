import React from 'react'
import Menubar from '../../components/Menubar'

const Feedback = () => {
  return (
    <div className='page'>
      <Menubar heading="Feedback"/>
      <div className='grow overflow-auto bg-[var(--primary-sidebar)] m-4 rounded-xl'></div>
    </div>
  )
}

export default Feedback