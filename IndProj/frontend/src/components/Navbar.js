import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
// import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import LoginIcon from '@mui/icons-material/Login';
// import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
// import RocketLaunchTwoToneIcon from '@mui/icons-material/RocketLaunchTwoTone';

export default function Navbar({ drawerWidth, logo }) {
  const [open, setOpen] = useState(false);

  const menuOpen = () => setOpen(true);
  const menuClose = () => setOpen(false);
  
  return (
    <div className='p-5 pr-0 flex navbar justify-between align-center items-center relative z-50'>
      <div className='App-logo w-56 h-fit'>
        <Link to='/'>{logo}</Link>
      </div>
      <div className='content justify-evenly w-[50%] items-center sm:flex hidden space-x-2 text-violet-400'>
        {/* <Link to='/space' className='hover:text-violet-600 transition ease-in-out duration-300'><RocketLaunchTwoToneIcon />Space</Link> */}
        {/* <Link to='/' className='hover:text-violet-600 transition ease-in-out duration-300' onClick={menuClose}><HomeIcon />Home</Link> */}
        <Link to='/community' className='hover:text-violet-600 transition ease-in-out duration-300' ><ChatIcon />Community</Link>
        <Link to='/login' className='hover:text-violet-600 transition ease-in-out duration-300' ><LoginIcon />Log-In</Link>
        {/* <Link to='/signup' className='hover:text-violet-600 transition ease-in-out duration-300' ><AppRegistrationIcon />Sign-Up</Link> */}
      </div>
      {/* Mobile Menu */}
      {!open ? (
        <div className='sm:hidden pt-3 pr-5 cursor-pointer' onClick={menuOpen}>
          <MenuIcon />
        </div>
      ) : (
        <>
          <div 
                className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40'
                onClick={menuClose}
          />
          <div className='mobile-menu flex flex-col sm:hidden space-y-10 pr-5 z-50'>
            <div className='sm:hidden pt-3 cursor-pointer' onClick={menuClose}>
              <CloseIcon />
            </div>
            {/* <Link to='/space' className='hover:text-violet-600 transition ease-in-out duration-300' onClick={menuClose}><RocketLaunchTwoToneIcon />Space</Link> */}
            {/* <Link to='/' onClick={menuClose}><HomeIcon />Home</Link> */}
            <Link to='/community' onClick={menuClose}><ChatIcon />Community</Link>
            <Link to='/login' onClick={menuClose}><LoginIcon />Log-In</Link>
            {/* <Link to='/signup' onClick={menuClose}><AppRegistrationIcon />Sign-Up</Link> */}
          </div>
        </>
      )}
    </div>
  );
}
