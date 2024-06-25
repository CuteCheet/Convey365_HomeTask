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
  books: Book[] = [];
  newBook: Book = new Book();
  editing = false;
  editingBook: Book = new Book();

  constructor(
    private bookService: BookService,
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().toPromise()
     .then(books => this.books = books);
  }

  createBook(bookForm: NgForm): void {
    this.bookService.createBook(this.newBook).toPromise()
     .then(createBook => {
        bookForm.reset();
        this.newBook = new Book();
        this.books.unshift(createBook);
      });
  }

  deleteBook(id: string): void {
    this.bookService.deleteBook(id).toPromise()
     .then(() => {
        this.books = this.books.filter(book => book.id!== id);
      });
  }

  updateBook(bookData: Book): void {
    this.bookService.updateBook(bookData).toPromise()
     .then(updatedBook => {
        const existingBook = this.books.find(book => book.id === updatedBook.id);
        Object.assign(existingBook, updatedBook);
        this.clearEditing();
      });
  }

  editBook(bookData: Book): void {
    this.editing = true;
    Object.assign(this.editingBook, bookData);
  }

  clearEditing(): void {
    this.editingBook = new Book();
    this.editing = false;
  }

  toggleCompleted(book: Book): void {
    // book.completed =!book.completed;
    // this.bookService.updateBook(book).toPromise()
    //  .then(updatedBook => {
    //     const existingBook = this.books.find(b => b.id === updatedBook.id);
    //     Object.assign(existingBook, updatedBook);
    //   });
  }
}
