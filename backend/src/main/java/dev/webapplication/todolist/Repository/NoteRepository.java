package dev.webapplication.todolist.Repository;

import dev.webapplication.todolist.Entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    Note findNoteById(Long id);
}
