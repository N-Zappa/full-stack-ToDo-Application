package dev.webapplication.todolist.Service;

import dev.webapplication.todolist.Entity.Note;
import dev.webapplication.todolist.Repository.NoteRepository;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;

    public List<Note> getAllNotes(Long id){
        List<Note> allnotes = noteRepository.findAll();
        List<Note> userNotes = new ArrayList<>();
        for(Note note:allnotes){
            if(note.getUserId()==id) userNotes.add(note);
        }
        return userNotes;
    }
    public Note getNoteById(Long id){
        if(!noteRepository.existsById(id)) throw new ObjectNotFoundException(id,"Note not exists");
        return noteRepository.findNoteById(id);
    }
    public void saveNote(Note note){
        noteRepository.save(note);
    }
    public void deleteNote(Note note){
        noteRepository.delete(note);
    }
}
