import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { FormsModule, NgForm } from '@angular/forms';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
	standalone: true,
	selector: 'app-book-list',
	templateUrl: './book-list.component.html',
	styleUrls: ['./book-list.component.scss'],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		MatCardModule,
		MatTableModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
	],
	providers: [BookService]
})
export class BookListComponent implements OnInit {
	books: Book[] = []; // Holds the list of books
	newBook: Book = new Book(); // Holds the data for a new book entry
	editing = false; // Flag to indicate editing mode
	editingBook: Book = new Book(); // Holds the data of the book being edited

	constructor(private bookService: BookService) { }

	ngOnInit(): void {
		this.getBooks(); // Fetch all books on component initialization
	}

	// Fetch all books from the server
	getBooks(): void {
		this.bookService.getBooks().toPromise()
			.then(books => this.books = books || []);
	}

	// Handle creation of a new book
	createBook(bookForm: NgForm): void {
		this.bookService.createBook(this.newBook).subscribe(book => {
			this.books.unshift(book);  // Prepend the new book to the books array
			bookForm.resetForm();          // Reset the form after submission
			this.newBook = new Book(); // Reset the newBook object to clear the form fields

			// Force update to the table data source for Angular Material Table
			this.books = [...this.books.sort((prev, next) => prev.title.localeCompare(next.title))];
		}, error => {
			console.error('Error creating book', error);
			// Optionally, display an error message
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
				const existingBook = this.books.find(book => book.id === updatedBook?.id);
				if (existingBook) {
					Object.assign(existingBook, updatedBook); // Update the local book data
				}
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
