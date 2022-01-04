import {NgModule} from "@angular/core";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./auth-service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
  ],
  providers: [
    AuthService
  ],
  imports: [
    SharedModule
  ]
})
export class AuthModule {
}