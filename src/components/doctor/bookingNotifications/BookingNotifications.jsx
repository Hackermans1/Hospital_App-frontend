import React, { useEffect, useState } from 'react';
import './BookingNotifications.css';
import axios from 'axios';
import {Link} from 'react-router-dom'

const BookingNotifications = () => {
    const [bookings, setBookings] = useState([]);

    const getRequests = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`https://hospital-app-backend-1.onrender.com/getCurrentBookings`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            console.log(response);
            setBookings(response.data);
        } catch (error) {
            alert("error fetching details");
        }
    }

    useEffect(() => {
        getRequests();
    }, []);

    return (
        <div className='adminnotifications'>
            <div className='adminnotificationsouter'>
                {
                    bookings.map((item, index) => (
                        <div className='adminnotificationsrequest' key={index}>
                            <p className='adminnotificationsrequestp'>You recieved booking from {item.patientdetails[0].name}</p>
                            <Link to={`/doctor/bookingnotifications/writeprescription/${item._id}`}><button className='adminnotificationsrequestbutton'>Write Prescription</button></Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BookingNotifications