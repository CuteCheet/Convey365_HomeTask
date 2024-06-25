import { Injectable } from '@angular/core';
import { Book } from '../models/book.model'; // Import the new Book model
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class BookService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + '/api/books/')
    .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  createBook(bookData: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl + '/api/books/', bookData)
    .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  updateBook(bookData: Book): Observable<Book> {
    return this.http.put<Book>(this.baseUrl + '/api/books/' + bookData.id, bookData)
    .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteBook(id: string): Observable<Book> {
    return this.http.delete<Book>(this.baseUrl + '/api/books/' + id)
    .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
