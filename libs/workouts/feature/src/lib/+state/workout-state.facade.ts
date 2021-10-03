import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as WorkoutStateActions from './workout-state.actions';
import * as WorkoutStateFeature from './workout-state.reducer';
import * as WorkoutStateSelectors from './workout-state.selectors';

@Injectable()
export class WorkoutStateFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(WorkoutStateSelectors.getWorkoutStateLoaded)
  );
  allWorkoutState$ = this.store.pipe(
    select(WorkoutStateSelectors.getAllWorkoutState)
  );
  selectedWorkoutState$ = this.store.pipe(
    select(WorkoutStateSelectors.getSelected)
  );

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(WorkoutStateActions.init());
  }
}
