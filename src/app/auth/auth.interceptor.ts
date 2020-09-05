import { ModalErrorComponent } from './../modal-error/modal-error.component';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';

import { Observable, of } from "rxjs";


import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
//import { ModalErrorComponent } from '../modal-error/modal-error.component';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  modalRef: BsModalRef;
  
  constructor( private router: Router, 
    private _route: ActivatedRoute,
    public modalService: BsModalService,
    ){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${AuthService.getToken()}`,
      },
    });

 //   return next.handle(req);
    return next.handle(req).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
        /*
          queryParams: {
          return: state.url,
        },
        */
          let _params =  this.router.url;//this._route.snapshot.url;//.queryParamMap.get("return");
          let paramObj = _params ? {return: _params} :{};
      
          this.router.navigate(['/login'],{
            queryParams: paramObj
          });
          return  of(err.message);
        }
        else if(err.status === 403)
        {
      //    this.modalRef =this.modalService.show(this._modal, {});
          alert('You do not have a permission');
        }
        return;
        
      }
    }));
    
  }
 
}