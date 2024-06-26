package com.example.springboot3bookapplication.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Document(collection = "books")
public class Book implements Serializable {

    @Id
    private String id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Author is required")
    private String author;

    private String genre;

    @NotBlank(message = "ISBN is required")
    private String isbn;

    private String publisher;

    private int publishYear;

    @Override
    public String toString() {
        return String.format("Book{id=%s, title='%s', author='%s', genre='%s', isbn='%s', publisher='%s', publishYear=%d}",
                id, title, author, genre, isbn, publisher, publishYear);
    }
}
