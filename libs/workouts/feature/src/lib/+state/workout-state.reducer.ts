import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as WorkoutStateActions from './workout-state.actions';
import { WorkoutStateEntity } from './workout-state.models';
import { ExecutedWorkout, Exercise, Workout } from '@pet/shared/functions';

export const WORKOUTSTATE_FEATURE_KEY = 'workoutState';

export interface State extends EntityState<WorkoutStateEntity> {
  selectedId?: string | number; // which WorkoutState record has been selected
  loaded: boolean; // has the WorkoutState list been loaded
  error?: string | null; // last known error (if any)
  exerciseList?: Exercise[]
  workoutList?: Workout[]
  selectedExercise?: Exercise
  chosenWorkout?: Workout
  chosenExercise?: Exercise
  currentExecutedWorkout?: ExecutedWorkout
  executedWorkoutKey?: string | undefined

}

export interface WorkoutStatePartialState {
  readonly [WORKOUTSTATE_FEATURE_KEY]: State;
}

export const workoutStateAdapter: EntityAdapter<WorkoutStateEntity> =
  createEntityAdapter<WorkoutStateEntity>();

export const initialState: State = workoutStateAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const workoutStateReducer = createReducer(
  initialState,
  on(WorkoutStateActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(WorkoutStateActions.loadWorkoutStateSuccess, (state, { workoutState }) =>
    workoutStateAdapter.setAll(workoutState, { ...state, loaded: true })
  ),
  on(WorkoutStateActions.loadWorkoutStateFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(WorkoutStateActions.exerciseListSuccessfullyLoaded, (state, { exerciseList }) => ({
    ...state,
    exerciseList: exerciseList
  })),
  on(WorkoutStateActions.executedWorkoutSuccessfullyCreated, (state, { executedWorkoutKey }) => ({
    ...state,
    executedWorkoutKey: executedWorkoutKey
  })),
  on(WorkoutStateActions.executedWorkoutSuccessfullyLoaded, (state, { executedWorkout }) => ({
    ...state,
    currentExecutedWorkout: executedWorkout
  })),
  on(WorkoutStateActions.clearExecutedWorkoutKey, (state) => ({
    ...state,
    executedWorkoutKey: undefined
  })),
  on(WorkoutStateActions.workoutListSuccessfullyLoaded, (state, { workoutList }) => ({
    ...state,
    workoutList: workoutList
  })),
  on(WorkoutStateActions.setChosenWorkout, (state, { workout }) => ({
    ...state,
    chosenWorkout: workout
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return workoutStateReducer(state, action);
}
