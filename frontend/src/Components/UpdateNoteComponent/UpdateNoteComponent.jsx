import React, { useState, useEffect } from "react";
import NoteService from "../../Services/NoteService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import authHeader from "../../Services/auth-header";
import "./updateNoteStyle.css";
import { Header } from "../../ViewComponents/Header/Header";
import { Footer } from "../../ViewComponents/Footer/Footer";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/use-auth";

function UpdateNoteComponent() {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    text: "",
    date: "",
  });
  const [errors, setErrors] = useState({});
  const isAuthenticated = useAuth();
  useEffect(() => {
    axios
      .get("http://localhost:7070/api/mainpage/allnotes/" + id, {
        headers: authHeader(),
      })
      .then((res) => {
        setValues({
          ...values,
          name: res.data.name,
          text: res.data.text,
          date: res.data.date,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();
  const validateForm = () => {
    let valid = true;
    let errors = {};
    if (!values.name) {
      errors.name = "Name is required";
      valid = false;
    }
    if (!values.text) {
      errors.text = "Description is required";
      valid = false;
    }
    if (!values.date) {
      errors.date = "Date is required";
      valid = false;
    }
    setErrors(errors);
    console.log(errors);
    return valid;
  };
  const saveNote = (e) => {
    if (validateForm()) {
      e.preventDefault();
      NoteService.updateNote(id, values);
      navigate("/allnotes");
    }
  };
  return isAuthenticated.isAuth ? (
    <div className="App">
      <Header />
      <div className="formContainer">
        <div className="input-container">
          <h1 className="text-center">Edit note</h1>
          <label className="text-style">Name</label>
          <input
            placeholder="Enter name"
            name="name"
            className="form-control"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          ></input>
          {errors.name && <span className="error-style">{errors.name}</span>}
          <label className="text-style">Description</label>
          <input
            placeholder="Enter description"
            name="text"
            className="form-control"
            value={values.text}
            onChange={(e) => setValues({ ...values, text: e.target.value })}
          ></input>
          {errors.text && <span className="error-style">{errors.text}</span>}
          <label className="text-style">Must be done until</label>
          <input
            placeholder="Enter date"
            name="date"
            className="form-control"
            value={values.date}
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          ></input>
          {errors.date && <span className="error-style">{errors.date}</span>}
          <button type="submit" className="btn-add" onClick={saveNote}>
            Edit note
          </button>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
export default UpdateNoteComponent;
