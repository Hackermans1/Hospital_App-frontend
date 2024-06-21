import React, { useState } from 'react'
import './AddNews.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNews = () => {
  const [newsData, setNewsData] = useState({date:"", news:""});
  const navigate = useNavigate();

  const submitNews = ()=> {
    const token = localStorage.getItem('authToken');
    axios.post("https://hospital-app-backend-1.onrender.com/newsentry",newsData, {
      headers: {
        'Authorization': `${token}`
      }
    })
    .then((response) => {
      alert("news added");
      navigate('/admin/news');
    })
    .catch(error=>{
      alert("error occured");
    })
  }

  const onChange = (event)=> {
    setNewsData({...newsData, [event.target.name]:event.target.value});
  }
  return (
    <div className='news'>
      <h3>Add New News</h3>
      <div>
      <label>Date:</label>
        <input type="date" name="date" value={newsData.date} onChange={onChange} required />
        <label>News:</label>
        <textarea name="news" value={newsData.news} onChange={onChange} placeholder="Enter news" required />
        <div className="wrap">
          <button type="submit" onClick={submitNews}> Add </button>
        </div>
      </div>
    </div>
  )
}

export default AddNews