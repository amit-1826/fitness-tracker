import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import { Store } from '@ngrx/store';
import {Observable} from "rxjs";
import {AuthService} from "../../auth/auth-service";
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Input() sidebar: MatSidenav;
  isAuth$: Observable<boolean>;
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromApp.getIsAuthenticated);
  }

  onLogout() {
    this.authService.logout();
  }

}
