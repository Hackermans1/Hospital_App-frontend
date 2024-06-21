import React from 'react'
import './Doctors.css'
import d1 from '../images/d1.jpg';
import d2 from '../images/d2.jpg';
import d3 from '../images/d3.jpg';
import d4 from '../images/d4.jpg';

const Doctors = () => {
    return (
        <div className='doctors'>
            <div className='doctorsupper'>
                <h2 className='doctorsupperh2'>Our Doctors</h2>
            </div>
            <div className='doctorslower'>
                <div className='doctorsc2'>
                <img className='doctorsc1image' src={d1} alt='d1'></img>
                    <h5 className='doctorsc1h5'>Marc Parcival</h5>
                    <p className='doctorsc1p'>Professor</p>
                </div>
                <div className='doctorsc2'>
                <img className='doctorsc1image' src={d2} alt='d2'></img>
                    <h5 className='doctorsc1h5'>Marc Parcival</h5>
                    <p className='doctorsc1p'>Professor</p>
                </div>
                <div className='doctorsc2'>
                <img className='doctorsc1image' src={d3} alt='d3'></img>
                    <h5 className='doctorsc1h5'>Marc Parcival</h5>
                    <p className='doctorsc1p'>Professor</p>
                </div>
                <div className='doctorsc2'>
                <img className='doctorsc1image' src={d4} alt='d4'></img>
                    <h5 className='doctorsc1h5'>Marc Parcival</h5>
                    <p className='doctorsc1p'>Professor</p>
                </div>
            </div>
        </div>
    )
}

export default Doctors