import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/endpointAPI";
import LoginImage from "../assets/orang-orang.png";
import "../styles/Register.scss";

export default function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const { username, email, password } = values;
      await axios
        .post(registerRoute, {
          username,
          email,
          password,
        })
        .then((res) => {
          if (res.data.status === false) {
            toast.error(res.data.message, toastOption);
          }
          if (res.data.status === true) {
            console.log("success", res.data.user);
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
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password Didn't same", toastOption);
      return false;
    } else if (username.length < 3) {
      toast.error("Username min 3", toastOption);
      return false;
    } else if (password.length < 8) {
      toast.error("Password min 8", toastOption);
      return false;
    } else if (email === "") {
      toast.error("Email required", toastOption);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={defaultIcon} alt="" />
            <h1>Chat Apps</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button>Create User</button>
          <span>
            Already Have Account? <Link to="/login">Login</Link>{" "}
          </span>
        </form>
      </FormContainer>
      <ToastContainer /> */}

      <div className="inner">
        <div className="image-container">
          <img src={LoginImage} alt="" />
        </div>
        <div className="form-container">
          <div className="inner-form">
            <h5>SIGN UP FOR FREE</h5>
            <h1>Create new account</h1>
            <div className="form">
              <form onSubmit={(e) => handleSubmit(e)}>
              <div className="email">
                  <label>Username</label>
                  <input type="text" name="username" onChange={(e) => handleChange(e)} />
                </div>
                <div className="email">
                  <label>Email</label>
                  <input type="email" name="email" onChange={(e) => handleChange(e)} />
                </div>
                <div className="password">
                  <label>Password</label>
                  <input type="password" name="password" onChange={(e) => handleChange(e)} />
                </div>
                <div className="password">
                  <label>Confirm Password</label>
                  <input type="password" name="confirmPassword" onChange={(e) => handleChange(e)} />
                </div>
                <button>Sign Up</button>
                <h5>
                  Don’t have an account?{" "}
                  <Link to="/login" style={{ color: "#FFB628" }}>
                    Sign In
                  </Link>{" "}
                </h5>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

// const FormContainer = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-image: url(${background});
//   background-size: auto 100%;
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 5rem;
//     }
//     h1 {
//       color: white;
//       text-transform: uppercase;
//     }
//   }
//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     background-color: #3b3b3b;
//     border-radius: 2rem;
//     padding: 2rem 3rem;
//     input {
//       background-color: transparent;
//       padding: 1rem;
//       border: 0.1rem solid blue;
//       border-radius: 0.4rem;
//       color: white;
//       width: 100%;
//       font-size: 1rem;
//       &:focus {
//         border: 0.1rem;
//         outline: none;
//       }
//     }
//     button {
//       background-color: red;
//       color: white;
//       padding: 1rem 2rem;
//       border: none;
//       font-weight: bold;
//       cursor: pointer;
//       border-radius: 0.4rem;
//       font-size: 1rem;
//       text-transform: uppercase;
//       transition: 0.5s ease-in-out;
//       &:hover {
//         background-color: blue;
//       }
//     }
//   }
// `;
