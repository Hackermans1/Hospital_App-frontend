import React from 'react'
import './AdminRightContent.css';

const AdminRightContent = ({ children }) => {
  return (
    <div className='adminrightcontent'>
      {children}
    </div>
  )
}

export default AdminRightContent