import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseWorkoutComponent } from './components/choose-workout/choose-workout.component';
import { BeforeWorkoutComponent } from './components/before-workout/before-workout.component';
import { ExercisePageComponent } from './components/exercise-page/exercise-page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ChooseWorkoutComponent,
    BeforeWorkoutComponent,
    ExercisePageComponent
  ],
})
export class ProcessOfWorkoutUiModule {}
