import {User} from './user.model';
import {AuthData} from "./auth.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null;
  authChange: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router) {
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    }
    this.authSuccessfull();

  }

  register(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    }
    this.authSuccessfull();

  }

  authSuccessfull() {
    this.authChange.next(true);
    this.router.navigate(['/training'])
  }

  isAuth() {
    return this.user != null;
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login'])
  }
}
