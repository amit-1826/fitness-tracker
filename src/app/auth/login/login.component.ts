import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth-service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UiService} from "../../services/uiService";
import {Observable, Subscription} from "rxjs";
import * as fromApp from '../../app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading$: Observable<boolean>;
  constructor(private authService: AuthService,
              private store: Store<{ui: fromApp.IState}>,
              private uiService: UiService) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(
      map((data) => {
        return data.ui.isLoading;
      })
    )
  }

  onLogin(loginForm: NgForm) {
    this.authService.login({
      email: loginForm.value.email,
      password: loginForm.value.password
    });
  }

}
