import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../assets/orang-orang.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/endpointAPI";
import "../styles/Login.scss";

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if(localStorage.getItem("chat-app-user")) {
      navigate('/')
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, password } = values;
      await axios
        .post(loginRoute, {
          email,
          password,
        })
        .then((res) => {
          if (res.data.status === false) {
            toast.error(res.data.message, toastOption);
          }
          if (res.data.status === true) {
            localStorage.setItem(
              "chat-app-user",
              JSON.stringify(res.data.user)
            );
            navigate("/");
          }
        });
    }
  };

  const handleValidation = () => {
    const { email, password } = values;
    if (password === "") {
      toast.error("Password Needed", toastOption);
      return false;
    } else if (email === "") {
      toast.error("Email Needed", toastOption);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="inner">
        <div className="image-container">
          <img src={LoginImage} alt="" />
        </div>
        <div className="form-container">
          <div className="inner-form">
            <h5>SIGN IN TO GET STARTED</h5>
            <h1>Connect to your account</h1>
            <div className="form">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="email">
                  <label>Email</label>
                  <input type="email" name="email" onChange={(e) => handleChange(e)} />
                </div>
                <div className="password">
                  <label>Password</label>
                  <input type="password" name="password" onChange={(e) => handleChange(e)} />
                </div>
                <button>Sign In</button>
                <h5>
                  Don’t have an account?
                  <Link to="/register" style={{ color: "#FFB628" }}>
                    Sign Up
                  </Link>
                </h5>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
