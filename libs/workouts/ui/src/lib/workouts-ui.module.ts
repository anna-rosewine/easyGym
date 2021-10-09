import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateExerciseComponent } from './components/create-exercise/create-exercise.component';
import { CreateWorkoutComponent } from './components/create-workout/create-workout.component';
import { RouterModule } from '@angular/router';
import { SharedFunctionsModule } from '@pet/shared/functions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { WorkoutsFeatureModule } from '@pet/workouts/feature';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [CommonModule,
    SharedFunctionsModule,
    StoreRouterConnectingModule.forRoot({}),
    WorkoutsFeatureModule,
    RouterModule.forChild([
      {
        path: 'createExercise', pathMatch: 'full', component: CreateExerciseComponent
      },
      {
        path: 'createWorkout', pathMatch: 'full', component: CreateWorkoutComponent
      }
    ]), ReactiveFormsModule, NgMultiSelectDropDownModule, FormsModule],
  declarations: [
    CreateExerciseComponent,
    CreateWorkoutComponent
  ],
})
export class WorkoutsUiModule {}
