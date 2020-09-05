
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../books/entities/UserLogin';


@Injectable({ providedIn: "root" })
export class AuthService {
 // authenticated: boolean = false;

  constructor(private readonly httpClient: HttpClient) {}

  isAuthenticated(): boolean {
  //  return this.authenticated;
  //return localStorage.getItem('token')!==null;
  
      if(!localStorage.getItem('token'))
        return false;
      return true;
    }
    isRole(roles:string[]){
      let _role = localStorage.getItem('role');
      for(let i =0; i < roles.length; i++)  { 
          if(roles[i] == _role)
            return true;
        };
     
      return false;
    }
  //readonly baseUrl: string = "http://localhost:54278";
  login(userName: string, password: string): Observable<boolean> {
    return this.httpClient.post<UserLogin>(`${environment.baseUrl}login`,
      {UserName: userName, Password: password}).pipe(      
        map(user => {
          if(user)
          {
            console.log(user);
            localStorage.setItem('token', user.token);
            localStorage.setItem('role', user.role);
            return true;
          }
          return false;
        })
      )
   
  }
  static getToken ():string{
    return localStorage.getItem('token');
  }
  /*
  static getHeadrs() : HttpHeaders{
    let header= new HttpHeaders();
    if(localStorage.getItem("token") === null)
      return header;
    header.set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return header;
  }
  */
  /*
  login(username: string, password: String): Observable<boolean> {
    if (username == "username" && password == "password") {
      this.authenticated = true;
      return of(true);
    }
    return of(false);
  }
  */
}
