import { createAction, props } from '@ngrx/store';
import { WorkoutStateEntity } from './workout-state.models';
import type { ExecutedWorkout, Exercise, Workout } from '@pet/shared/functions';

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

export const setPersonalizedExercises  = createAction(
  '[WorkoutState/API] Set Personalized Exercises',
  props<{ exerciseList: Exercise[] }>()
);

export const setPersonalizedWorkouts  = createAction(
  '[WorkoutState/API] Set Personalized Workouts',
  props<{ workoutList: Workout[] }>()
);

export const setPersonalizedExecutedWorkouts  = createAction(
  '[WorkoutState/API] Set Personalized Executed Workouts',
  props<{ executedWorkoutList: ExecutedWorkout[] }>()
);

export const loadingExerciseListFailed= createAction(
  '[WorkoutState/API] Loading Exercise List Failed',
  props<{error: Error }>()
);

export const getExerciseById = createAction(
  '[WorkoutState/API] Get Exercise By Id',
  props<{id: string }>()
);


export const exerciseByIdSuccessfullyLoaded = createAction(
  '[WorkoutState/API] Exercise By Id Successfully Loaded',
  props<{ exercise: Exercise }>()
);


export const loadingExerciseByIdFailed= createAction(
  '[WorkoutState/API] Loading Exercise By Id Failed',
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

export const createWorkout = createAction(
  '[WorkoutState/API] Create Workout',
  props<{ workout: Omit<Workout, "id"> }>()
);


export const workoutSuccessfullyCreated = createAction(
  '[WorkoutState/API] Workout  Successfully Created',
);

export const workoutCreatingFailed = createAction(
  '[WorkoutState/API] Workout Creating Failed',
  props<{error: Error }>()
);


export const createExecutedWorkout = createAction(
  '[WorkoutState/API] Create Executed Workout',
  props<{ workout: ExecutedWorkout }>()
);


export const executedWorkoutSuccessfullyCreated = createAction(
  '[WorkoutState/API] Executed Workout  Successfully Created',
  props<{ executedWorkoutKey: string }>()
);

export const executedWorkoutCreatingFailed = createAction(
  '[WorkoutState/API] Executed Workout Creating Failed',
  props<{error: Error }>()
);

export const getExecutedWorkout = createAction(
  '[WorkoutState/API] Get Executed Workout',
  props<{ key:string }>()
);

export const getListOfExecutedWorkout = createAction(
  '[WorkoutState/API] Get List Of Executed Workout',
);

export const listOfExecutedWorkoutSuccessfullyLoaded = createAction(
  '[WorkoutState/API] List Of Executed Workout  Successfully Loaded',
  props<{ executedWorkout: ExecutedWorkout[]  }>()
);

export const listOfExecutedWorkoutLoadingFailed = createAction(
  '[WorkoutState/API] List Of Executed Workout Loading Failed',
  props<{error: Error }>()
);

export const emptyAction =  createAction(
  '[WorkoutState/API] Empty',
);


export const executedWorkoutSuccessfullyLoaded = createAction(
  '[WorkoutState/API] Executed Workout  Successfully Loaded',
  props<{ executedWorkout: ExecutedWorkout  }>()
);

export const executedWorkoutLoadingFailed = createAction(
  '[WorkoutState/API] Executed Workout Loading Failed',
  props<{error: Error }>()
);

export const updateExecutedWorkout = createAction(
  '[WorkoutState/API] Update Executed Workout',
  props<{ key:string, executedWorkout: ExecutedWorkout }>()
);


export const executedWorkoutSuccessfullyUpdated = createAction(
  '[WorkoutState/API] Executed Workout  Successfully Updated',
  // props<{ executedWorkout: ExecutedWorkout }>()
);

export const executedWorkoutUpdatingFailed = createAction(
  '[WorkoutState/API] Executed Workout Updating Failed',
  props<{error: Error }>()
);

export const clearExecutedWorkoutKey = createAction(
  '[WorkoutState/API] Clear Executed Workout Key',
);




export const setChosenWorkout = createAction(
  '[WorkoutState/API] Set Chosen Workout',
  props<{workout: Workout}>()
);

