import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services";
import Captcha from "react-canvas-captcha";
import "../css/Login.css";

const Signup = () => {
  const history = useNavigate();
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [user, SetUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  let name, value;

  // e = events
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    SetUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = user; //object destructing [user.firstname....]

    // const res = await fetch("http://127.0.0.1:3000/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //   }),
    const res = await signup({
      firstName,
      lastName,
      email,
      password,
    });
    const data = res.data;

    if (res.status === 400 || !data) {
      window.alert("Invalid Credential");
    } else if (captcha.toLowerCase() !== generatedCaptcha) {
      window.alert("Captacha data invalide");
    } else {
      localStorage.setItem("user", res?.data?.email); // set the email in localstorage like token
      window.alert("Login Successfully");
      history("/post");
    }
  };

  return (
    <>
      <div className="login-Signup-body">
        <div className="container-login">
          <h1>Signup Page</h1>
          <form method="POST">
            <div className="form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                value={user.firstName}
                onChange={handleInputs}
                placeholder="firstName"
              />
            </div>
            <div className="form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={user.lastName}
                onChange={handleInputs}
                placeholder="lastName"
                required
              />
            </div>
            <div className="form-group">
              <label for="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleInputs}
                placeholder="email"
                required
              />
            </div>
            <div className="form-group">
              <label for="password">password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleInputs}
                placeholder="password"
                required
              />
            </div>
            <Captcha
              boxHeight={50}
              boxWidth={130}
              refreshButton
              caseType="uppercase"
              captchaConfig={{
                numberOfChars: 4,
                font: "bold 23px Arial",
                textStartingX: 15,
                textStartingY: 5,
              }}
              setCode={(captchaCode) => setGeneratedCaptcha(captchaCode)}
            />
            <div>
              <input
                type="text"
                name="captchaCode"
                id="captchaCode"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                placeholder="captcha code"
              />
            </div>
            <button type="submit" onClick={PostData}>
              Sign Up
            </button>
            <p>
              Already have an account? <Link to="/">log In</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
