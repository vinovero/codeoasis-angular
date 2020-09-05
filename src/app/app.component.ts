import { Router } from '@angular/router';
import { BooksService } from './books/services/books.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-codeoasis';
  constructor(private booksService: BooksService, private router: Router){}

  LastPurchased() {
    this.booksService.getLastPurchased().subscribe((book) => {
      if(book.bookId)
        this.router.navigate(["/books", book.bookId]);
    
    });
  }
}
