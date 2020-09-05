import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BooksService } from "../services/books.service";
import { switchMap } from "rxjs/operators";
import { Book } from "../entities/book";

@Component({
  selector: "app-purchase-book",
  templateUrl: "./purchase-book.component.html",
  styleUrls: ["./purchase-book.component.scss"],
})
export class PurchaseBookComponent implements OnInit {
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly booksService: BooksService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          const bookId = (params["bookId"]);
          return this.booksService.getBookById(bookId);
        })
      )
      .subscribe((book) => {
        this.book = book;
      });
  }
  PurchaseBook(){
    this.route.params
      .pipe(
        switchMap((params) => {
          const bookId = (params["bookId"]);
          return this.booksService.purchaseBook(bookId);
        })
      )
      .subscribe((book) => {
        //this.book = book;
        this.router.navigate(["/books"])
      });
  }
  deleteBook(){
    this.route.params
      .pipe(
        switchMap((params) => {
          const bookId = (params["bookId"]);
          return this.booksService.deleteBook(bookId);
        })
      )
      .subscribe((book) => {
        //this.book = book;
        this.router.navigate(["/books"])
      });
    
  }
}
