import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot, UrlSegment,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth-service";
import {Injectable} from "@angular/core";
import * as fromApp from '../app.reducer'
import { Store } from "@ngrx/store";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // this.store.select('auth')
    
    if (this.authService.isAuth()) {
      return true;
    } else {
      return this.router.navigate(['/login']);
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuth()) {
      return true;
    } else {
      return this.router.navigate(['/login']);
    }
  }


}
