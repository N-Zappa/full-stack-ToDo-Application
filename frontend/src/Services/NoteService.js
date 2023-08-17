import axios from "axios";
import authHeader from "../Services/auth-header";

const NOTES_API_BASE_URL = "http://localhost:7070/api/mainpage/";

class NoteService {
  createNote(note) {
    return axios.post(NOTES_API_BASE_URL + "allnotes", note, {
      headers: authHeader(),
    });
  }
  getNoteById(id) {
    return axios.get(NOTES_API_BASE_URL + "allnotes/" + id, {
      headers: authHeader(),
    });
  }
  updateNote(noteId, noteUpd) {
    return axios.put(NOTES_API_BASE_URL + "allnotes/" + noteId, noteUpd, {
      headers: authHeader(),
    });
  }
  deleteNote(noteId) {
    return axios.delete(NOTES_API_BASE_URL + "deletenote/" + noteId, {
      headers: authHeader(),
    });
  }
}

export default new NoteService();
