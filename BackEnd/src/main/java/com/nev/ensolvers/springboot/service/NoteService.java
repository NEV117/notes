package com.nev.ensolvers.springboot.service;


import com.nev.ensolvers.springboot.dto.NoteDto;
import com.nev.ensolvers.springboot.model.Note;
import com.nev.ensolvers.springboot.model.User;
import com.nev.ensolvers.springboot.repository.NoteRepository;
import com.nev.ensolvers.springboot.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<Note> getAllNotesByUserId(Long userId) {
        return noteRepository.findByUserId(userId);
    }

    @Transactional(readOnly = true)
    public Note getNoteById(Long noteId, Long userId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new EntityNotFoundException("Note not found"));
        if (!note.getUserId().equals(userId)) {
            throw new SecurityException("Not authorized to access this note");
        }
        return note;
    }

    @Transactional(readOnly = false)
    public Note createNote(NoteDto noteDto, Long userId) {
        Note note = new Note();
        note.setTitle(noteDto.getTitle());
        note.setContent(noteDto.getContent());
        note.setCategories(noteDto.getCategories());
        note.setArchive(noteDto.isArchive());
        note.setActive(noteDto.isActive());
        note.setUserId(userId);

        return noteRepository.save(note);
    }

    @Transactional(readOnly = false)
    public Note updateNote(Long id, NoteDto noteDto, Long userId) {
        Note existingNote = noteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Note not found"));

        if (!existingNote.getUserId().equals(userId)) {
            throw new SecurityException("Not authorized to update this note");
        }

        existingNote.setTitle(noteDto.getTitle());
        existingNote.setContent(noteDto.getContent());
        existingNote.setCategories(noteDto.getCategories());
        existingNote.setArchive(noteDto.isArchive());
        existingNote.setActive(noteDto.isActive());

        return noteRepository.save(existingNote);
    }

    @Transactional(readOnly = false)
    public void deleteNote(Long noteId, Long userId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new EntityNotFoundException("Note not found"));

        if (!note.getUserId().equals(userId)) {
            throw new SecurityException("Not authorized to delete this note");
        }

        noteRepository.deleteById(noteId);
    }

    @Transactional(readOnly = true)
    public List<Note> getActiveNotes(Long userId) {
        return noteRepository.findByUserIdAndActive(userId, true);
    }

    @Transactional(readOnly = true)
    public List<Note> getArchivedNotes(Long userId) {
        return noteRepository.findByUserIdAndArchive(userId, true);
    }

    @Transactional(readOnly = true)
    public List<Note> getNotesByCategory(Long userId, String category) {
        return noteRepository.findByUserIdAndCategory(userId, category);
    }

    @Transactional(readOnly = true)
    public List<Note> filterNotesByCategories(Long userId, String[] categories) {
        return noteRepository.findByUserIdAndCategories(userId, categories);
    }

    // Método para obtener el ID del usuario autenticado
    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new EntityNotFoundException("User not found with username: " + username);
        }
        return user.getId();
    }
}