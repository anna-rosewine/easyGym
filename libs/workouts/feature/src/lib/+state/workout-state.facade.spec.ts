import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as WorkoutStateActions from './workout-state.actions';
import { WorkoutStateEffects } from './workout-state.effects';
import { WorkoutStateFacade } from './workout-state.facade';
import { WorkoutStateEntity } from './workout-state.models';
import {
  WORKOUTSTATE_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './workout-state.reducer';
import * as WorkoutStateSelectors from './workout-state.selectors';

interface TestSchema {
  workoutState: State;
}

describe('WorkoutStateFacade', () => {
  let facade: WorkoutStateFacade;
  let store: Store<TestSchema>;
  const createWorkoutStateEntity = (
    id: string,
    name = ''
  ): WorkoutStateEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(WORKOUTSTATE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([WorkoutStateEffects]),
        ],
        providers: [WorkoutStateFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(WorkoutStateFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allWorkoutState$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allWorkoutState$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadWorkoutStateSuccess` to manually update list
     */
    it('allWorkoutState$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allWorkoutState$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        WorkoutStateActions.loadWorkoutStateSuccess({
          workoutState: [
            createWorkoutStateEntity('AAA'),
            createWorkoutStateEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allWorkoutState$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
