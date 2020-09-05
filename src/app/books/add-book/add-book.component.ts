import { Observable } from 'rxjs';
import { Book } from './../entities/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../services/books.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { of } from 'rxjs';
import { AddBookService } from './add-book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: Book;
  add_edit: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly booksService: BooksService,
    private formBuilder: FormBuilder,
    private addBookService: AddBookService
  ) { }
  EditAddBookForm: FormGroup;
  
  ngOnInit() {
    this.EditAddBookForm = this.formBuilder.group({
      title: ["", Validators.required],
      author: ["", Validators.required],
      publisher: ["", Validators.required],
      year: ["", Validators.required],
    });
    let bookId: number;
    this.route.params
      .pipe(
        switchMap((params) => {
          const bookId = (params["bookId"]);
        //  if(bookId)
          if(!bookId)
          {
            this.add_edit = 'Add';
            return of(null);
          }
          this.add_edit = "Edit";
          return this.booksService.getBookById(bookId);
        })
      )
      .subscribe((book) => {
        if(!book)
          return;
        this.book = book;

        this.EditAddBookForm.patchValue(this.book);
        
      });
  }
  get controls()  {
    return this.EditAddBookForm.controls;
  }
  SetBook() {
   const b: Book = {
     bookId: this.book ? this.book.bookId : null,
     title: this.controls.title.value,
     author: this.controls.author.value,
     publisher: this.controls.publisher.value,
     year: Number(this.controls.year.value),
     link:null,
     pages: 388,
     country: null,
     imageLink: null,
     language: null
   }    
   
     this.addBookService.SetBook(b)     
                .subscribe(result=>{
                  this.router.navigate(['/books']);
                });
                

    
  }

   
  }

