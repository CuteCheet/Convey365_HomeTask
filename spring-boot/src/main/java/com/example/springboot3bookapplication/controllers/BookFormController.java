package com.example.springboot3bookapplication.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.springboot3bookapplication.services.BookService;
import com.example.springboot3bookapplication.repositories.BookRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import com.example.springboot3bookapplication.models.Book;
import jakarta.validation.Valid;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books") // Base path for API endpoints
public class BookFormController {

    @Autowired
    private BookService bookService;

    // Retrieve all books from the backend
    @GetMapping("/")
    public List<Book> getAllBooks() {
        return bookService.findAll();
    }

    // Create a new book entry
    @PostMapping("/")
    public Book createBook(@Valid @RequestBody Book book) {
        return bookService.save(book);
    }

    // Retrieve a specific book by its ID
    @GetMapping("/{id}")
    public Optional<Book> getBookById(@PathVariable("id") String id) {
        return bookService.getById(id);
    }

    // Update an existing book
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable("id") String id, @Valid @RequestBody Book book) {
        Book existingBook = bookService
                .getById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book id: " + id + " not found"));

        existingBook.setTitle(book.getTitle());
        existingBook.setAuthor(book.getAuthor());
        existingBook.setGenre(book.getGenre());
        existingBook.setIsbn(book.getIsbn());
        existingBook.setPublisher(book.getPublisher());
        existingBook.setPublishYear(book.getPublishYear());

        return bookService.save(existingBook);
    }

    // Delete a book by its ID
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable("id") String id) {
        Book book = bookService
                .getById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book id: " + id + " not found"));

        bookService.delete(book);
    }
}
