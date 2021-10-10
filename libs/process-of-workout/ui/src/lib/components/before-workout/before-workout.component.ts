import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutStateFacade } from '@pet/workouts/feature';
import { sortExercises, Workout } from '@pet/shared/functions';

@Component({
  selector: 'pet-before-workout',
  templateUrl: './before-workout.component.html',
  styleUrls: ['./before-workout.component.scss']
})
export class BeforeWorkoutComponent implements OnInit {
  chosenWorkout: Workout | undefined;
  workoutId: string;

  constructor(private router: Router, private workoutFacade: WorkoutStateFacade, private route: ActivatedRoute,) {
    this.workoutId = this.route.snapshot.params.workout_id;
  }

  back(){
    this.router.navigate(['/process/chooseWorkout'])
  }

  startWorkout(){
    this.router.navigate([ `/process/${this.workoutId}/1`])
  }

  ngOnInit(): void {
    this.workoutFacade.getWorkoutList()
    this.workoutFacade.selectWorkout$(this.workoutId).subscribe((data) => {
      if(data){
        this.chosenWorkout=data
        this.chosenWorkout = {
          ...this.chosenWorkout,
          exercises: sortExercises(this.chosenWorkout.exercises)
        }
      }
    })
    this.workoutFacade.chosenWorkout$.subscribe((data) => {
      if(data){
        this.chosenWorkout=data
        this.chosenWorkout = {
          ...this.chosenWorkout,
          exercises: sortExercises(this.chosenWorkout.exercises)
        }
      }
    })
  }

}
