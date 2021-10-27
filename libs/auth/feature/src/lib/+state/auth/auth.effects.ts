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
            if(doc.user && doc.user.email){
              const authUser: User = {
                email: doc.user.email, uid: doc.user.uid
              }
              return AuthActions.loginSuccess({user: authUser});

              // return AuthActions.setUser({user: authUser})
            }
            return AuthActions.loginFailed({ err: new Error() })
          }),
          catchError(async (err) => AuthActions.loginFailed({ err: err }))
        )
      )
    );
  });

  authWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.authWithGoogle),
      mergeMap((action) =>
        this.authService.GoogleAuth().pipe(
          map((doc) => {
            if(doc.user && doc.user.email && doc.user.displayName){
              const authUser: User = {
                email: doc.user.email, uid: doc.user.uid, displayName: doc.user.displayName
              }
              return AuthActions.loginSuccess({user: authUser});
            }
            return AuthActions.loginFailed({ err: new Error() })
          }),
          catchError(async (err) => AuthActions.authWithGoogleFailed({ err: err }))
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
