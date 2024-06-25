import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class BookService {
  private baseUrl = 'http://localhost:8080'; // Base URL for the backend API

  constructor(private http: HttpClient) { }

  // Retrieve all books from the backend
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + '/api/books/')
      .pipe(
        retry(1), // Retry once on failure
        catchError(this.handleError) // Handle errors
      );
  }

  // Create a new book entry
  createBook(bookData: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl + '/api/books/', bookData)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Update an existing book
  updateBook(bookData: Book): Observable<Book> {
    return this.http.put<Book>(this.baseUrl + '/api/books/' + bookData.id, bookData)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Delete a book by its ID
  deleteBook(id: string): Observable<Book> {
    return this.http.delete<Book>(this.baseUrl + '/api/books/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Generic error handling method
  private handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
