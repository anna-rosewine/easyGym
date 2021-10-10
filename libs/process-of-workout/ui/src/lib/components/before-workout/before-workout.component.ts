import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutStateFacade } from '@pet/workouts/feature';
import { Workout } from '@pet/shared/functions';

@Component({
  selector: 'pet-before-workout',
  templateUrl: './before-workout.component.html',
  styleUrls: ['./before-workout.component.scss']
})
export class BeforeWorkoutComponent implements OnInit {
  chosenWorkout: Workout | undefined;

  constructor(private router: Router, private workoutFacade: WorkoutStateFacade) { }

  back(){
    this.router.navigate(['/process/chooseWorkout'])
  }

  startWorkout(){
    this.router.navigate(['/process/exercise/1'])
  }

  ngOnInit(): void {
    this.workoutFacade.chosenWorkout$.subscribe((data) => {
      if(data){
        this.chosenWorkout=data
      }
    })
  }

}
