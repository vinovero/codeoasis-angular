import { MatButtonModule } from '@angular/material/button';

import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BooksModule } from "./books/books.module";
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [AppComponent, ModalErrorComponent],
  imports: [BrowserModule, AppRoutingModule, BooksModule, AuthModule,HttpClientModule, 
    ModalModule.forChild(), BrowserAnimationsModule, MatMenuModule, MatButtonModule ],
  providers: [ {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true
    
  }],
  bootstrap: [AppComponent],
  
 
})
export class AppModule {}
