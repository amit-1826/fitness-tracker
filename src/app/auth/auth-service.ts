import {AuthData} from "./auth.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {TrainingService} from "../training/training.service";
import {UiService} from "../services/uiService";
import { Store } from "@ngrx/store";
import * as fromApp from '../app.reducer';

@Injectable()
export class AuthService {

  isAuthenticated: boolean = false;
  authChange: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private angularFireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private store: Store<{ui: fromApp.IState}>,
              private uiService: UiService) {
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

  emitLoaderEvent(type: string) {
    this.store.dispatch({type: type});
    // this.uiService.showLoaderEvent.next(event);
  }

  login(authData: AuthData) {
    this.emitLoaderEvent('START_LOADING');
    const user = {
      email: authData.email,
      password: authData.password
    }
    this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.emitLoaderEvent('STOP_LOADING');
      })
      .catch((error) => {
        this.emitLoaderEvent('STOP_LOADING');
        this.uiService.showSnackbar(error.message, undefined, 3000);
      });
  }

  register(authData: AuthData) {
    this.emitLoaderEvent('START_LOADING');
    const user = {
      email: authData.email,
      password: authData.password
    }

    this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.emitLoaderEvent('STOP_LOADING');
      })
      .catch((error) => {
        this.emitLoaderEvent('STOP_LOADING');
        this.uiService.showSnackbar(error.message, undefined, 3000);
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
