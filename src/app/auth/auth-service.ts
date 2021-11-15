import {User} from './user.model';
import {AuthData} from "./auth.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null;
  authChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    }
    this.authChange.next(true);
  }

  register(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    }
    this.authChange.next(true);
  }

  isAuth() {
    return this.user != null;
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
  }
}
