import { Component, OnInit } from "@angular/core";
import { BooksService } from "./services/books.service";
import { Book } from "./entities/book";
import { FormControl } from "@angular/forms";
import {
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
} from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  searchBooksControl = new FormControl("", []);

  constructor(
    private readonly booksService: BooksService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.booksService.getBooks().subscribe((books) => {
      console.log(books);
      this.books = books;
    
    });

    this.searchBooksControl.valueChanges
      .pipe(
        startWith(""),
        distinctUntilChanged(),
        switchMap((title) => {
          return this.booksService.getBookByTitle(title);
        })
      )
      .subscribe((books) => {
        this.books = books;
      });
  }

  bookDetails(book: Book) {
    this.router.navigate(["/books", book.bookId]);
  }
 
  
}
