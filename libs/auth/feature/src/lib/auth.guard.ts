import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { catchError, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AuthFacade } from '@pet/auth/feature';
import { AuthService } from './+state/auth/auth.service';
import { User } from './+state/auth/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private location: Location,
    private store$: Store,
    private authFacade: AuthFacade,
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.checkUserForGuard().pipe(
      map((user) => {
        if(user !== null){
          console.log(user)
          if(user.email){
            const authUser: User = {
              email: user.email, uid: user.uid
            }
            this.authFacade.setUser(authUser)
          }
          return true;
        } else {
          this.router.navigate(['/auth/login'])
          return false
        }
      }),
      catchError(async (err) => {
        const locationFromWin = window.location.pathname;
        console.log(err)
        this.router.navigate(['/auth/login'])
        return false;
      })
    );

  }
}
