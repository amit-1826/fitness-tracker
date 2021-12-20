import {User} from './user.model';
import {AuthData} from "./auth.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {TrainingService} from "../training/training.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  authChange: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private angularFireAuth: AngularFireAuth,
              private trainingService: TrainingService) {
  }

  initAuth() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.navigate('/training');
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.navigate('login');
      }
    })
  }

  login(authData: AuthData) {
    const user = {
      email: authData.email,
      password: authData.password
    }
    this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        console.log(result);
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  isAuth() {
    return this.isAuthenticated;
  }

  logout() {
    this.angularFireAuth.signOut();
  }

  navigate(route: string) {
    this.router.navigate([route])
  }
}
