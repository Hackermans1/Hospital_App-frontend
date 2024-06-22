// Login.js
import React, { useState, useEffect } from 'react';
import './Login.css';
import logo from '../images/loginleftimage2.png';
import doc from '../images/loginlogo.png'
import sgn from '../images/sgn.png'
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
    axios.post("https://hospital-app-backend-1.onrender.com/login", registrationData)
      .then(response => {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("userid", response.data.userData._id);
        if (response.data.userData.role === "admin") {
          navigate(`/admin/admindetails`);
        } else if (response.data.userData.role === "doctor") {
          navigate(`/doctor/doctordetails`);
        } else if (response.data.userData.role === "patient") {
          navigate(`/patient/getapproveddoctors`);
        } else if (response.data.userData.role === "others") {
          navigate('/');
        }
      })
      .catch(error => {
        alert('Error logging in');
      });
  };

  const loginUsingOTP = async (e) => {
    if (!registrationData.email) {
      alert('Email is required');
      return;
    }
    axios.post("https://hospital-app-backend-1.onrender.com/verifyOtp", registrationData)
      .then((response) => {
        if (response.data.userData.role === "admin") {
          navigate(`/admin/admindetails`);
        } else if (response.data.userData.role === "doctor") {
          navigate(`/doctor/doctordetails`);
        } else if (response.data.userData.role === "patient") {
          navigate(`/patient/getapproveddoctors`);
        } else if (response.data.userData.role === "others") {
          navigate('/');
        }
      })
      .catch((error) => {
        alert('Error registering:', error);
      });
  };

  const onChange = (event) => {
    setRegistrationData({ ...registrationData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });

    return () => {
      signUpButton.removeEventListener('click', () => {});
      signInButton.removeEventListener('click', () => {});
    };
  }, []);

  return (
    <div className='login'>
      <div id="container" className='container'>
        <div className='form-container sign-up-container'>
          <form>
            <h1>Create Account</h1>
            <input type="text" placeholder="Enter Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="role" placeholder="Role" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className='form-container sign-in-container'>
          <form>
            <h1>Sign in</h1>
            
            <input type="email" placeholder="Email" value={registrationData.email} onChange={onChange} name="email" required/>
            <input type="password" placeholder="Password" value={registrationData.password} onChange={onChange} name="password" />
            <p><Link to="/forgotpassword">Forgot your password?</Link></p>
            <button type="button" onClick={loginUsingPassword}>Sign In</button>
          </form>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Welcome Back!</h1>
              <p> Log in to access your personalized dashboard and healthcare services.</p>
              <img src={doc} alt="Descriptive text about the image" />
              <button className='ghost' id='signIn'>Sign In</button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>Welcome, To NIMS Hospital!, New to our platform?</h1>
              <h2>Join us today for a seamless and connected healthcare experience</h2>
              <img src={sgn} alt="Descriptive text about the image" />
              <button className='ghost' id='signUp'>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
