import React from 'react'
import './Home.css'
import Navbar1 from './navbar1/Navbar1'
import Navbar2 from './navbar2/Navbar2'
import Navbar3 from './navbar3/Navbar3'
import SliderAndNews from './sliderAndNews/SliderAndNews'
import data from './data/data.json'
import Middle from './middle/Middle'
import AboutAndMission from './aboutAndMission/AboutAndMission'
import FeaturedServices from './featuredServices/FeaturedServices'
import Doctors from './doctors/Doctors'
import Footer from './footer/Footer'




const Home = () => {
    return (
        <div className='home'>
            <Navbar1 />
            <Navbar2 />
            <Navbar3 />
            <SliderAndNews slides={data.banner.start}/>
            <Middle />
            <AboutAndMission />
            <FeaturedServices />
            <Doctors />
            <Footer />
        </div>
    )
}

export default Home