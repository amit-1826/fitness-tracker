import {AuthData} from "./auth.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {TrainingService} from "../training/training.service";
import {UiService} from "../services/uiService";
import { Store } from "@ngrx/store";
import * as fromApp from '../app.reducer';
import * as UIActions from '../shared/ui.actions';
import { SetAuthenticated, SetUnAuthenticated } from "./auth.actions";

@Injectable()
export class AuthService {

  constructor(private router: Router, private angularFireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private store: Store<fromApp.AppState>,
              private uiService: UiService) {
  }

  initAuth() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new SetAuthenticated())
        this.navigate('/training');
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new SetUnAuthenticated())
        this.navigate('login');
      }
    })
  }

  emitLoaderEvent(type: 'START_LOADING' | 'STOP_LOADING') {
    this.store.dispatch(type === 'START_LOADING' ? new UIActions.StartLoading() : new UIActions.StopLoading());
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

  logout() {
    this.angularFireAuth.signOut();
  }

  navigate(route: string) {
    this.router.navigate([route])
  }
}
