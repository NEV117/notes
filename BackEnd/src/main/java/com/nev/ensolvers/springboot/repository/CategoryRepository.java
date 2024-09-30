package com.nev.ensolvers.springboot.repository;

import com.nev.ensolvers.springboot.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByNameContaining(String keyword);
}
