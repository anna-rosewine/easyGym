import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WORKOUTSTATE_FEATURE_KEY,
  State,
  workoutStateAdapter,
} from './workout-state.reducer';

// Lookup the 'WorkoutState' feature state managed by NgRx
export const getWorkoutStateState = createFeatureSelector<State>(
  WORKOUTSTATE_FEATURE_KEY
);

const { selectAll, selectEntities } = workoutStateAdapter.getSelectors();

export const getWorkoutStateLoaded = createSelector(
  getWorkoutStateState,
  (state: State) => state.loaded
);

export const getWorkoutStateError = createSelector(
  getWorkoutStateState,
  (state: State) => state.error
);

export const getAllWorkoutState = createSelector(
  getWorkoutStateState,
  (state: State) => selectAll(state)
);

export const getWorkoutStateEntities = createSelector(
  getWorkoutStateState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getWorkoutStateState,
  (state: State) => state.selectedId
);

export const selectExercise = (id: string) =>
  createSelector(exerciseList, (exercises) =>
    exercises ? exercises.filter((c) => c.id === id)[0] : undefined
  );

export const selectWorkout = (id: string) =>
  createSelector(workoutList, (workouts) =>
    workouts ? workouts.filter((w) => w.id === id)[0] : undefined
  );

export const personalizedWorkoutList = (uid: string) =>
  createSelector(workoutList, (workouts) =>
    workouts ? workouts.filter((w) => w.uid === uid) : undefined
  );

export const personalizedExerciseList = (uid: string) =>
  createSelector(exerciseList, (exercises) =>
    exercises ? exercises.filter((e) => e.uid === uid) : undefined
  );

export const personalizedExecutedWorkoutList = (uid: string) =>
  createSelector(executedWorkoutList, (workouts) =>
    workouts ? workouts.filter((w) => w.uid == uid) : undefined
  );

export const exerciseList = createSelector(
  getWorkoutStateState,
  (state: State) => state.exerciseList
);

export const chosenWorkout = createSelector(
  getWorkoutStateState,
  (state: State) => state.chosenWorkout
);

export const chosenExercise = createSelector(
  getWorkoutStateState,
  (state: State) => state.chosenExercise
);

export const workoutList = createSelector(
  getWorkoutStateState,
  (state: State) => state.workoutList
);
export const currentExecutedWorkout = createSelector(
  getWorkoutStateState,
  (state: State) => state.currentExecutedWorkout
);


export const executedWorkoutKey = createSelector(
  getWorkoutStateState,
  (state: State) => state.executedWorkoutKey
);

export const executedWorkoutList = createSelector(
  getWorkoutStateState,
  (state: State) => state.executedWorkoutList
);

export const getSelected = createSelector(
  getWorkoutStateEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
