import { Component, OnInit } from '@angular/core';
import { WorkoutStateFacade } from '@pet/workouts/feature';
import { Exercise, Workout } from '@pet/shared/functions';

@Component({
  selector: 'pet-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  show: string
  activeWorkoutId: string | undefined;
  showExercise = true;
  showWorkout=false;
  exercises: Exercise[] | undefined;
  workouts: Workout[] | undefined;
  constructor(private workoutFacade: WorkoutStateFacade) {
    this.show = 'exercise'
  }

  toShow(){
    this.showExercise = !this.showExercise
    this.showWorkout = !this.showWorkout
    this.show ==='exercise' ? this.show = "workout" :  this.show ="exercise"
  }

  showWorkoutDetails(exerciseId: string){
    if(this.activeWorkoutId === exerciseId){
      this.activeWorkoutId = undefined
    } else {
      this.activeWorkoutId = exerciseId
    }
  }

  ngOnInit(): void {
    this.workoutFacade.getExerciseList()
    this.workoutFacade.getWorkoutList()
    this.workoutFacade.exerciseList$.subscribe((data) => {
      if(data){
        this.exercises = data
      }
    })
    this.workoutFacade.workoutList$.subscribe((data) => {
      if(data){
        this.workouts= data
      }
    })
  }

}
