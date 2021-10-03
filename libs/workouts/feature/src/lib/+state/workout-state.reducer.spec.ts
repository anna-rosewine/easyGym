import { Action } from '@ngrx/store';

import * as WorkoutStateActions from './workout-state.actions';
import { WorkoutStateEntity } from './workout-state.models';
import { State, initialState, reducer } from './workout-state.reducer';

describe('WorkoutState Reducer', () => {
  const createWorkoutStateEntity = (
    id: string,
    name = ''
  ): WorkoutStateEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid WorkoutState actions', () => {
    it('loadWorkoutStateSuccess should return the list of known WorkoutState', () => {
      const workoutState = [
        createWorkoutStateEntity('PRODUCT-AAA'),
        createWorkoutStateEntity('PRODUCT-zzz'),
      ];
      const action = WorkoutStateActions.loadWorkoutStateSuccess({
        workoutState,
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
