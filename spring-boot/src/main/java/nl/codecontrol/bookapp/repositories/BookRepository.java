package nl.codecontrol.bookapp.repositories;

import nl.codecontrol.bookapp.models.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {

}
