import React, { useEffect, useState } from 'react'
import './PatientDetails.css';
import axios from "axios";
import { Link } from 'react-router-dom';

const PatientDetails = () => {
    const [patientDetails, setPatientDetails] = useState([]);
    const id = localStorage.getItem("userid");
    const getUserData = async (e) => {
        try {
            const token = localStorage.getItem('authToken');
            const details = await axios.get(`https://hospital-app-backend-1.onrender.com/getuserdetails`, { headers: { 'Authorization': `${token}` } });
            // console.log(details.data.userData);
            // console.log(id);
            setPatientDetails(details.data.userData);
        } catch (error) {
            alert('error');
        }
    };
    useEffect(() => {
        getUserData();
    }, [])
    return (
        <div className='patientdetails'>
            <div className='patientimage'><img className='patientprofileimage' src={`https://hospital-app-backend-1.onrender.com/` + patientDetails.profile_image} alt='patient'></img></div>
            <div className='patientdata'>
                <div className='patientdataleft'>
                    <div className='patientlabel'><p className='patientlabelp'><strong>Name: </strong>{patientDetails.name}</p> </div>
                    <div className='patientlabel'><p className='patientlabelp'><strong>Email: </strong>{patientDetails.email}</p></div>
                    <div className='patientlabel'><p className='patientlabelp'><strong>Role: </strong>{patientDetails.role}</p></div>
                    <div className='patientlabel'><p className='patientlabelp'><strong>Gender: </strong>{patientDetails.gender}</p></div>
                    <div className='patientlabel'><p className='patientlabelp'><strong>DOB: </strong>{patientDetails.dob}</p></div>
                    <button className='patientprofileupdate'><Link className='patientprofileupdatelink' to='/patient/patientdetails/editpatientdetails'>Update Profile</Link></button>
                </div>
                <div className='patientdataright'>
                    <div className='patientlabel'><p className='patientlabelp'><strong>Phone: </strong>{patientDetails.phone}</p></div>
                    <div className='patientlabel'><p className='patientlabelp'><strong>Aadhar Number: </strong>{patientDetails.adhar_no}</p></div>
                    <div className='patientlabel'><p className='patientlabelp'><strong>Father's Name: </strong>{patientDetails.father_name}</p></div>
                    <div className='patientlabel'><p className='patientlabelp'><strong>Mother's Name: </strong>{patientDetails.mother_name}</p></div>
                    <div className='patientlabel'><p className='patientlabelp'><strong>Marital Status: </strong>{patientDetails.marital_status}</p></div>
                </div>
            </div>
        </div>
    )
}

export default PatientDetails