import React from 'react'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import { Outlet } from 'react-router-dom';
import RightContent from './rightContent/RightContent';

const DoctorPage = () => {
  return (
    <div className='doctor'>
      <Navbar />
      <Sidebar />
      <RightContent>
        <Outlet />
      </RightContent>
    </div>
  )
}

export default DoctorPage