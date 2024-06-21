import React from 'react'
import './PatientRightContent.css'

const PatientRightContent = ({ children }) => {
    return (
        <div className='patientrightcontent'>
            {children}
        </div>
    )
}

export default PatientRightContent