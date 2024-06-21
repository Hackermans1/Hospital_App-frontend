import React, { useState, useEffect } from 'react'
import './EditPatientDetails.css';
import axios from 'axios';


const EditPatientDetails = () => {
    const [patientDetails, setPatientDetails] = useState({
        name: "", email: "", role: "", gender: "", dob: "", phone: "",
        marital_status: "", qualification: "", work_experience: "",
        specialization: "", adhar_no: "", father_name: "", mother_name: "",
        fee_per_consultation: "", profile_image: null
    });
    const id = localStorage.getItem("userid");

    const getUserData = async (e) => {
        try {
            const token = localStorage.getItem("authToken")
            const details = await axios.get(`https://hospital-app-backend-1.onrender.com/getuserdetails`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setPatientDetails(details.data.userData);
        } catch (error) {
            alert('error');
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const onChange = (e) => {
        setPatientDetails({ ...patientDetails, [e.target.name]: e.target.value });
    }
    const onChangeImage = (e) => {
        setPatientDetails({ ...patientDetails, profile_image: e.target.files[0] });
    }

    const handleUpdate = async () => {
        // console.log(patientDetails.profile_image);
        try {
            // const { name, email, role, gender, dob, phone, marital_status, qualification, work_experience,
            //     specialization, adhar_no, father_name, mother_name, profile_image } = patientDetails;
            const profileData = new FormData();
            for (const key in patientDetails) {
                profileData.append(key, patientDetails[key]);
            }
            const token = localStorage.getItem('authToken');
            const response = await axios.patch(`https://hospital-app-backend-1.onrender.com/updateuserdetails`, profileData, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            alert("profile updated successfully");
        } catch (error) {
            alert("please try again");
        }
    }

    return (
        <div className='editpatientdetails'>
            <div className='editpatientimage'><img className='editpatientprofileimage' src={`https://hospital-app-backend-1.onrender.com/` + patientDetails.profile_image} alt='patient'></img></div>
            <input className='patientlabelinputprofile' type="file" accept=".jpg, .jpeg, .png" onChange={onChangeImage} />
            <div className='editpatientdata'>
                <div className='editpatientdataleft'>
                    <div className='editpatientlabel'>Name <input type='text' className='patientlabelinput' name="name" id='l1' value={patientDetails.name} onChange={onChange} disabled></input> </div>
                    <div className='editpatientlabel'>Email <input type='email' className='patientlabelinput' name="email" id='l1' value={patientDetails.email} onChange={onChange} disabled></input></div>
                    <div className='editpatientlabel'>Role <input type='text' className='patientlabelinput' name="role" id='l1' value={patientDetails.role} onChange={onChange} disabled></input></div>
                    <div className='editpatientlabel'>Gender <input type='text' className='patientlabelinput' name="gender" id='l1' value={patientDetails.gender} onChange={onChange}></input></div>
                    <div className='editpatientlabel'>DOB <input type='date' className='patientlabelinput' name="dob" id='l1' value={patientDetails.dob} onChange={onChange}></input></div>
                    <button className='editpatientprofileupdate' onClick={handleUpdate}>Update</button>
                </div>
                <div className='editpatientdataright'>
                    <div className='editpatientlabel'>Phone <input type='number' className='patientlabelinput' name="phone" id='l1' value={patientDetails.phone} onChange={onChange}></input></div>
                    <div className='editpatientlabel'>Aadhar Number <input type='number' className='patientlabelinput' name="adhar_no" id='l1' value={patientDetails.adhar_no} onChange={onChange}></input></div>
                    <div className='editpatientlabel'>Father's Name <input type='text' className='patientlabelinput' name="father_name" id='l1' value={patientDetails.father_name} onChange={onChange}></input></div>
                    <div className='editpatientlabel'>Mother's Name <input type='text' className='patientlabelinput' name="mother_name" id='l1' value={patientDetails.mother_name} onChange={onChange}></input></div>
                    <div className='editpatientlabel'>Marital Status <input type='text' className='patientlabelinput' name="marital_status" id='l1' value={patientDetails.marital_status} onChange={onChange}></input></div>
                </div>
            </div>
        </div>
    )
}

export default EditPatientDetails