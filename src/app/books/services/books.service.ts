import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { Book } from "../entities/book";
import { Observable, of, observable } from "rxjs";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { filter, map } from "rxjs/operators";


@Injectable({
  providedIn: "root",
})
export class BooksService {
  books: Book[];
  constructor(private readonly http: HttpClient) {
//    let number = 1;
 //   this.books.forEach((x) => (x.id = number++));
  }

  //baseUrl: string = "http://localhost:54278";
  url: string = 'book';

  private _getBooks(): Observable<Book[]> {
   // return this.httpClient.get<Book[]>(`${environment.baseUrl}book`);
    //return of(this.books);
    return this.http.get<Book[]>(environment.baseUrl+ this.url);
    

  }
  getBooks(): Observable<Book[]>{
      return this._getBooks().pipe( map(
        (x)=> {
          this.books = x;
          return x;
        }
      ))
  }

  getLastPurchased(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.baseUrl}book/purchased`);
  }

  getBookByTitle(searchTerm: string): Observable<Book[]> {
    const lowerCasedSearchTerm = searchTerm.toLowerCase();
    return this._getBooks().pipe(
      map((x) =>
        x.filter(
          (x) =>
            !searchTerm ||
            x.title.toLowerCase().includes(lowerCasedSearchTerm) ||
            x.author.toLowerCase().includes(lowerCasedSearchTerm) ||
            x.language.toLowerCase().includes(lowerCasedSearchTerm) ||
            x.year.toString().includes(lowerCasedSearchTerm) 
        )
      )
    );
    
    
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${environment.baseUrl}book/${bookId}`)
   // return of(this.books.find((x) => x.bookId == bookId));
  }
/*
  purchaseBookPage(bookId: number): Observable<Book> {
    
      
    const book = this.books.find((x) => x.bookId == bookId);
    book.purchased = true;
    return of(book);
    
   
  }
  */
  purchaseBook(bookId: string): Observable<any>{
    //return of(this.books[0]);
    return this.http.post(`${environment.baseUrl}book/${bookId}/purchase`, {});
    /*.pipe(map(
      (x)=>   {
       
        return x;
      }
      ));
      */
  }
  deleteBook(bookId: string): Observable<any>{
    //return of(this.books[0]);
    return this.http.delete(`${environment.baseUrl}book/${bookId}`);
    /*.pipe(map(
      (x)=>   {
       
        return x;
      }
      ));
      */
  };
  
}
