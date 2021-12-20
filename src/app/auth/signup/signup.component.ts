import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth-service";
import {UiService} from "../../services/uiService";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate: undefined | Date;
  showLoader = false;
  loaderSubscription: Subscription;
  constructor(private authService: AuthService,
              private uiService: UiService) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.uiService.showLoaderEvent.subscribe((showLoader) => {
      this.showLoader = showLoader;
    })
  }

  onSubmit(form: NgForm) {
    this.authService.register({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
  }

}
