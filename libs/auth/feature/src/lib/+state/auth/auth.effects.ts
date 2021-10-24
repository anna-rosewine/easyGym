import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';
import { AuthService } from './auth.service';
import * as WorkoutStateActions from '../../../../../../workouts/feature/src/lib/+state/workout-state.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from './auth.interfaces';

@Injectable()
export class AuthEffects {

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return AuthActions.loadAuthSuccess({ auth: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return AuthActions.loadAuthFailure({ error });
        },
      })
    )
  );

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.authInfo.mail, action.authInfo.password).pipe(
          map((doc) => {
            console.log(doc)
            // doc.then(({ user }) => {
            //   if(user!==null){
            //     if(user.email){
            //       const authUser: User = {
            //         email: user.email, uid: user.uid
            //       }
            //       return AuthActions.loginSuccess({user:authUser});
            //     }
            //     return false;
            //   } else {
            //     return false
            //   }
            // })
            return AuthActions.loginSuccess();
          }),
          catchError(async (err) => AuthActions.loginFailed({ err: err }))
        )
      )
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap((action) =>
        this.authService.emailSignup(action.authInfo.mail, action.authInfo.password).pipe(
          map((doc) => {
            console.log(doc)
            return AuthActions.signUpSuccess();
          }),
          catchError(async (err) => AuthActions.signUpFailed({ err: err }))
        )
      )
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOut),
      mergeMap((action) =>
        this.authService.logout().pipe(
          map((doc) => {
            console.log(doc)
            return AuthActions.signOutSuccess();
          }),
          catchError(async (err) => AuthActions.signOutFailed({ err: err }))
        )
      )
    );
  });

  constructor(private readonly actions$: Actions,
              private authService: AuthService) {}
}