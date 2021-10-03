import { createAction, props } from '@ngrx/store';
import { WorkoutStateEntity } from './workout-state.models';

export const init = createAction('[WorkoutState Page] Init');

export const loadWorkoutStateSuccess = createAction(
  '[WorkoutState/API] Load WorkoutState Success',
  props<{ workoutState: WorkoutStateEntity[] }>()
);

export const loadWorkoutStateFailure = createAction(
  '[WorkoutState/API] Load WorkoutState Failure',
  props<{ error: any }>()
);


export const getListOfExercises = createAction(
  '[WorkoutState/API] Get List Of Exercises',
  props<{ error: any }>()
);
