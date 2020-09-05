import { AuthService } from './auth/auth.service';
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
 //  var isLogon: boolean;

  constructor(private booksService: BooksService, 
    private router: Router,
    private auth: AuthService,
    ){}

  LastPurchased() {
        this.router.navigate(["/purchased-books"])
    
    }
   get isLogon():Boolean{
    return this.auth.getRole ? true : false
   }
   get userName(): string{
     return this.auth.getName
   }
   get role():string{
    return this.auth.getRole
   }
 
}
