package com.nev.ensolvers.springboot.dto;

import lombok.Data;

import java.util.List;

@Data
public class NoteDto {
    private String title;
    private String content;
    private List categories;
    private boolean archive;
    private boolean active;
}


