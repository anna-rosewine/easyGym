import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutStateFacade } from '@pet/workouts/feature';
import { ExecutedWorkout, sortExercises, Workout } from '@pet/shared/functions';
import * as cuid from 'cuid';
import { AuthFacade } from '@pet/auth/feature';

@Component({
  selector: 'pet-before-workout',
  templateUrl: './before-workout.component.html',
  styleUrls: ['./before-workout.component.scss']
})
export class BeforeWorkoutComponent implements OnInit {
  chosenWorkout: Workout | undefined;
  workoutId: string;
  firstExerciseId: string | undefined
  userId: string | undefined;
  constructor(private router: Router, private workoutFacade: WorkoutStateFacade, private route: ActivatedRoute, private authFacade: AuthFacade) {
    this.workoutId = this.route.snapshot.params.workout_id;
  }

  back(){
    this.router.navigate(['/process/chooseWorkout'])
  }

  startWorkout(){
    if(this.chosenWorkout && this.userId){
      const executedWorkout: ExecutedWorkout = {
        uid: this.userId,
        date: Date.now().toString(),
        executedExercises: [], id: cuid(),
        planWorkoutId: this.chosenWorkout.id,
        name: this.chosenWorkout.name
      }
      this.workoutFacade.createExecutedWorkout(executedWorkout)
      // this.workoutFacade.updateExecutedWorkout(work)
    }

  }

  ngOnInit(): void {
    this.workoutFacade.getWorkoutList()
    this.authFacade.user$.subscribe((data) => {
      if(data){
        this.userId = data.uid
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
    this.workoutFacade.executedWorkoutKey$.subscribe((data) => {
      if(data){
        const workoutKey = data
        this.router.navigate([ `/process/${workoutKey}/${this.workoutId}/${this.firstExerciseId}`])
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
