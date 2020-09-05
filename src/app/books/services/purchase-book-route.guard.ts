import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Injectable()
export class PurchaseBookRouteGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(next.data)
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/login"], {
        queryParams: {
          return: state.url,
        },
      });
      return false;
      
    } else if(this.authService.isRole(next.data.roles)){
      return true;
    }
    else{
      alert('You do not have a permission');
//      this.router.navigate([state.url]);
      return false;
    }
  }
}
