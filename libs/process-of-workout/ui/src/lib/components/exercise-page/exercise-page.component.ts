import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutStateFacade } from '@pet/workouts/feature';
import { sortExercises, Workout } from '@pet/shared/functions';

@Component({
  selector: 'pet-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.scss']
})
export class ExercisePageComponent implements OnInit {
  workoutId: string;
  chosenWorkout: Workout | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private workoutFacade: WorkoutStateFacade) {
    this.workoutId = this.route.snapshot.params.workout_id;
  }

  back(){
    this.router.navigate([`/process/preWorkout/${this.workoutId}`])
  }



  ngOnInit(): void {
    this.workoutFacade.getWorkoutList()
    this.workoutFacade.chosenWorkout$.subscribe((data) => {
      if(data){
        this.chosenWorkout=data
        this.chosenWorkout = {
          ...this.chosenWorkout,
          exercises: sortExercises(this.chosenWorkout.exercises)
        }
      }
    })
    this.workoutFacade.selectWorkout$(this.workoutId).subscribe((data) => {
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
