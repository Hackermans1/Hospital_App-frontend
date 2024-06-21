import React, { useState, useEffect } from 'react';
import './SliderAndNews.css'
import axios from "axios";


const SliderAndNews = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [newsData, setNewsData] = useState([]);

    // useEffect for fetching news data
    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await axios.get("https://hospital-app-backend-1.onrender.com/latestnews");
                setNewsData(response.data.latestnewsdata);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };
        fetchNewsData();
        console.log(newsData); 
    }, []);

    // useEffect for slides
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 6000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentSlide, slides.length]);

    return (
        <div className='sliderandnews'>
            <div className='left'>
                <img className="images" src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
            </div>
            <div className='right'>
                <div className='outerright'>
                    {
                        newsData.map((item, index) => (
                            <div className='innerright' key={index}>
                                <p className='date'>{item.date}</p>
                                <p className='news'>{item.news}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SliderAndNews