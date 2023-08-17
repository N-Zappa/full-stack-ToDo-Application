import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../../Services/auth-header";
import "./viewNoteStyle.css";
import { Header } from "../../ViewComponents/Header/Header";
import { Footer } from "../../ViewComponents/Footer/Footer";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/use-auth";

function ViewNoteComponent() {
  const { id } = useParams();
  const [note, setNote] = useState("");
  const isAuthenticated = useAuth();
  const getNote = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7070/api/mainpage/allnotes/" + id,
        { headers: authHeader() }
      );
      setNote(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();
  function home() {
    navigate("/allnotes");
  }
  useEffect(() => {
    getNote();
  }, [note]);
  return isAuthenticated.isAuth ? (
    <div className="App">
      <Header />
      <div className="note-container">
        <div className="items-container">
          <h1 className="text-center">{note.name}</h1>
          <span>Description:</span>
          <span>{note.text}</span>
          <span>Planned on date:</span>
          <span>{note.date}</span>
        </div>
        <button className="to-notes-btn" onClick={() => navigate("/allnotes")}>
          Back to notes
        </button>
      </div>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
export default ViewNoteComponent;
