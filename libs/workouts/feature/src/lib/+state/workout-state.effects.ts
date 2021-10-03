import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as WorkoutStateActions from './workout-state.actions';
import * as WorkoutStateFeature from './workout-state.reducer';

@Injectable()
export class WorkoutStateEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutStateActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return WorkoutStateActions.loadWorkoutStateSuccess({
            workoutState: [],
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return WorkoutStateActions.loadWorkoutStateFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
