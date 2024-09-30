package com.nev.ensolvers.springboot.repository;

import com.nev.ensolvers.springboot.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUserId(Long userId);
    List<Note> findByUserIdAndActive(Long userId, boolean active);

    List<Note> findByUserIdAndArchive(Long userId, boolean archive);

    @Query(value = "SELECT * FROM notes WHERE user_id = :userId AND :category = ANY(categories)", nativeQuery = true)
    List<Note> findByUserIdAndCategory(@Param("userId") Long userId, @Param("category") String category);

    @Query(value = "SELECT * FROM notes n WHERE n.user_id = :userId AND (SELECT COUNT(*) FROM unnest(n.categories) AS category WHERE category = ANY(:categories)) = array_length(:categories, 1)", nativeQuery = true)
    List<Note> findByUserIdAndCategories(@Param("userId") Long userId, @Param("categories") String[] categories);

}

