import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteService from "../../Services/NoteService";
import authHeader from "../../Services/auth-header";
import "./getAllNotesStyle.css";
import { Header } from "../../ViewComponents/Header/Header";
import { Footer } from "../../ViewComponents/Footer/Footer";
import { useAuth } from "../../Hooks/use-auth";
import { Navigate } from "react-router-dom";

function GetAllNotesComponent() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const isAuthenticated = useAuth();
  const getNotes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7070/api/mainpage/allnotes",
        { headers: authHeader() }
      );
      setNotes(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  function gotoAdd() {
    navigate("/add-note");
  }
  function editNote(id) {
    navigate("/update-note/" + id);
  }
  function deleteNote(id) {
    NoteService.deleteNote(id).then((response) => {
      notes.filter((note) => note.id !== id);
    });
  }
  function viewNote(id) {
    navigate("/view-note/" + id);
  }
  useEffect(() => {
    getNotes();
  }, [notes]);
  return isAuthenticated.isAuth ? (
    <div className="App">
      <Header />
      <div className="notes-container">
        {notes.length === 0 && (
          <h1 className="text-center">YOU HAVE NO NOTES</h1>
        )}
        {notes.length !== 0 && (
          <div>
            <h1 className="text-center">Your notes:</h1>
            <p />
            <div class="row row-cols-2 row-cols-md-1">
              {notes.map((note) => (
                <div class="col mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-header text-center text-black">
                        <b>{note.name}</b>
                      </h4>
                      <h4 className="card-text text-black">
                        <b>{note.text}</b>
                      </h4>
                      <h4 className="card-text text-black">
                        <b>{note.date}</b>
                      </h4>
                      <div className="card-footer">
                        <button
                          className="btn-func-edit"
                          onClick={() => editNote(note.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-func-delete"
                          onClick={() => deleteNote(note.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn-func-details"
                          onClick={() => viewNote(note.id)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <button className="btn-add" onClick={gotoAdd}>
          Add new note
        </button>
      </div>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default GetAllNotesComponent;
