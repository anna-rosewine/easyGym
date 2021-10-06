import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateExerciseComponent } from './components/create-exercise/create-exercise.component';
import { CreateWorkoutComponent } from './components/create-workout/create-workout.component';
import { RouterModule } from '@angular/router';
import { SharedFunctionsModule } from '@pet/shared/functions';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule,
    SharedFunctionsModule,
    RouterModule.forChild([
      {
        path: 'createExercise', pathMatch: 'full', component: CreateExerciseComponent
      },
      {
        path: 'createWorkout', pathMatch: 'full', component: CreateWorkoutComponent
      }
    ]), ReactiveFormsModule],
  declarations: [
    CreateExerciseComponent,
    CreateWorkoutComponent
  ],
})
export class WorkoutsUiModule {}
