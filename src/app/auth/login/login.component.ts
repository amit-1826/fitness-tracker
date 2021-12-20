import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth-service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UiService} from "../../services/uiService";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  showLoader = false;
  loaderSubscription: Subscription;
  constructor(private authService: AuthService,
              private uiService: UiService) { }

  ngOnInit(): void {
    this.loaderSubscription = this.uiService.showLoaderEvent.subscribe((showLoader) => {
      this.showLoader = showLoader;
    })
  }

  onLogin(loginForm: NgForm) {
    this.authService.login({
      email: loginForm.value.email,
      password: loginForm.value.password
    });
  }

  ngOnDestroy() {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
  }

}
