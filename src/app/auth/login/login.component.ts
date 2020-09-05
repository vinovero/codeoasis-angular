import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  return_url: string = "";
  loginForm: FormGroup;
  loginFailed: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    localStorage.clear();            
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
    

    this.route.queryParams.subscribe(
      (params) => (this.return_url = params["return"] || "/")
    );
  }

  get controls() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.controls.username.value, this.controls.password.value)
      .subscribe((result) => {
        if (result) this.router.navigateByUrl(this.return_url);//navigate(['/books']);//[this.return_url]);//navigateByUrl(this.return);
      },(err) => {
        console.log(err);
        if(err.status == 401)
         
          this.loginForm.controls.password.setErrors({
            notMatched: true
         });

      });
  }
}
