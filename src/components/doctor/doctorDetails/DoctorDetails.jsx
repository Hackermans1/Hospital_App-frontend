import React, { useEffect, useState } from 'react'
import './DoctorDetails.css';
import axios from "axios";
import { Link } from 'react-router-dom';

const DoctorDetails = () => {
    const [doctorDetails, setDoctorDetails] = useState([]);
    //const id = localStorage.getItem("userid");
    const getUserData = async (e) => {
        try {
            const token = localStorage.getItem('authToken');
            const details = await axios.get(`https://hospital-app-backend-1.onrender.com/getuserdetails`,{headers: {'Authorization': `${token}`}});
            console.log("hello")
            console.log(details.data.userData);
            // console.log(id);
            setDoctorDetails(details.data.userData);
        } catch (error) {
            alert('error');
        }
    };
    useEffect(() => {
        getUserData();
    }, [])
    return (
        <div className='doctordetails'>
            <div className='doctorimage'><img className='doctorprofileimage' src={`https://hospital-app-backend-1.onrender.com/`+doctorDetails.profile_image} alt='doctor'></img></div>
            <div className='doctordata'>
                <div className='doctordataleft'>
                    <div className='doctorlabel'><p className='doctorlabelp'><strong>Name: </strong>{doctorDetails.name}</p> </div>
                    <div className='doctorlabel'><p className='doctorlabelp'><strong>Email: </strong>{doctorDetails.email}</p></div>
                    <div className='doctorlabel'><p className='doctorlabelp'><strong>Role: </strong>{doctorDetails.role}</p></div>
                    <div className='doctorlabel'><p className='doctorlabelp'><strong>Gender: </strong>{doctorDetails.gender}</p></div>
                    <div className='doctorlabel'><p className='doctorlabelp'><strong>DOB: </strong>{doctorDetails.dob}</p></div>
                    <div className='doctorlabel'><p className='doctorlabelp'><strong>Phone: </strong>{doctorDetails.phone}</p></div>
                    <div className='doctorlabel'><p className='doctorlabelp'><strong>Aadhar Number: </strong>{doctorDetails.adhar_no}</p></div>
                    <button className='doctorprofileupdate'><Link className='doctorprofileupdatelink' to='/doctor/doctordetails/editdoctordetails'>Update Profile</Link></button>
                </div>
                <div className='doctordataright'>
                    <div className='doctorlabel'><p className='doctorlabelp'><strong>Father's Name: </strong>{doctorDetails.father_name}</p></div>
                    <div className='doctorlabel'><p className='doctorlabelp'><strong>Mother's Name: </strong>{doctorDetails.mother_name}</p></div>
                    <div className='doctorlabel'><p className='doctorlabelp'><strong>Marital Status: </strong>{doctorDetails.marital_status}</p></div>
                    <div className='doctorlabel'><p className='doctorlabelp'><strong>Qualification: </strong>{(doctorDetails.approval===0 || doctorDetails.approval===1)?"pending for approval":doctorDetails.qualification}</p></div>
                    <div className='doctorlabel'><p className='doctorlabelp'><strong>Specialization: </strong>{(doctorDetails.approval===0 || doctorDetails.approval===1)?"pending for approval":doctorDetails.specialization}</p></div>
                    <div className='doctorlabel'><p className='doctorlabelp'><strong>Work Experience: </strong>{(doctorDetails.approval===0 || doctorDetails.approval===1)?"pending for approval":doctorDetails.work_experience+" years"}</p></div>
                    <div className='doctorlabel'><p className='doctorlabelp'><strong>Fee/Consultation: </strong>{(doctorDetails.approval===0 || doctorDetails.approval===1)?"pending for approval":doctorDetails.fee_per_consultation}</p></div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDetails