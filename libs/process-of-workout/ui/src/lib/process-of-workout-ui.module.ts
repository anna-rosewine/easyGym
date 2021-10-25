import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseWorkoutComponent } from './components/choose-workout/choose-workout.component';
import { BeforeWorkoutComponent } from './components/before-workout/before-workout.component';
import { ExercisePageComponent } from './components/exercise-page/exercise-page.component';
import { RouterModule } from '@angular/router';
import { FinishComponent } from './components/finish/finish.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { WorkoutsFeatureModule } from '@pet/workouts/feature';
import { FormsModule } from '@angular/forms';
import { SharedFunctionsModule } from '../../../../shared/functions/src';
import { NgParticlesModule } from 'ng-particles';


@NgModule({
  imports: [CommonModule,
    NgParticlesModule,
    StoreRouterConnectingModule.forRoot({}),
    WorkoutsFeatureModule,
    SharedFunctionsModule,
    RouterModule.forChild([
      {
        path: 'preWorkout/:workout_id', pathMatch: 'full', component: BeforeWorkoutComponent
      },
      {
        path: 'chooseWorkout', pathMatch: 'full', component: ChooseWorkoutComponent
      },
      {
        path: ':workout_key/:workout_id/:exercise_id', pathMatch: 'full', component: ExercisePageComponent
      },
      {
        path: 'finish/:workout_key', pathMatch: 'full', component: FinishComponent
      }
    ]), FormsModule],
  declarations: [
    ChooseWorkoutComponent,
    BeforeWorkoutComponent,
    ExercisePageComponent,
    FinishComponent
  ],
})
export class ProcessOfWorkoutUiModule {}
