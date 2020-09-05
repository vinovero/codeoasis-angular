import { NgModule } from "@angular/core";
import { BooksComponent } from "./books.component";
import { BooksRoutingModule } from "./books-routing.module";
import { BookDetailsComponent } from "./bookDetails/bookDetails.component";
import { PurchaseBookComponent } from "./purchase-book/purchase-book.component";
import { PurchaseBookRouteGuard } from "./services/purchase-book-route.guard";
import { AuthModule } from "../auth/auth.module";
import { SharedModule } from "../shared/shared.module";
//import { PurchasedBooksComponent } from './purchased-books/purchased-books.component';
import { AddBookComponent } from './add-book/add-book.component';

@NgModule({
  imports: [BooksRoutingModule, AuthModule, SharedModule],
  providers: [PurchaseBookRouteGuard],
  exports: [BooksComponent, BookDetailsComponent, BooksRoutingModule, AddBookComponent],
  declarations: [BooksComponent, BookDetailsComponent, PurchaseBookComponent,
      AddBookComponent],
})
export class BooksModule {}
