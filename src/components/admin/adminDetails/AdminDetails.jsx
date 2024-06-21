import React, { useEffect, useState } from 'react'
import './AdminDetails.css';
import axios from "axios";
import { Link } from 'react-router-dom';

const AdminDetails = () => {
    const [adminDetails, setAdminDetails] = useState([]);
    //const id = localStorage.getItem("userid");
    const getUserData = async (e) => {
        try {
            const token = localStorage.getItem('authToken');
            const details = await axios.get(`https://hospital-app-backend-1.onrender.com/getuserdetails`,{headers: {'Authorization': `${token}`}});
            //console.log(details.data.userData);
            console.log(details);
            setAdminDetails(details.data.userData);
            //console.log(adminDetails)
        } catch (error) {
            alert('error');
        }
    };
    useEffect(() => {
        getUserData();
    }, [])
    return (
        <div className='admindetails'>
            <div className='adminimage'><img className='adminprofileimage' src={`https://hospital-app-backend-1.onrender.com/` + adminDetails.profile_image} alt='admin'></img></div>
            <div className='admindata'>
                <div className='admindataleft'>
                    <div className='adminlabel'><p className='adminlabelp'><strong>Name: </strong>{adminDetails.name}</p> </div>
                    <div className='adminlabel'><p className='adminlabelp'><strong>Email: </strong>{adminDetails.email}</p></div>
                    <div className='adminlabel'><p className='adminlabelp'><strong>Role: </strong>{adminDetails.role}</p></div>
                    <div className='adminlabel'><p className='adminlabelp'><strong>Gender: </strong>{adminDetails.gender}</p></div>
                    <div className='adminlabel'><p className='adminlabelp'><strong>DOB: </strong>{adminDetails.dob}</p></div>
                    <button className='adminprofileupdate'><Link className='adminprofileupdatelink' to='/admin/admindetails/editadmindetails'>Update Profile</Link></button>
                </div>
                <div className='admindataright'>
                    <div className='adminlabel'><p className='adminlabelp'><strong>Phone: </strong>{adminDetails.phone}</p></div>
                    <div className='adminlabel'><p className='adminlabelp'><strong>Aadhar Number: </strong>{adminDetails.adhar_no}</p></div>
                    <div className='adminlabel'><p className='adminlabelp'><strong>Father's Name: </strong>{adminDetails.father_name}</p></div>
                    <div className='adminlabel'><p className='adminlabelp'><strong>Mother's Name: </strong>{adminDetails.mother_name}</p></div>
                    <div className='adminlabel'><p className='adminlabelp'><strong>Marital Status: </strong>{adminDetails.marital_status}</p></div>
                </div>
            </div>
        </div>
    )
}

export default AdminDetails