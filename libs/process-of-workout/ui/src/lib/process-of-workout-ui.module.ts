import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseWorkoutComponent } from './components/choose-workout/choose-workout.component';
import { BeforeWorkoutComponent } from './components/before-workout/before-workout.component';
import { ExercisePageComponent } from './components/exercise-page/exercise-page.component';
import { RouterModule } from '@angular/router';
import { FinishComponent } from './components/finish/finish.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { WorkoutsFeatureModule } from '@pet/workouts/feature';


@NgModule({
  imports: [CommonModule,
    StoreRouterConnectingModule.forRoot({}),
    WorkoutsFeatureModule,
    RouterModule.forChild([
      {
        path: 'preWorkout/:workout_id', pathMatch: 'full', component: BeforeWorkoutComponent
      },
      {
        path: 'chooseWorkout', pathMatch: 'full', component:ChooseWorkoutComponent
      },
      {
        path: ':workout_id/:exercise_id', pathMatch: 'full', component: ExercisePageComponent
      },
      {
        path: 'finish', pathMatch: 'full', component: FinishComponent
      }
    ]),],
  declarations: [
    ChooseWorkoutComponent,
    BeforeWorkoutComponent,
    ExercisePageComponent,
    FinishComponent
  ],
})
export class ProcessOfWorkoutUiModule {}
