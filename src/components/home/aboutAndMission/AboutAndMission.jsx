import React from 'react'
import './AboutAndMission.css'
import about from '../images/about.jpg'

const AboutAndMission = () => {
  return (
    <div className='aboutandmission'>
      <div className='leftabout'>
        <div className='leftaboutupper'>
          <div className='aboutus'>
            <h4 className='aboutusstyle'>About Us</h4>
            <h6 className='aboutusstyle'>What we are and our history</h6>
            <p className='aboutusstyle'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book.</p>
          </div>
        </div>
        <div className='leftaboutlower'>
          <div className='visionandmission'>
            <h4 className='aboutusstyle'>Vision & Mission</h4>
            <h6 className='aboutusstyle'>What we are and our history</h6>
            <p className='aboutusstyle'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries.</p>
          </div>
        </div>
      </div>
      <div className='rightabout'>
        <img className='rightaboutimage' src={about} alt='about'></img>
      </div>
    </div>
  )
}

export default AboutAndMission