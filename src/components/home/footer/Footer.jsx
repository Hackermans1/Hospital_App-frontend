import React from 'react'
import './Footer.css';
import facebook from '../images/fb.png';
import twitter from '../images/twitter.png';
import instagram from '../images/insta.png';
import linkedin from '../images/linkedin.png';
import email from '../images/email.png';
import phone from '../images/phone.png';
import complain from '../images/complain.jpg';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='firstdiv'>
        <div className='line'></div>
        <Link className='ll'>Home</Link>
        <Link className='ll'>About</Link>
        <Link className='ll'>Events</Link>
        <Link className='ll'>Gallery</Link>
        <Link className='ll'>Contact Us</Link>
      </div>
      <div className='seconddiv'>
        <div className='line'></div>
        <div className='n11'>
          <div className='hnav1'><img className='himg' src={facebook} alt=''></img></div>
          <div className='hnav1'><img className='himg' src={linkedin} alt=''></img></div>
          <div className='hnav1'><img className='himg' src={twitter} alt=''></img></div>
          <div className='hnav1'><img className='himg' src={instagram} alt=''></img></div>
        </div>
      </div>
      <div className='thirddiv'>
        <h3 className='bar1'>Contact</h3>
        <div className='line'></div>
        <div className='bar'>
          <div className='bar1'><img className='barimg' src={email} alt=''></img><Link to="">karancpppython@gmail.com</Link></div>
          <div className='bar1'><img className='barimg' src={phone} alt=''></img>9832826152</div>
          <div className='bar1'><img className='barimg' src={complain} alt=''></img><Link to="">Complaint</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Footer