import React from 'react'
import './FeaturedServices.css'
import doctor_icon from '../images/doctor-icon.jpg';
import emergency from '../images/emergency.jpg';
import medicine from '../images/medicine.jpg';
import profession from '../images/profession-icon.jpg';

const FeaturedServices = () => {
    return (
        <div className='featuredservices'>
            <div className='featuredupper'>
                <h2>Featured Services</h2>
                <p>We cover a big variety of medical services</p>
            </div>
            <div className='featuredlower'>
                <div className='lowerc1'>
                    <img className='lowerc1image' src={medicine} alt='medicine'></img>
                    <h5 className='lowerc1h5'>Medical Treatment</h5>
                    <p className='lowerc1p'>Cum sociis natoque penatibus et magnis dis parturient montesmus.
                        Pro vel nibh et elit mollis commodo et nec augueique</p>
                </div>
                <div className='lowerc2'>
                    <img className='lowerc1image' src={emergency} alt='emergency'></img>
                    <h5 className='lowerc1h5'>Emergency Help</h5>
                    <p className='lowerc1p'>Cum sociis natoque penatibus et magnis dis parturient montesmus.
                        Pro vel nibh et elit mollis commodo et nec augueique</p>
                </div>
                <div className='lowerc3'>
                    <img className='lowerc1image' src={doctor_icon} alt='doctor_icon'></img>
                    <h5 className='lowerc1h5'>Qualified Doctors</h5>
                    <p className='lowerc1p'>Cum sociis natoque penatibus et magnis dis parturient montesmus.
                        Pro vel nibh et elit mollis commodo et nec augueique</p>
                </div>
                <div className='lowerc4'>
                    <img className='lowerc1image' src={profession} alt='profession'></img>
                    <h5 className='lowerc1h5'>Medical professionals</h5>
                    <p className='lowerc1p'>Cum sociis natoque penatibus et magnis dis parturient montesmus.
                        Pro vel nibh et elit mollis commodo et nec augueique</p>
                </div>
            </div>
        </div>
    )
}

export default FeaturedServices