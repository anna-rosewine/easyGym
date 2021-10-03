import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromWorkoutState from './+state/workout-state.reducer';
import { WorkoutStateEffects } from './+state/workout-state.effects';
import { WorkoutStateFacade } from './+state/workout-state.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromWorkoutState.WORKOUTSTATE_FEATURE_KEY,
      fromWorkoutState.reducer
    ),
    EffectsModule.forFeature([WorkoutStateEffects]),
  ],
  providers: [WorkoutStateFacade],
})
export class WorkoutsFeatureModule {}
