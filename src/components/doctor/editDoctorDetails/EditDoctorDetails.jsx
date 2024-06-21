import React, { useState, useEffect } from 'react'
import './EditDoctorDetails.css';
import axios from 'axios';


const EditDoctorDetails = () => {
    const [doctorDetails, setDoctorDetails] = useState({
        name: "", email: "", role: "", gender: "", dob: "", phone: "",
        marital_status: "", qualification: "", work_experience: "", approval: "",
        specialization: "", adhar_no: "", father_name: "", mother_name: "",
        fee_per_consultation: "",profile_image: null
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
            setDoctorDetails(details.data.userData);
        } catch (error) {
            alert('error');
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const onChange = (e) => {
        setDoctorDetails({ ...doctorDetails, [e.target.name]: e.target.value });
    }
    const onChangeImage = (e) => {
        setDoctorDetails({ ...doctorDetails, profile_image: e.target.files[0] });
    }

    const handleUpdate = async () => {
        // console.log(doctorDetails.profile_image);
        try {
            const profileData = new FormData();
            for (const key in doctorDetails) {
                profileData.append(key, doctorDetails[key]);
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
        <div className='editdoctordetails'>
            <div className='editdoctorimage'><img className='editdoctorprofileimage' src={`https://hospital-app-backend-1.onrender.com/`+doctorDetails.profile_image} alt='doctor'></img></div>
            <input className='doctorlabelinputprofile' type="file" accept=".jpg, .jpeg, .png" onChange={onChangeImage} />
            <div className='editdoctordata'>
                <div className='editdoctordataleft'>
                    <div className='editdoctorlabel'>Name <input type='text' className='doctorlabelinput' name="name" id='l1' value={doctorDetails.name} onChange={onChange} disabled></input> </div>
                    <div className='editdoctorlabel'>Email <input type='email' className='doctorlabelinput' name="email" id='l1' value={doctorDetails.email} onChange={onChange} disabled></input></div>
                    <div className='editdoctorlabel'>Role <input type='text' className='doctorlabelinput' name="role" id='l1' value={doctorDetails.role} onChange={onChange} disabled></input></div>
                    <div className='editdoctorlabel'>Gender <input type='text' className='doctorlabelinput' name="gender" id='l1' value={doctorDetails.gender} onChange={onChange}></input></div>
                    <div className='editdoctorlabel'>DOB <input type='date' className='doctorlabelinput' name="dob" id='l1' value={doctorDetails.dob} onChange={onChange}></input></div>
                    <div className='editdoctorlabel'>Phone <input type='number' className='doctorlabelinput' name="phone" id='l1' value={doctorDetails.phone} onChange={onChange}></input></div>
                    <div className='editdoctorlabel'>Aadhar Number <input type='number' className='doctorlabelinput' name="adhar_no" id='l1' value={doctorDetails.adhar_no} onChange={onChange}></input></div>
                    <button className='editdoctorprofileupdate' onClick={handleUpdate}>Update</button>
                </div>
                <div className='editdoctordataright'>
                    <div className='editdoctorlabel'>Father's Name <input type='text' className='doctorlabelinput' name="father_name" id='l1' value={doctorDetails.father_name} onChange={onChange}></input></div>
                    <div className='editdoctorlabel'>Mother's Name <input type='text' className='doctorlabelinput' name="mother_name" id='l1' value={doctorDetails.mother_name} onChange={onChange}></input></div>
                    <div className='editdoctorlabel'>Marital Status <input type='text' className='doctorlabelinput' name="marital_status" id='l1' value={doctorDetails.marital_status} onChange={onChange}></input></div>
                    <div className='editdoctorlabel'>Qualification <input type='text' className='doctorlabelinput' name="qualification" id='l1' value={doctorDetails.qualification} onChange={onChange}></input></div>
                    <div className='editdoctorlabel'>Specialization <input type='text' className='doctorlabelinput' name="specialization" id='l1' value={doctorDetails.specialization} onChange={onChange}></input></div>
                    <div className='editdoctorlabel'>Work Experience (in years) <input type='number' className='doctorlabelinput' name="work_experience" id='l1' value={doctorDetails.work_experience} onChange={onChange}></input></div>
                    <div className='editdoctorlabel'>Fee/Consultation <input type='number' className='doctorlabelinput' name="fee_per_consultation" id='l1' value={doctorDetails.fee_per_consultation} onChange={onChange}></input></div>
                </div>
            </div>
        </div>
    )
}

export default EditDoctorDetails