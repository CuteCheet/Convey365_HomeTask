import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { NgForm } from '@angular/forms';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = []; // Holds the list of books
  newBook: Book = new Book(); // Holds the data for a new book entry
  editing = false; // Flag to indicate editing mode
  editingBook: Book = new Book(); // Holds the data of the book being edited

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks(); // Fetch all books on component initialization
  }

  // Fetch all books from the server
  getBooks(): void {
    this.bookService.getBooks().toPromise()
      .then(books => this.books = books);
  }

  // Handle creation of a new book
  createBook(bookForm: NgForm): void {
    this.bookService.createBook(this.newBook).subscribe(book => {
      this.books.unshift(book); // Add the new book to the start of the list
      bookForm.resetForm(); // Reset the form fields
      this.newBook = new Book(); // Reset the new book model
    }, error => {
      console.error('Error creating book', error);
    });
  }

  // Delete a book by its ID
  deleteBook(id: string): void {
    this.bookService.deleteBook(id).toPromise()
      .then(() => {
        this.books = this.books.filter(book => book.id !== id); // Remove the book from the list
      });
  }

  // Update book details
  updateBook(bookData: Book): void {
    this.bookService.updateBook(bookData).toPromise()
      .then(updatedBook => {
        const existingBook = this.books.find(book => book.id === updatedBook.id);
        Object.assign(existingBook, updatedBook); // Update the local book data
        this.clearEditing(); // Exit editing mode
      });
  }

  // Enter editing mode for a book
  editBook(bookData: Book): void {
    this.editing = true;
    Object.assign(this.editingBook, bookData);
  }

  // Clear editing mode
  clearEditing(): void {
    this.editingBook = new Book();
    this.editing = false;
  }
}
