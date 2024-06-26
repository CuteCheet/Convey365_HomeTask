package com.example.springboot3bookapplication.repositories;

import com.example.springboot3bookapplication.models.Book;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {
}
