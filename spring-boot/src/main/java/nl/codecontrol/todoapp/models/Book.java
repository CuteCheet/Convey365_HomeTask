package nl.codecontrol.todoapp.models;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="books")
public class Book {
    @Id
    private String id;

    @NotBlank
    @Size(max=255)
    private String title;

    @NotBlank
    @Size(max=255)
    private String author;

    @NotBlank
    @Size(max=100)
    private String genre;

    @NotBlank
    @Size(max=20)
    private String isbn;

    @NotBlank
    @Size(max=255)
    private String publisher;

    private Integer publishYear;

    public Book() {
        super();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Integer getPublishYear() {
        return publishYear;
    }

    public void setPublishYear(Integer publishYear) {
        this.publishYear = publishYear;
    }

    @Override
    public String toString() {
        return String.format(
                "Book[id=%s, title='%s', author='%s', genre='%s', isbn='%s', publisher='%s', publishYear='%d']",
                id, title, author, genre, isbn, publisher, publishYear);
    }
}
