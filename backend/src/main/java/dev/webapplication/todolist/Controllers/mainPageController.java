package dev.webapplication.todolist.Controllers;

import dev.webapplication.todolist.Entity.Note;
import dev.webapplication.todolist.Security.Jwt.JwtUtils;
import dev.webapplication.todolist.Security.Models.User;
import dev.webapplication.todolist.Security.Services.UserDetailsImpl;
import dev.webapplication.todolist.Service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/mainpage")
public class mainPageController {
    @Autowired
    private NoteService noteService;

    @GetMapping("/allnotes")
    public ResponseEntity<List<Note>> getAllNotes(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return new ResponseEntity<List<Note>>(noteService.getAllNotes(userDetails.getId()), HttpStatus.OK);
    }

    @GetMapping("/allnotes/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id){
        return new ResponseEntity<Note>(noteService.getNoteById(id), HttpStatus.OK);
    }

    @PostMapping("/allnotes")
    public ResponseEntity<String> createNewNote(@RequestBody Note note){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        note.setUserId(userDetails.getId());
        noteService.saveNote(note);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/allnotes/{id}")
    public ResponseEntity<String> updateNote(@PathVariable Long id,@RequestBody Note noteUpd){
        Note note = noteService.getNoteById(id);
        note.setName(noteUpd.getName());
        note.setDate(noteUpd.getDate());
        note.setText(noteUpd.getText());
        noteService.saveNote(note);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deletenote/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable Long id){
        noteService.deleteNote(noteService.getNoteById(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
