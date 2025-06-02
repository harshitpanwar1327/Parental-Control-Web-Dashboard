import React from 'react'
import Menubar from '../../components/Menubar'

const Controls = () => {
  return (
    <div className='page'>
      <Menubar heading="Controls & Restrictions"/>
      <div className='grow overflow-auto'>Children</div>
    </div>
  )
}

export default Controls