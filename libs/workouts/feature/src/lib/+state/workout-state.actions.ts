import { createAction, props } from '@ngrx/store';
import { WorkoutStateEntity } from './workout-state.models';
import type { Exercise, Workout } from '@pet/shared/functions';

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
);


export const exerciseListSuccessfullyLoaded = createAction(
  '[WorkoutState/API] Exercise List Successfully Loaded',
  props<{ exerciseList: Exercise[] }>()
);


export const loadingExerciseListFailed= createAction(
  '[WorkoutState/API] Loading Exercise List Failed',
  props<{error: Error }>()
);


export const createExercise = createAction(
  '[WorkoutState/API] Create Exercises',
  props<{ exercise: Omit<Exercise, "id"> }>()
);


export const exerciseSuccessfullyCreated = createAction(
  '[WorkoutState/API] Exercise  Successfully Created',

);


export const exerciseCreatingFailed = createAction(
  '[WorkoutState/API] ExerciseCreatingFailed',
  props<{error: Error }>()
);

export const getListOfWorkouts = createAction(
  '[WorkoutState/API] Get List Of Exercises',
);

export const workoutListSuccessfullyLoaded = createAction(
  '[WorkoutState/API] Workout List Successfully Loaded',
  props<{ workoutList: Workout[] }>()
);


export const loadingWorkoutListFailed= createAction(
  '[WorkoutState/API] Loading Workout List Failed',
  props<{error: Error }>()
);
