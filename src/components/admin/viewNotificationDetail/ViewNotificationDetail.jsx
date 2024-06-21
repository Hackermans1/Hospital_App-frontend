import React, { useEffect, useState } from 'react'
import './ViewNotificationDetail.css';
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';

const ViewNotificationDetail = () => {
    const [notificationDetails, setNotificationDetails] = useState([]);
    const { id } = useParams("");
    const navigate = useNavigate();
    const getUserData = async (e) => {
        try {
            const token = localStorage.getItem('authToken');
            const details = await axios.get(`https://hospital-app-backend-1.onrender.com/getdoctordetails`, {params: {id: id}, headers: { 'Authorization': `${token}`}});
            //console.log(details);
            setNotificationDetails(details.data);
        } catch (error) {
            alert('error');
        }
    };
    useEffect(() => {
        getUserData();
    }, []);

    const approveRequest = async () => {
        notificationDetails.approval = 2;
        notificationDetails.id = id;
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.patch(`https://hospital-app-backend-1.onrender.com/approveDoctor`, notificationDetails, { headers: { 'Authorization': `${token}`}});
            alert("approved");
            navigate('/admin/adminnotifications');
        } catch (error) {
            alert("error occured");
        }
    };

    const rejectRequest = async () => {
        notificationDetails.approval = 0;
        notificationDetails.id = id;
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.patch(`https://hospital-app-backend-1.onrender.com/approveDoctor`, notificationDetails, { headers: { 'Authorization': `${token}`}});
            alert("rejected");
            navigate('/admin/adminnotifications');
        } catch (error) {
            alert("error occured");
        }
    }

    return (
        <div className='notificationdetails'>
            <div className='notificationimage'><img className='notificationprofileimage' src={`https://hospital-app-backend-1.onrender.com/` + notificationDetails.profile_image} alt='notification'></img></div>
            <div className='notificationdata'>
                <div className='notificationdataleft'>
                    <div className='notificationlabel'><p className='notificationlabelp'><strong>Name: </strong>{notificationDetails.name}</p> </div>
                    <div className='notificationlabel'><p className='notificationlabelp'><strong>Email: </strong>{notificationDetails.email}</p></div>
                    <div className='notificationlabel'><p className='notificationlabelp'><strong>Role: </strong>{notificationDetails.role}</p></div>
                    <div className='notificationlabel'><p className='notificationlabelp'><strong>Gender: </strong>{notificationDetails.gender}</p></div>
                    <div className='notificationlabel'><p className='notificationlabelp'><strong>DOB: </strong>{notificationDetails.dob}</p></div>
                    <div className='notificationlabel'><p className='notificationlabelp'><strong>Phone: </strong>{notificationDetails.phone}</p></div>
                    <div className='notificationlabel'><p className='notificationlabelp'><strong>Aadhar Number: </strong>{notificationDetails.adhar_no}</p></div>
                    <button className='notificationprofileupdate1' onClick={approveRequest}><Link className='notificationprofileupdatelink1' to=''>Approve</Link></button>
                </div>
                <div className='notificationdataright'>
                    <div className='notificationlabel'><p className='notificationlabelp'><strong>Father's Name: </strong>{notificationDetails.father_name}</p></div>
                    <div className='notificationlabel'><p className='notificationlabelp'><strong>Mother's Name: </strong>{notificationDetails.mother_name}</p></div>
                    <div className='notificationlabel'><p className='notificationlabelp'><strong>Marital Status: </strong>{notificationDetails.marital_status}</p></div>
                    <div className='notificationlabel'><p className='notificationlabelp'><strong>Qualification: </strong>{notificationDetails.qualification}</p></div>
                    <div className='notificationlabel'><p className='notificationlabelp'><strong>Specialization: </strong>{notificationDetails.specialization}</p></div>
                    <div className='notificationlabel'><p className='notificationlabelp'><strong>Work Experience: </strong>{notificationDetails.work_experience + " years"}</p></div>
                    <div className='notificationlabel'><p className='notificationlabelp'><strong>Fee/Consultation: </strong>{notificationDetails.fee_per_consultation}</p></div>
                    <button className='notificationprofileupdate2' onClick={rejectRequest}><Link className='notificationprofileupdatelink2' to='/admin/adminnotifications'>Reject</Link></button>
                </div>
            </div>
        </div>
    )
}

export default ViewNotificationDetail