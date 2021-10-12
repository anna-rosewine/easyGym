import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutStateFacade } from '@pet/workouts/feature';
import { ExecutedWorkout, sortExercises, Workout } from '@pet/shared/functions';

@Component({
  selector: 'pet-before-workout',
  templateUrl: './before-workout.component.html',
  styleUrls: ['./before-workout.component.scss']
})
export class BeforeWorkoutComponent implements OnInit {
  chosenWorkout: Workout | undefined;
  workoutId: string;
  firstExerciseId: string | undefined
  constructor(private router: Router, private workoutFacade: WorkoutStateFacade, private route: ActivatedRoute,) {
    this.workoutId = this.route.snapshot.params.workout_id;
  }

  back(){
    this.router.navigate(['/process/chooseWorkout'])
  }

  startWorkout(){
    if(this.firstExerciseId){
      this.router.navigate([ `/process/${this.workoutId}/${this.firstExerciseId}`])
    }
    const work: ExecutedWorkout = {
      date: 'qwe', executedExercises: [], id: 'qwe', planWorkoutId: 'qwe'

    }
    this.workoutFacade.updateExecutedWorkout(work)
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
        this.firstExerciseId = this.chosenWorkout.exercises[0].id
      }
    })
  }

}
