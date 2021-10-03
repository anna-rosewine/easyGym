import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as WorkoutStateActions from './workout-state.actions';
import { WorkoutStateEffects } from './workout-state.effects';

describe('WorkoutStateEffects', () => {
  let actions: Observable<Action>;
  let effects: WorkoutStateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        WorkoutStateEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(WorkoutStateEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: WorkoutStateActions.init() });

      const expected = hot('-a-|', {
        a: WorkoutStateActions.loadWorkoutStateSuccess({ workoutState: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
