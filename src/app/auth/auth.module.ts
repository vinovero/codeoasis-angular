import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.component";
import { AuthService } from "./auth.service";
import { AuthRoutingModule } from "./auth.routing.module";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  providers: [],
  declarations: [AuthComponent, LoginComponent],
  exports: [],
})
export class AuthModule {}
