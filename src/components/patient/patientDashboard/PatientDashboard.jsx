import React, { useState, useEffect } from 'react';
import './PatientDashboard.css';
import axios from 'axios';
import SelectDate from '../selectDate/SelectDate';

const PatientDashboard = () => {
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [selectedBookNow, setSelectedBookNow] = useState([]);

  const getdoctors = async () => {
    try {
      const dataset = await axios.get("https://hospital-app-backend-1.onrender.com/getapproveddoctors");
      setDoctorDetails(dataset.data);
    } catch (error) {
      alert(error)
    }
  };

  useEffect(() => {
    getdoctors();
  }, []);

  const toggleAvailability = (index) => {
    setSelectedBookNow((prevSelected) => {
      const isSelected = prevSelected.includes(index);
      return isSelected ? prevSelected.filter((selected) => selected !== index) : [...prevSelected, index];
    });
  };

  return (
    <div className='patientdashboard'>
      {
        doctorDetails.map((item, index) => (
          <div key={index}>
            <div className='itemclass'>
              <img className='patientdashboardimage' src={`https://hospital-app-backend-1.onrender.com/` + item.profile_image} alt={item.name}></img>
              <div className='detailscss'>
                <div><h4>{item.name}</h4></div>
                <div><p>{item.specialization}</p></div>
                <div><p>{item.work_experience} years experience overall</p></div>
                <div><p><b>{item.fee_per_consultation}</b> Consultation fee at clinic</p></div>
              </div>
              <div className='bookcss'>
                <button className='bookbuttondashboard' onClick={() => toggleAvailability(index)}>Book Now</button>
              </div>
            </div>
            {/* {selectedBookNow.includes(index) && (<BookNow id={item._id} email={item.email} />)} */}
            {selectedBookNow.includes(index) && (<SelectDate id={item._id} email={item.email} />)}
          </div>
        ))
      }
    </div>
  );
};

export default PatientDashboard;
