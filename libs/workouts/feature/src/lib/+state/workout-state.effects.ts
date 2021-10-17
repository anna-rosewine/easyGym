import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as WorkoutStateActions from './workout-state.actions';
import * as WorkoutStateFeature from './workout-state.reducer';
import { WorkoutService } from './workout.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Exercise, Workout } from '@pet/shared/functions';

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
            console.log(key.key, key.ref)
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
          map((key) => {
            console.log(key)
            return WorkoutStateActions.executedWorkoutSuccessfullyCreated();
          }),
          catchError(async (err) => WorkoutStateActions.executedWorkoutCreatingFailed({ error: err }))
        )
      )
    );
  });

  updateExecutedWorkout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkoutStateActions.updateExecutedWorkout),
      mergeMap((action) =>
        this.workoutService.updateExecutedWorkout(action.workout).pipe(
          map(() => {
            return WorkoutStateActions.executedWorkoutSuccessfullyUpdated();
          }),
          catchError(async (err) => WorkoutStateActions.executedWorkoutUpdatingFailed({ error: err }))
        )
      )
    );
  });
  //
  // createExercise2$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(WorkoutStateActions.createExercise),
  //     mergeMap((action) =>
  //       this.workoutService.createExercise(action.exercise).pipe(
  //         map(() => {
  //           return WorkoutStateActions.exerciseSuccessfullyCreated();
  //         }),
  //         catchError(async (err) => WorkoutStateActions.exerciseCreatingFailed({ error: err }))
  //       )
  //     )
  //   );
  // });

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
