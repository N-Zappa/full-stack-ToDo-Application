import React, { Component } from "react";
import "./loginStyle.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AuthService from "../../Services/auth-servise";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        AuthService.login(email, password);
        navigate("/allnotes");
      })
      .catch((error) => {
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/wrong-password"
        ) {
          setError("Wrong email or password");
          return;
        }
      });
  };
  return (
    <div className="App">
      <div className="login-container">
        <div className="fields-container">
          <h1 className="text-center">Login</h1>
          <label className="text-style">Email</label>
          <input
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={onChangeEmail}
          ></input>
          <label className="text-style">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={onChangePassword}
          ></input>
          <button onClick={handleLogin} className="btn-login">
            Login
          </button>
          <span className="text-center">
            {error && (
              <span className="error-style">
                {error}
                <p />
              </span>
            )}
            Not registered yet?
            <a
              style={{ color: "rgb(" + 41 + "," + 27 + "," + 170 + ")" }}
              href="http://localhost:3000/register"
            >
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
export default LoginComponent;
