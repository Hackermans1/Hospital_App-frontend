import React, { useState, useEffect } from 'react';
import './Register.css';
import logo from '../images/loginleftimage3.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [otpFlag, setOtpFlag] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const navigate = useNavigate();
    const [registrationData, setRegistrationData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        otp: ""
    });

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const requestOtp = async (e) => {
        axios.post("https://hospital-app-backend-1.onrender.com/sendotp", { email: registrationData.email })
            .then((response) => {
                setOtpFlag(true);
                setCountdown(60); 
            })
            .catch((error) => {
                console.log(error);
                setOtpFlag(false);
                alert('Error registering:', error);
            });
    };

    const resendOtp = async (e) => {
        setCountdown(60); // Reset the countdown to 1 minute
        requestOtp(e);
    };

    const submitData = async (e) => {
        axios.post("https://hospital-app-backend-1.onrender.com/register", registrationData)
            .then((response) => {
                navigate('/login');
            })
            .catch((error) => {
                alert('Error registering:', error);
            });
    };

    const onChange = (event) => {
        setRegistrationData({ ...registrationData, [event.target.name]: event.target.value });
    };

    return (
        <div className='register'>
            <div className='registerleft'>
                <img className='registerleftimage' src={logo} alt='logo'></img>
            </div>
            <div className='registerright'>
                {!otpFlag ? (
                    <div>
                        <h3>Enter your details</h3>
                        <label className='registerlabel'>Name:</label>
                        <input className='registerinput' type="text" name="name" id='l1' value={registrationData.name} onChange={onChange} placeholder="Enter your full name" required />
                        <label className='registerlabel'>Email:</label>
                        <input className='registerinput' type="email" name="email" id='l1' value={registrationData.email} onChange={onChange} placeholder="Enter your email" required />
                        <label className='registerlabel'>Password:</label>
                        <input className='registerinput' type="text" name="password" id='l1' value={registrationData.password} onChange={onChange} placeholder="Enter new password" required />
                        <label className='registerlabel'>Role:</label>
                        <select className='registerselect' name="role" value={registrationData.role} onChange={onChange} id="role" required>
                            <option value="" disabled selected>Select your role</option>
                            <option value="doctor">doctor</option>
                            <option value="patient">patient</option>
                            <option value="admin">admin</option>
                        </select>
                        <div className="registerwrap">
                            <button className='registerbutton' type="submit" onClick={requestOtp}> Register </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <label className='registerlabel'>Enter OTP:</label>
                        <input className='registerinput' type="text" name="otp" id='l1' value={registrationData.otp} onChange={onChange} placeholder="Enter otp" required />
                        <div className="registerwrap">
                            {(countdown > 0) && <button className='registerbutton' type="submit" onClick={submitData}> Register </button>}
                        </div>
                        <div className="registerwrap">
                            {(countdown == 0) && <button className='registerbutton' type="button" onClick={resendOtp} disabled={countdown > 0}> Resend OTP </button>}
                            {countdown > 0 && <p>Resend OTP in {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}</p>}
                        </div>
                    </div>
                )}
                <p>Already registered? <Link to="/login"> Login </Link> </p>
            </div>
        </div>
    );
};

export default Register;
