import { WorkoutStateEntity } from './workout-state.models';
import {
  workoutStateAdapter,
  WorkoutStatePartialState,
  initialState,
} from './workout-state.reducer';
import * as WorkoutStateSelectors from './workout-state.selectors';

describe('WorkoutState Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getWorkoutStateId = (it: WorkoutStateEntity) => it.id;
  const createWorkoutStateEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as WorkoutStateEntity);

  let state: WorkoutStatePartialState;

  beforeEach(() => {
    state = {
      workoutState: workoutStateAdapter.setAll(
        [
          createWorkoutStateEntity('PRODUCT-AAA'),
          createWorkoutStateEntity('PRODUCT-BBB'),
          createWorkoutStateEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('WorkoutState Selectors', () => {
    it('getAllWorkoutState() should return the list of WorkoutState', () => {
      const results = WorkoutStateSelectors.getAllWorkoutState(state);
      const selId = getWorkoutStateId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = WorkoutStateSelectors.getSelected(
        state
      ) as WorkoutStateEntity;
      const selId = getWorkoutStateId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getWorkoutStateLoaded() should return the current "loaded" status', () => {
      const result = WorkoutStateSelectors.getWorkoutStateLoaded(state);

      expect(result).toBe(true);
    });

    it('getWorkoutStateError() should return the current "error" state', () => {
      const result = WorkoutStateSelectors.getWorkoutStateError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
