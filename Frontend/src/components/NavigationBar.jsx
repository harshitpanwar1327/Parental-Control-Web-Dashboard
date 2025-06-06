import React, { useState } from 'react'
import { motion, AnimatePresence } from "motion/react"
import MenuIcon from '@mui/icons-material/Menu'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded'
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded'
import SecurityUpdateWarningRoundedIcon from '@mui/icons-material/SecurityUpdateWarningRounded'
import DonutSmallRoundedIcon from '@mui/icons-material/DonutSmallRounded'
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded'
import {NavLink} from 'react-router-dom'

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(prev => !prev);

  const sidebarVariants = {
    open: { width: '17rem', transition: { duration: 0.3, type: 'spring', stiffness: 100, damping: 15 } },
    closed: { width: '5rem', transition: { duration: 0.3, type: 'spring', stiffness: 100, damping: 15 } }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -10, transition: { duration: 0, delay: 0 } },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }
  };

  return (
    <motion.div className="h-screen bg-[var(--primary-sidebar)] text-white flex flex-col p-4 border-r-4 border-[#0000001a] dark:border-[#ffffff33]"
      variants={sidebarVariants}
      animate={isOpen ? "open" : "closed"}
      initial="closed"
    >
      <div className='flex w-full items-center h-20 justify-between px-3 text-[#213547] dark:text-white'>
        <AnimatePresence>
          {isOpen && (
            <motion.p className='font-bold ml-1 text-xl'
              initial="hidden"
              animate={isOpen? "visible": "hidden"}
              exit="hidden"
              variants={textVariants}
            >Parental Control</motion.p>
          )}
        </AnimatePresence>
        <MenuIcon className='justify-self-end cursor-pointer' onClick={()=>toggle()}/>
      </div>

      <div className='flex flex-col'>
        <NavLink to={'/dashboard'} className={({isActive}) => `nav-items ${isActive? 'border-r-3 bg-[var(--secondary-sidebar)]': ''}`}>
          <DashboardRoundedIcon/>
          <AnimatePresence>
            {isOpen && (
              <motion.p className='nav-items-heading'
                initial="hidden"
                animate={isOpen? "visible": "hidden"}
                exit="hidden"
                variants={textVariants}
              >
                Dashboard
              </motion.p>
            )}
          </AnimatePresence>
        </NavLink>
        <NavLink to={'/children'} className={({isActive}) => `nav-items ${isActive? 'border-r-3 bg-[var(--secondary-sidebar)]': ''}`}>
          <ContactsRoundedIcon/>
          <AnimatePresence>
            {isOpen && (
              <motion.p className='nav-items-heading'
                initial="hidden"
                animate={isOpen? "visible": "hidden"}
                exit="hidden"
                variants={textVariants}
              >
                Children
              </motion.p>
            )}
          </AnimatePresence>
        </NavLink>
        <NavLink to={'/monitoring'} className={({isActive}) => `nav-items ${isActive? 'border-r-3 bg-[var(--secondary-sidebar)]': ''}`}>
          <OndemandVideoRoundedIcon/>
          <AnimatePresence>
            {isOpen && (
              <motion.p className='nav-items-heading'
                initial="hidden"
                animate={isOpen? "visible": "hidden"}
                exit="hidden"
                variants={textVariants}
              >
                Monitoring
              </motion.p>
            )}
          </AnimatePresence>
        </NavLink>
        <NavLink to={'/controls'} className={({isActive}) => `nav-items ${isActive? 'border-r-3 bg-[var(--secondary-sidebar)]': ''}`}>
          <SecurityUpdateWarningRoundedIcon/>
          <AnimatePresence>
            {isOpen && (
              <motion.p className='nav-items-heading'
                initial="hidden"
                animate={isOpen? "visible": "hidden"}
                exit="hidden"
                variants={textVariants}
              >
                Controls
              </motion.p>
            )}
          </AnimatePresence>
        </NavLink>
        <NavLink to={'/reports'} className={({isActive}) => `nav-items ${isActive? 'border-r-3 bg-[var(--secondary-sidebar)]': ''}`}>
          <DonutSmallRoundedIcon/>
          <AnimatePresence>
            {isOpen && (
              <motion.p className='nav-items-heading'
                initial="hidden"
                animate={isOpen? "visible": "hidden"}
                exit="hidden"
                variants={textVariants}
              >
                Reports
              </motion.p>
            )}
          </AnimatePresence>
        </NavLink>
        <NavLink to={'/settings'} className={({isActive}) => `nav-items ${isActive? 'border-r-3 bg-[var(--secondary-sidebar)]': ''}`}>
          <SettingsSuggestRoundedIcon/>
          <AnimatePresence>
            {isOpen && (
              <motion.p className='nav-items-heading'
                initial="hidden"
                animate={isOpen? "visible": "hidden"}
                exit="hidden"
                variants={textVariants}
              >
                Settings
              </motion.p>
            )}
          </AnimatePresence>
        </NavLink>
      </div>
    </motion.div>
  )
}

export default NavigationBar