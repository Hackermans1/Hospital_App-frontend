import React, { useState, useEffect } from 'react'
import './Login.css'
import logo from '../images/loginleftimage2.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


const Login = () => {
  const [registrationData, setRegistrationData] = useState({ email: "", password: "", otp: "" });
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
    if (!registrationData.email) {
      alert('Email is required');
      return;
    }
    setOtpFlag(true);
    axios.post("https://hospital-app-backend-1.onrender.com/sendotp", { email: registrationData.email })
      .then((response) => {
        setOtpFlag(true);
        setCountdown(60); // 1 minute countdown
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

  const loginUsingPassword = async (e) => {
    if (!registrationData.email && !registrationData.password) {
      alert('Email and password are required');
      return;
    }
    axios.post("https://hospital-app-backend-1.onrender.com/login", registrationData).
      then(response => {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("userid", response.data.userData._id);
        //console.log(localStorage.getItem("authToken"));
        //console.log(response.data);
        if (response.data.userData.role === "admin") {
          navigate(`/admin/admindetails`);
        }
        else if (response.data.userData.role === "doctor") {
          navigate(`/doctor/doctordetails`);
        }
        else if (response.data.userData.role === "patient") {
          navigate(`/patient/getapproveddoctors`);
        }
        else if (response.data.userData.role === "others") {
          navigate('/');
        }
      })
      .catch(error => {
        alert('Error logging in');
      })
  }

  const loginUsingOTP = async (e) => {
    if (!registrationData.email) {
      alert('Email is required');
      return;
    }
    axios.post("https://hospital-app-backend-1.onrender.com/verifyOtp", registrationData)
      .then((response) => {
        if (response.data.userData.role === "admin") {
          navigate(`/admin/admindetails`);
        }
        else if (response.data.userData.role === "doctor") {
          navigate(`/doctor/doctordetails`);
        }
        else if (response.data.userData.role === "patient") {
          navigate(`/patient/getapproveddoctors`);
        }
        else if (response.data.userData.role === "others") {
          navigate('/');
        }
      })
      .catch((error) => {
        alert('Error registering:', error);
      });
  };

  const onChange = (event) => {
    setRegistrationData({ ...registrationData, [event.target.name]: event.target.value });
  }

  return (
    <div className='login'>
      <div className='loginleft'>
        <img className='loginleftimage' src={logo} alt='logo'></img>
      </div>
      <div className='loginright'>
        <h1></h1>
        <h3>Enter your login credentials</h3>
        {!otpFlag ? (
          <div>
            <label className='loginlabel'>Email:</label>
            <input className='logininput' type="email" name="email" id='l5' value={registrationData.email} onChange={onChange} placeholder="Enter your email" required />
            <label className='loginlabel'>Password:</label>
            <input className='logininput' type="password" name="password" id='l6' value={registrationData.password} onChange={onChange} placeholder="Enter your password" />
            <div className="wrap">
              <button className='loginbutton' type="submit" onClick={loginUsingPassword}> Login using Password </button>
            </div>
            <div className="registerwrap">
              <button className='registerbutton' type="submit" onClick={requestOtp}> Login using OTP </button>
            </div>
          </div>
        ) : (
          <div>
            <label className='registerlabel'>Enter OTP:</label>
            <input className='registerinput' type="text" name="otp" id='l1' value={registrationData.otp} onChange={onChange} placeholder="Enter otp" required />
            <div className="registerwrap">
              {(countdown > 0) && <button className='registerbutton' type="submit" onClick={loginUsingOTP}> Login using OTP </button>}
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

export default Login