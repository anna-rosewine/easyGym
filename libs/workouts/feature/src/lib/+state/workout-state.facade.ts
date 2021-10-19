import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as WorkoutStateActions from './workout-state.actions';
import * as WorkoutStateFeature from './workout-state.reducer';
import * as WorkoutStateSelectors from './workout-state.selectors';
import { ExecutedWorkout, Exercise, Workout } from '@pet/shared/functions';

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
  chosenWorkout$ = this.store.pipe(
    select(WorkoutStateSelectors.chosenWorkout)
  );
  currentExecutedWorkout$ = this.store.pipe(
    select(WorkoutStateSelectors.currentExecutedWorkout)
  );
  executedWorkoutKey$ = this.store.pipe(
    select(WorkoutStateSelectors.executedWorkoutKey)
  );
  chosenExercise$ = this.store.pipe(
    select(WorkoutStateSelectors.chosenExercise)
  );
  selectExercise$ = (id: string) =>
    this.store.pipe(select(WorkoutStateSelectors.selectExercise(id)));

  selectWorkout$ = (id: string) =>
    this.store.pipe(select(WorkoutStateSelectors.selectWorkout(id)));
  // workoutList$ = this.store.pipe(
  //   select(WorkoutStateSelectors.workoutList)
  // );


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

  createWorkout(workout: Omit<Workout, "id">){
    this.store.dispatch(WorkoutStateActions.createWorkout({workout: workout}))
  }


  createExecutedWorkout(workout: ExecutedWorkout){
    this.store.dispatch(WorkoutStateActions.createExecutedWorkout({workout: workout}))
  }

  getExecutedWorkout(key:string){
    this.store.dispatch(WorkoutStateActions.getExecutedWorkout({key: key}))
  }
  //
  // updateExecutedWorkout(workout: Omit<ExecutedWorkout, "id">){
  //   this.store.dispatch(WorkoutStateActions.createExecutedWorkout({workout: workout}))
  // }

  updateExecutedWorkout(key:string, workout: ExecutedWorkout){
    this.store.dispatch(WorkoutStateActions.updateExecutedWorkout({key: key, executedWorkout: workout}))
  }


  setChosenWorkout(workout: Workout){
    this.store.dispatch(WorkoutStateActions.setChosenWorkout({workout: workout}))
  }


}
