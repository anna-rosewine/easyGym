import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthFeature from './auth.reducer';
import * as AuthSelectors from './auth.selectors';
import { AuthInfo, User } from './auth.interfaces';

@Injectable()
export class AuthFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(AuthSelectors.getAuthLoaded));
  logoutWasSuccessful$ = this.store.pipe(select(AuthSelectors.logoutWasSuccessful));
  user$ = this.store.pipe(select(AuthSelectors.user));
  allAuth$ = this.store.pipe(select(AuthSelectors.getAllAuth));
  selectedAuth$ = this.store.pipe(select(AuthSelectors.getSelected));
  loginWasSuccessful = this.store.pipe(select(AuthSelectors.loginWasSuccessful));
  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(AuthActions.init());
  }

  login(info: AuthInfo){
    this.store.dispatch(AuthActions.login({authInfo: info}))
  }

  signUp(info: AuthInfo){
    this.store.dispatch(AuthActions.signUp({authInfo: info}))
  }

  setUser(info: User){
    this.store.dispatch(AuthActions.setUser({user: info}))
  }

  logout(){
    this.store.dispatch(AuthActions.signOut())
  }

  clearLogout(){
    this.store.dispatch(AuthActions.clearLogout())
  }

  authWithGoogle(){
    this.store.dispatch(AuthActions.authWithGoogle())
  }
}
