package nl.codecontrol.bookapp.controllers;

import nl.codecontrol.bookapp.models.Book;
import nl.codecontrol.bookapp.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api") // Base path for API endpoints
@CrossOrigin("*") // Allow all cross-origin requests
public class BookController {

    final BookRepository bookRepository;

    @Autowired
    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Get all books, sorted by title
    @GetMapping("/books")
    public List<Book> getAllBooks() {
        Sort sortByTitleAsc = Sort.by(Sort.Direction.ASC, "title");
        return bookRepository.findAll(sortByTitleAsc);
    }

    // Create a new book entry
    @PostMapping("/books")
    public Book createBook(@Valid @RequestBody Book book) {
        return bookRepository.save(book);
    }

    // Retrieve a single book by ID
    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable("id") String id) {
        return bookRepository.findById(id)
                .map(book -> ResponseEntity.ok().body(book))
                .orElse(ResponseEntity.notFound().build());
    }

    // Update an existing book
    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable("id") String id, @Valid @RequestBody Book book) {
        return bookRepository.findById(id)
                .map(bookData -> {
                    bookData.setTitle(book.getTitle());
                    bookData.setAuthor(book.getAuthor());
                    bookData.setGenre(book.getGenre());
                    bookData.setIsbn(book.getIsbn());
                    bookData.setPublisher(book.getPublisher());
                    bookData.setPublishYear(book.getPublishYear());
                    Book updatedBook = bookRepository.save(bookData);
                    return ResponseEntity.ok().body(updatedBook);
                }).orElse(ResponseEntity.notFound().build());
    }

    // Delete a book by ID
    @DeleteMapping("/books/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable("id") String id) {
        return bookRepository.findById(id)
                .map(book -> {
                    bookRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
