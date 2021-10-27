import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthEntity } from './auth.models';
import { User } from './auth.interfaces';

export const AUTH_FEATURE_KEY = 'auth';

export interface State extends EntityState<AuthEntity> {
  selectedId?: string | number; // which Auth record has been selected
  loaded: boolean; // has the Auth list been loaded
  error?: string | null; // last known error (if any)
  logoutWasSuccessful?: boolean | undefined
  user?: User | undefined
  loginSuccess?: boolean | undefined
  signUpWasSuccessful?: boolean | undefined
  authError?: string | undefined
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const authAdapter: EntityAdapter<AuthEntity> =
  createEntityAdapter<AuthEntity>();

export const initialState: State = authAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const authReducer = createReducer(
  initialState,
  on(AuthActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(AuthActions.setUser, (state, {user}) => ({ ...state, user: user })),
  on(AuthActions.signUpSuccess, (state) => ({ ...state, signUpWasSuccessful: true })),
  on(AuthActions.signOutSuccess, (state) => ({ ...state, logoutWasSuccessful: true })),
  on(AuthActions.clearLogout, (state) => ({ ...state, logout: undefined})),
  on(AuthActions.loginSuccess, (state, {user}) => ({ ...state, user: user, loginSuccess: true})),
  on(AuthActions.loginFailed, (state, {err}) => ({ ...state, authError: err.message })),
  on(AuthActions.signOutSuccess, (state) => ({ ...state, user: undefined, loginSuccess: false, signUpWasSuccessful: false})),
  on(AuthActions.loadAuthSuccess, (state, { auth }) =>
    authAdapter.setAll(auth, { ...state, loaded: true })
  ),
  on(AuthActions.loadAuthFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
