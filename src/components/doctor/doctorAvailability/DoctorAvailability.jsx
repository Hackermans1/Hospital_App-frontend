import React, { useState } from 'react';
import './DoctorAvailability.css';
import axios from 'axios';

const DoctorAvailability = () => {
  const [availabilityData, setAvailabilityData] = useState({
    doctor_id: localStorage.getItem("userid"),
    time_slot: "",
    morning: { from: "", to: "" },
    afternoon: { from: "", to: "" },
    evening: { from: "", to: "" },
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("m") || name.startsWith("a") || name.startsWith("e")) {
      const period = name.split('.')[0];
      const timeType = name.split('.')[1];

      setAvailabilityData((prevData) => ({
        ...prevData,
        [period]: {...prevData[period],
        [timeType]: value,
        },
      }));
    } else {
      setAvailabilityData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    //console.log(name,value);
  };

  const submitData = async(e)=> {
    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.post("https://hospital-app-backend-1.onrender.com/submitdoctoravailability",availabilityData,{headers: {'Authorization': `${token}`}});
      alert("submission successful");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className='doctoravailabilitycss'>
      <div className='alldaycss'>
        <div className='timeslotcss'>
          <select
            className='registerselect'
            name="time_slot"
            id="slot"
            required
            onChange={onChange}
            value={availabilityData.time_slot}
          >
            <option value="" disabled>Select time slot duration</option>
            <option value="10">10 mins</option>
            <option value="15">15 mins</option>
            <option value="20">20 mins</option>
            <option value="30">30 mins</option>
          </select>
        </div>
        <div className='morningcss'>
          <h3 className='cssh3'>Select Morning's Availability</h3>
          <label className='csslabel1'>From</label>
          <input
            className='cssinput1'
            type='time'
            name="morning.from"
            value={availabilityData.morning.from}
            onChange={onChange}
          />
          <label className='csslabel2'>To</label>
          <input
            className='cssinput2'
            type='time'
            name="morning.to"
            value={availabilityData.morning.to}
            onChange={onChange}
          />
        </div>
        <div className='afternooncss'>
          <h3 className='cssh3'>Select Afternoon's Availability</h3>
          <label className='csslabel1'>From</label>
          <input
            className='cssinput1'
            type='time'
            name="afternoon.from"
            value={availabilityData.afternoon.from}
            onChange={onChange}
          />
          <label className='csslabel2'>To</label>
          <input
            className='cssinput2'
            type='time'
            name="afternoon.to"
            value={availabilityData.afternoon.to}
            onChange={onChange}
          />
        </div>
        <div className='eveningcss'>
          <h3 className='cssh3'>Select Evening's Availability</h3>
          <label className='csslabel1'>From</label>
          <input
            className='cssinput1'
            type='time'
            name="evening.from"
            value={availabilityData.evening.from}
            onChange={onChange}
          />
          <label className='csslabel2'>To</label>
          <input
            className='cssinput2'
            type='time'
            name="evening.to"
            value={availabilityData.evening.to}
            onChange={onChange}
          />
        </div>
        <div><button className='updatebutton' onClick={submitData}>Update</button></div>
      </div>
    </div>
  )
}

export default DoctorAvailability