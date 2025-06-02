import React from 'react'

const Menubar = ({heading}) => {
  
  return (
    <div className='flex justify-between bg-white p-4 dark:bg-[var(--primary-dark)]'>
      <h2 className='font-semibold text-xl'>{heading}</h2>
    </div>
  )
}

export default Menubar