import React, { useState, useEffect } from 'react'
import './EditAdminDetails.css';
import axios from 'axios';


const EditAdminDetails = () => {
    const [adminDetails, setAdminDetails] = useState({
        name: "", email: "", role: "", gender: "", dob: "", phone: "",
        marital_status: "", qualification: "", work_experience: "",
        specialization: "", adhar_no: "", father_name: "", mother_name: "",
        fee_per_consultation: "", profile_image: null
    });
    //const id = localStorage.getItem("userid");

    const getUserData = async (e) => {
        try {
            const token = localStorage.getItem("authToken")
            const details = await axios.get(`https://hospital-app-backend-1.onrender.com/getuserdetails`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setAdminDetails(details.data.userData);
        } catch (error) {
            alert('error');
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const onChange = (e) => {
        setAdminDetails({ ...adminDetails, [e.target.name]: e.target.value });
    }
    const onChangeImage = (e) => {
        setAdminDetails({ ...adminDetails, profile_image: e.target.files[0] });
    }

    const handleUpdate = async () => {
        // console.log(adminDetails.profile_image);
        try {
            // const { name, email, role, gender, dob, phone, marital_status, qualification, work_experience,
            //     specialization, adhar_no, father_name, mother_name, profile_image } = adminDetails;
            const profileData = new FormData();
            for (const key in adminDetails) {
                profileData.append(key, adminDetails[key]);
            }
            const token = localStorage.getItem('authToken');
            const response = await axios.patch(`https://hospital-app-backend-1.onrender.com/updateuserdetails`, profileData, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            //console.log(response);
            alert("profile updated successfully");
        } catch (error) {
            alert("please try again");
        }
    }

    return (
        <div className='editadmindetails'>
            <div className='editadminimage'><img className='editadminprofileimage' src={`https://hospital-app-backend-1.onrender.com/` + adminDetails.profile_image} alt='admin'></img></div>
            <input className='adminlabelinputprofile' type="file" accept=".jpg, .jpeg, .png" onChange={onChangeImage} />
            <div className='editadmindata'>
                <div className='editadmindataleft'>
                    <div className='editadminlabel'>Name <input type='text' className='adminlabelinput' name="name" id='l1' value={adminDetails.name} onChange={onChange} disabled></input> </div>
                    <div className='editadminlabel'>Email <input type='email' className='adminlabelinput' name="email" id='l1' value={adminDetails.email} onChange={onChange} disabled></input></div>
                    <div className='editadminlabel'>Role <input type='text' className='adminlabelinput' name="role" id='l1' value={adminDetails.role} onChange={onChange} disabled></input></div>
                    <div className='editadminlabel'>Gender <input type='text' className='adminlabelinput' name="gender" id='l1' value={adminDetails.gender} onChange={onChange}></input></div>
                    <div className='editadminlabel'>DOB <input type='date' className='adminlabelinput' name="dob" id='l1' value={adminDetails.dob} onChange={onChange}></input></div>
                    <button className='editadminprofileupdate' onClick={handleUpdate}>Update</button>
                </div>
                <div className='editadmindataright'>
                    <div className='editadminlabel'>Phone <input type='number' className='adminlabelinput' name="phone" id='l1' value={adminDetails.phone} onChange={onChange}></input></div>
                    <div className='editadminlabel'>Aadhar Number <input type='number' className='adminlabelinput' name="adhar_no" id='l1' value={adminDetails.adhar_no} onChange={onChange}></input></div>
                    <div className='editadminlabel'>Father's Name <input type='text' className='adminlabelinput' name="father_name" id='l1' value={adminDetails.father_name} onChange={onChange}></input></div>
                    <div className='editadminlabel'>Mother's Name <input type='text' className='adminlabelinput' name="mother_name" id='l1' value={adminDetails.mother_name} onChange={onChange}></input></div>
                    <div className='editadminlabel'>Marital Status <input type='text' className='adminlabelinput' name="marital_status" id='l1' value={adminDetails.marital_status} onChange={onChange}></input></div>
                </div>
            </div>
        </div>
    )
}

export default EditAdminDetails