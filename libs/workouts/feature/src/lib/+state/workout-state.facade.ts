import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as WorkoutStateActions from './workout-state.actions';
import * as WorkoutStateFeature from './workout-state.reducer';
import * as WorkoutStateSelectors from './workout-state.selectors';
import { Exercise } from '@pet/shared/functions';

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
  exerciseList$ = this.store.pipe(
    select(WorkoutStateSelectors.exerciseList)
  );
  workoutList$ = this.store.pipe(
    select(WorkoutStateSelectors.workoutList)
  );

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(WorkoutStateActions.init());
  }

  getExerciseList(){
    this.store.dispatch(WorkoutStateActions.getListOfExercises())
  }

  getWorkoutList(){
    this.store.dispatch(WorkoutStateActions.getListOfWorkouts())
  }

  createExercise(exercise: Omit<Exercise, "id">){
    this.store.dispatch(WorkoutStateActions.createExercise({exercise: exercise}))

  }


}
