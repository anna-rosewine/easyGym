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

export const getSelected = createSelector(
  getWorkoutStateEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
