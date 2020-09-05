import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../entities/book';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddBookService {

  constructor(private readonly http: HttpClient) {}

  public SetBook(book: Book): Observable<any>{
    let body = JSON.stringify(book);    
    if(book.bookId)
      return this.http.patch(`${environment.baseUrl}book`,body);
    return this.http.put(`${environment.baseUrl}book`,body);
  }
}
