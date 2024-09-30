package com.nev.ensolvers.springboot.controller;

import com.nev.ensolvers.springboot.dto.NoteDto;
import com.nev.ensolvers.springboot.model.Note;
import com.nev.ensolvers.springboot.service.NoteService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@Tag(name = "Notes Service")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes() {
        Long userId = noteService.getCurrentUserId();
        return ResponseEntity.ok(noteService.getAllNotesByUserId(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        Long userId = noteService.getCurrentUserId();
        return ResponseEntity.ok(noteService.getNoteById(id, userId));
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody NoteDto noteDto) {
        Long userId = noteService.getCurrentUserId();
        Note newNote = noteService.createNote(noteDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(newNote);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody NoteDto noteDto) {
        Long userId = noteService.getCurrentUserId();
        Note updatedNote = noteService.updateNote(id, noteDto, userId);
        return ResponseEntity.ok(updatedNote);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        Long userId = noteService.getCurrentUserId();
        noteService.deleteNote(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/active")
    public ResponseEntity<List<Note>> getActiveNotes() {
        Long userId = noteService.getCurrentUserId();
        return ResponseEntity.ok(noteService.getActiveNotes(userId));
    }

    @GetMapping("/archived")
    public ResponseEntity<List<Note>> getArchivedNotes() {
        Long userId = noteService.getCurrentUserId();
        return ResponseEntity.ok(noteService.getArchivedNotes(userId));
    }

    @GetMapping("/category")
    public ResponseEntity<List<Note>> getNotesByCategory(@RequestParam String category) {
        Long userId = noteService.getCurrentUserId();
        return ResponseEntity.ok(noteService.getNotesByCategory(userId, category));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Note>> filterNotes(@RequestParam("categories") String[] categories) {
        Long userId = noteService.getCurrentUserId();
        return ResponseEntity.ok(noteService.filterNotesByCategories(userId, categories));
    }
}
