import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from "../../auth/auth-service";
import {Observable} from "rxjs";
import * as fromApp from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() onToggle: EventEmitter<void> = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromApp.getIsAuthenticated);
  }

  toggle() {
    this.onToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

}
