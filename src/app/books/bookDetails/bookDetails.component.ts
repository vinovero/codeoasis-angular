import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Book } from "../entities/book";
import { switchMap } from "rxjs/operators";
import { BooksService } from "../services/books.service";

@Component({
  selector: "app-bookDetails",
  templateUrl: "./bookDetails.component.html",
  styleUrls: ["./bookDetails.component.scss"],
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private readonly booksService: BooksService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          const bookId = (params["bookId"]);
          return this.booksService.getBookById (bookId);
        })
      )
      .subscribe((book) => {
        this.book = book;
      });
  }

  buyBook(book: Book) {
   // this.router.navigate(['purchase'], { relativeTo: this.route });
   this.booksService.purchaseBook(book.bookId).subscribe(result=>{
    this.router.navigate(['/books']);
  });
  }
  editAddBook(book: Book) {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }
  deleteBook(book: Book){
    this.booksService.deleteBook(book.bookId).subscribe(result=>{
      this.router.navigate(['/books']);
    });
  }
  get isAdmin(): boolean{
    return this.authService.getRole=="Admin"
  }
  get isauth(): boolean{
      return this.authService.isAuthenticated()
  }
}
