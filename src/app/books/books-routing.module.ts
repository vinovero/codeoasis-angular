import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookDetailsComponent } from './bookDetails/bookDetails.component';
import { PurchaseBookComponent } from './purchase-book/purchase-book.component';
import { PurchaseBookRouteGuard } from './services/purchase-book-route.guard';
//import { PurchasedBooksComponent } from './purchased-books/purchased-books.component';
import { AddBookComponent } from './add-book/add-book.component';

const routes: Routes = [
    {
      path: "books",
      component: BooksComponent,
    },
    {
        path: "books/:bookId",
        component: BookDetailsComponent,
      },
      {
        path: "books/:bookId/purchase",
        component: PurchaseBookComponent,
        canActivate: [PurchaseBookRouteGuard],
        data: { roles: ['Admin', 'User']}
      },
      
      {
        path: "books/:bookId/edit",
        component: AddBookComponent,
        canActivate: [PurchaseBookRouteGuard],
        data: { roles: ['Admin']}
      },
      {
        path: "books-add",
        component: AddBookComponent,
        canActivate: [PurchaseBookRouteGuard],
        data: { roles: ['Admin']}
      },
      /*
      {
        path: "purchased-books",
        component: PurchasedBooksComponent,
      },
      */
    { path: "", redirectTo: "/books", pathMatch: "full" },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class BooksRoutingModule {}
  