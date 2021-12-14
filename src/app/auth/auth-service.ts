import {User} from './user.model';
import {AuthData} from "./auth.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  authChange: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private angularFireAuth: AngularFireAuth) {
  }

  login(authData: AuthData) {
    const user = {
      email: authData.email,
      password: authData.password
    }
    this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        console.log(result);
        this.authSuccessfull();
      })
      .catch((error) => {
        console.log(error);
      });

  }

  register(authData: AuthData) {
    const user = {
      email: authData.email,
      password: authData.password
    }

    this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        console.log(result);
        this.authSuccessfull();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  authSuccessfull() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training'])
  }

  isAuth() {
    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login'])
  }
}
