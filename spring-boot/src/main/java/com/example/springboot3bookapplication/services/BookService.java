package com.example.springboot3bookapplication.services;

import com.example.springboot3bookapplication.models.Book;
import com.example.springboot3bookapplication.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> findAll() {
        return bookRepository.findAll();
//        return bookRepository.findAllByOrderByTitleAsc();
    }

    public Book save(Book book) {
        return bookRepository.save(book);
    }

    public Optional<Book> getById(String id) {
        return bookRepository.findById(id);
    }

    public void delete(Book book) {
        bookRepository.delete(book);
    }
}
