import { createAction, props } from '@ngrx/store';
import { AuthEntity } from './auth.models';
import { AuthInfo, User } from './auth.interfaces';

export const init = createAction('[Auth Page] Init');

export const loadAuthSuccess = createAction(
  '[Auth/API] Load Auth Success',
  props<{ auth: AuthEntity[] }>()
);

export const loadAuthFailure = createAction(
  '[Auth/API] Load Auth Failure',
  props<{ error: any }>()
);


export const login = createAction(
  '[Auth/API] Login',
  props<{ authInfo: AuthInfo }>()
);


export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  // props<{ user:  User }>()

);



export const loginFailed = createAction(
  '[Auth/API] Login Failed',
  props<{ err: any }>()
);

export const signUp = createAction(
  '[Auth/API] Sign Up',
  props<{ authInfo: AuthInfo }>()
);


export const signUpSuccess = createAction(
  '[Auth/API]Sign Up Success',
);

export const signUpFailed = createAction(
  '[Auth/API] Sign Up Failed',
  props<{ err: any }>()
);

export const signOut = createAction(
  '[Auth/API] Sign Out',
  // props<{ authInfo: AuthInfo }>()
);

export const clearLogout = createAction(
  '[Auth/API] Clear Logout',
  // props<{ authInfo: AuthInfo }>()
);


export const signOutSuccess = createAction(
  '[Auth/API] Sign Out Success',
);

export const signOutFailed = createAction(
  '[Auth/API] Sign Out Failed',
  props<{ err: any }>()
);

export const setUser = createAction(
  '[Auth/API] Login Success',
  props<{ user:  User }>()
);


