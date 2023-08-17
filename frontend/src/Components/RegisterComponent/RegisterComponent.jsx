import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./registerStyle.css";
import React from "react";
import { useState } from "react";
import AuthService from "../../Services/auth-servise";
import { useNavigate } from "react-router-dom";

function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [emailExistsError, setEmailExistsError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangeUsername(e) {
    setUsername(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  const validateForm = () => {
    let valid = true;
    let errors = {};
    if (!email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      valid = false;
    }
    if (!username) {
      errors.username = "Username is required";
      valid = false;
    }
    if (username.length < 3) {
      errors.usernameLength = "Username must contain at least 3 characters";
      valid = false;
    }
    if (username.length > 12) {
      errors.usernameMax = "Username must contain no more than 12 characters";
      valid = false;
    }
    if (!password) {
      errors.password = "Password is required";
      valid = false;
    }
    if (password.length < 8) {
      errors.passwordLength = "Password must contain at least 8 characters";
      valid = false;
    }
    if (password.length > 16) {
      errors.passwordLengthMax =
        "Password must contain no more than 16 characters";
      valid = false;
    }
    setErrors(errors);
    console.log(errors);
    return valid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: user.accessToken,
            })
          );

          AuthService.register(username, email, password);
          navigate("/login");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setEmailExistsError("This email already in use");
            return;
          }
        });
    }
  };

  return (
    <div className="App">
      <div className="register-container">
        <div className="fields-container">
          <h1 className="text-center">Sign Up</h1>
          <label className="text-style">Email</label>
          <input
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={onChangeEmail}
          ></input>
          {errors.email && <span className="error-style">{errors.email}</span>}
          {emailExistsError && (
            <span className="error-style">{emailExistsError}</span>
          )}
          <label className="text-style">Username</label>
          <input
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={onChangeUsername}
          ></input>
          {errors.username && (
            <span className="error-style">{errors.username}</span>
          )}
          {errors.usernameLength && (
            <span className="error-style">{errors.usernameLength}</span>
          )}
          {errors.usernameMax && (
            <span className="error-style">{errors.usernameMax}</span>
          )}
          <label className="text-style">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={onChangePassword}
          ></input>
          {errors.password && (
            <span className="error-style">{errors.password}</span>
          )}
          {errors.passwordLength && (
            <span className="error-style">{errors.passwordLength}</span>
          )}
          {errors.passwordLength && (
            <span className="error-style">{errors.passwordMax}</span>
          )}
          <button onClick={handleRegister} className="btn-login">
            Sign Up
          </button>
          <span className="text-center">
            Already have an account?
            <a
              style={{ color: "rgb(" + 41 + "," + 27 + "," + 170 + ")" }}
              href="http://localhost:3000/login"
            >
              Log in
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;
