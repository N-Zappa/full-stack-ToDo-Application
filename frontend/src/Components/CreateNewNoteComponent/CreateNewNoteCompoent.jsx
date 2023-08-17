import React, { useState, useEffect } from "react";
import NoteService from "../../Services/NoteService";
import { useNavigate } from "react-router-dom";
import { Header } from "../../ViewComponents/Header/Header";
import "./createNewNoteStyle.css";
import { Footer } from "../../ViewComponents/Footer/Footer";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/use-auth";

function CreateNewNoteComponent() {
  let [name] = useState();
  let [text] = useState();
  let [date] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  useEffect(() => {
    let dateInput = document.getElementById("date");
    if (dateInput !== null) {
      dateInput.onfocus = function () {
        dateInput.type = "date";
      };
    }
  });

  function changeNameHandler(event) {
    name = event.target.value;
  }
  function changeTextHandler(event) {
    text = event.target.value;
  }
  function changeDateHandler(event) {
    date = event.target.value;
  }
  const validateForm = () => {
    let valid = true;
    let errors = {};
    if (!name) {
      errors.name = "Name is required";
      valid = false;
    }
    if (!text) {
      errors.text = "Description is required";
      valid = false;
    }
    if (!date) {
      errors.date = "Date is required";
      valid = false;
    }
    setErrors(errors);
    console.log(errors);
    return valid;
  };
  function saveNote(e) {
    if (validateForm()) {
      e.preventDefault();
      let note = { name: name, text: text, date: date };
      NoteService.createNote(note);
      navigate("/allnotes");
    }
  }
  return isAuthenticated.isAuth ? (
    <div className="App">
      <Header />
      <div className="formContainer">
        <div className="input-container">
          <h1 className="text-center">Add new note</h1>
          <label className="text-style">Name</label>
          <input
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={changeNameHandler}
          ></input>
          {errors.name && <span className="error-style">{errors.name}</span>}
          <label className="text-style">Description</label>
          <input
            placeholder="Enter description"
            name="text"
            value={text}
            onChange={changeTextHandler}
          ></input>
          {errors.text && <span className="error-style">{errors.text}</span>}
          <label className="text-style">Must be done until</label>
          <input
            id="date"
            type="text"
            placeholder="MM/DD/YYYY"
            value={date}
            onChange={changeDateHandler}
          ></input>
          {errors.date && <span className="error-style">{errors.date}</span>}
          <button type="submit" className="btn-add" onClick={saveNote}>
            Add note
          </button>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default CreateNewNoteComponent;
