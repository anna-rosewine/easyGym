import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as WorkoutStateActions from './workout-state.actions';
import * as WorkoutStateFeature from './workout-state.reducer';
import { WorkoutService } from './workout.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ExecutedWorkout, Exercise, Workout } from '@pet/shared/functions';

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
          return WorkoutStateActions.loadWorkoutStateFailure({ error });
        },
      })
    )
  );

  createExercise$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkoutStateActions.createExercise),
      mergeMap((action) =>
        this.workoutService.createExercise(action.exercise).pipe(
          map(() => {
            return WorkoutStateActions.exerciseSuccessfullyCreated();
          }),
          catchError(async (err) => WorkoutStateActions.exerciseCreatingFailed({ error: err }))
        )
      )
    );
  });

  createWorkout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkoutStateActions.createWorkout),
      mergeMap((action) =>
        this.workoutService.createWorkout(action.workout).pipe(
          map((key) => {
            return WorkoutStateActions.workoutSuccessfullyCreated();
          }),
          catchError(async (err) => WorkoutStateActions.workoutCreatingFailed({ error: err }))
        )
      )
    );
  });

  createExecutedWorkout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkoutStateActions.createExecutedWorkout),
      mergeMap((action) =>
        this.workoutService.createExecutedWorkout(action.workout).pipe(
          map((doc) => {
            return WorkoutStateActions.executedWorkoutSuccessfullyCreated({executedWorkoutKey: doc.id});
          }),
          catchError(async (err) => WorkoutStateActions.executedWorkoutCreatingFailed({ error: err }))
        )
      )
    );
  });


  getExecutedWorkout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkoutStateActions.getExecutedWorkout),
      mergeMap((action) =>
        this.workoutService.getExecutedWorkout(action.key).pipe(
          map((executedWorkoutsList) => {
            const list: ExecutedWorkout[] = []
            let find = false
            let neededW: ExecutedWorkout | undefined = undefined
            executedWorkoutsList.forEach((e) => {
              const w: ExecutedWorkout = <ExecutedWorkout>e.payload.doc.data();
              if(e.payload.doc.id == action.key){
                find = true
                neededW = w
              }

              list.push(<ExecutedWorkout>e.payload.doc.data())
            })
            if(!neededW){
             return WorkoutStateActions.executedWorkoutLoadingFailed({ error: new Error() })
            } else {
              return WorkoutStateActions.executedWorkoutSuccessfullyLoaded({executedWorkout: neededW})
            }
            // return WorkoutStateActions.executedWorkoutSuccessfullyLoaded({executedWorkout:work});
          }),
          catchError(async (err) => WorkoutStateActions.executedWorkoutLoadingFailed({ error: err }))
        )
      )
    );
  });


  updateExecutedWorkout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkoutStateActions.updateExecutedWorkout),
      mergeMap((action) =>
        this.workoutService.updateExecutedWorkout(action.key, action.executedWorkout).pipe(
          map((w) => {
            return WorkoutStateActions.executedWorkoutSuccessfullyUpdated();
          }),
          catchError(async (err) => WorkoutStateActions.executedWorkoutUpdatingFailed({ error: err }))
        )
      )
    );
  });

  getExerciseList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkoutStateActions.getListOfExercises),
      mergeMap((action) =>
        this.workoutService.getExerciseList().pipe(
          map((exerciseList) => {
            const list: Exercise[] = []
            exerciseList.forEach((e) => {
              let exercise: Exercise = <Exercise>e.payload.doc.data();
              exercise = {
                ...exercise,
              }
              list.push(<Exercise>e.payload.doc.data())
            })
            return WorkoutStateActions.exerciseListSuccessfullyLoaded({exerciseList: list});
          }),
          catchError(async (err) => WorkoutStateActions.loadingExerciseListFailed({ error: err }))
        )
      )
    );
  });
  getWorkoutList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkoutStateActions.getListOfWorkouts),
      mergeMap((action) =>
        this.workoutService.getWorkoutList().pipe(
          map((workoutList) => {
            const list: Workout[] = [];
            workoutList.forEach((a) => {
              list.push( <Workout>a.payload.doc.data())
            })
            return WorkoutStateActions.workoutListSuccessfullyLoaded({workoutList: list});
          }),
          catchError(async (err) => WorkoutStateActions.loadingWorkoutListFailed({ error: err }))
        )
      )
    );
  });


  constructor(private readonly actions$: Actions,
              private workoutService: WorkoutService) {}
}
