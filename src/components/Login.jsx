import React, { useState } from "react";
import Captcha from "react-canvas-captcha";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services";
import "../css/Login.css";
const Login = () => {
  const history = useNavigate();
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");

  const postData = async (e) => {
    const res = await login({
      email,
      password,
    });

    const data = res.data;
    if (res.status === 400 || !data) {
      window.alert("Invalid Credential");
    } else if (captcha.toLowerCase() !== generatedCaptcha) {
      window.alert("Captacha data invalide");
    } else {
      localStorage.setItem("user", res?.data?.email); /// set the email in the local strorage
      // window.alert("Login Successfully");
      history("/post");
    }
  };
  // console.log(generatedCaptcha);
  return (
    <>
      <div className="login-Signup-body">
        <div className="container-login">
          <h1>Login Page</h1>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
            />
          </div>
          <div className="form-group">
            <label For="password">password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button type="submit" onClick={postData}>
            Log in
          </button>
          <p>
            Don't Have a account ? <Link to="/signup">Sig up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
