import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListComponent } from './todo-list.component';
import { BookListComponent } from './components/book-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './todo.service';
import { BookService } from './services/book.service';
import { MatCardModule, 
  MatTableModule, 
  MatCheckboxModule, 
  MatFormFieldModule, 
  MatInputModule,
  MatIconModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    BookListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [TodoService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
