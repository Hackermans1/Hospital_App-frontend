import React, { useState, useEffect } from 'react'
import './ForgotPassword.css'
import logo from '../images/loginleftimage2.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


const ForgotPassword = () => {
    const [forgotPasswordData, setForgotPasswordData] = useState({ email: "", password: "", confirmpassword: "", otp: "" });
    const [otpFlag, setOtpFlag] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const navigate = useNavigate();

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
        if (!forgotPasswordData.email) {
            alert('Email is required');
            return;
        }
        setOtpFlag(true);
        axios.post("https://hospital-app-backend-1.onrender.com/sendOtppassword", { email: forgotPasswordData.email })
            .then((response) => {
                //setOtpFlag(true);
                setCountdown(60); // 1 minute countdown
                alert("OTP sent!");
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
        if (forgotPasswordData.password != forgotPasswordData.confirmpassword) {
            alert('password not matching');
            return;
        }
        axios.post("https://hospital-app-backend-1.onrender.com/changePassword", { email: forgotPasswordData.email, password: forgotPasswordData.password, otp: forgotPasswordData.otp })
            .then((response) => {
                alert('password changed successfully')
                navigate('/login');
            })
            .catch((error) => {
                alert('Error registering:', error);
            });
    };

    const onChange = (event) => {
        setForgotPasswordData({ ...forgotPasswordData, [event.target.name]: event.target.value });
    }

    return (
        <div className='login'>
            <div className='loginleft'>
                <img className='loginleftimage' src={logo} alt='logo'></img>
            </div>
            <div className='loginright'>
                <h1></h1>
                <h3>Forgot Password</h3>
                {!otpFlag ? (
                    <div>
                        <label className='loginlabel'>Email:</label>
                        <input className='logininput' type="email" name="email" id='l5' value={forgotPasswordData.email} onChange={onChange} placeholder="Enter your email" required />
                        <div className="registerwrap">
                            <button className='registerbutton' type="submit" onClick={requestOtp}> Request OTP </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <label className='registerlabel'>Enter OTP:</label>
                        <input className='registerinput' type="text" name="otp" id='l1' value={forgotPasswordData.otp} onChange={onChange} placeholder="Enter otp" required />
                        <label className='registerlabel'>Enter New Password:</label>
                        <input className='registerinput' type="password" name="password" id='l1' value={forgotPasswordData.password} onChange={onChange} placeholder="Enter new password" required />
                        <label className='registerlabel'>Confirm Password:</label>
                        <input className='registerinput' type="password" name="confirmpassword" id='l1' value={forgotPasswordData.confirmpassword} onChange={onChange} placeholder="Confirm password" required />
                        <div className="registerwrap">
                            {(countdown > 0) && <button className='registerbutton' type="submit" onClick={submitData}> Change Password </button>}
                        </div>
                        <div className="registerwrap">
                            {(countdown == 0) && <button className='registerbutton' type="button" onClick={resendOtp} disabled={countdown > 0}> Resend OTP </button>}
                            {countdown > 0 && <p>Resend OTP in {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}</p>}
                        </div>
                    </div>
                )}
                <p> <Link to="/forgotpassword"> Forgot Password? </Link> </p>
                <p>Not registered? <Link to="/register"> Create an account </Link> </p>
            </div>
        </div>
    )
}

export default ForgotPassword