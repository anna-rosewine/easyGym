import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutStateFacade } from '@pet/workouts/feature';
import { ExecutedExercise, Exercise, SetForUI, sortExercises, Workout } from '@pet/shared/functions';
import * as cuid from 'cuid';


@Component({
  selector: 'pet-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.scss']
})
export class ExercisePageComponent implements OnInit {
  workoutId: string;
  chosenWorkout: Workout | undefined;
  exerciseId: string;
  exercise: Exercise | undefined;
  chosenPlannedExercise: Exercise | undefined;
  executedExercise: ExecutedExercise | undefined;
  setArr: SetForUI[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private workoutFacade: WorkoutStateFacade) {
    this.workoutId = this.route.snapshot.params.workout_id;
    this.exerciseId = this.route.snapshot.params.exercise_id;

  }

  back(){
    this.router.navigate([`/process/preWorkout/${this.workoutId}`])
  }

  markSetAsDone(id: string){
    const neededSet: SetForUI | undefined = this.setArr.filter((s) => s.id === id)[0];
    if(neededSet){
      neededSet.isDone = !neededSet.isDone
      // neededSet = {
      //   ...neededSet,
      //   isDone:  !neededSet.isDone
      // }
      console.log(this.setArr)
    }

  }



  ngOnInit(): void {
    this.workoutFacade.getWorkoutList()
    this.workoutFacade.getExerciseList();
    this.workoutFacade.selectExercise$(this.exerciseId).subscribe((data) => {
      if(data){
        this.exercise = data
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
    this.workoutFacade.selectWorkout$(this.workoutId).subscribe((data) => {
      if(data){
        this.chosenWorkout=data
        this.chosenWorkout = {
          ...this.chosenWorkout,
          exercises: sortExercises(this.chosenWorkout.exercises)
        }
      }
    })
    this.workoutFacade.selectExercise$(this.exerciseId).subscribe((data) => {
      if(data) {
        this.chosenPlannedExercise = data
        this.executedExercise = {
          id: cuid(),
          note: '',
          planExerciseID: this.chosenPlannedExercise.id,
          planReps: this.chosenPlannedExercise.planReps,
          planSets: this.chosenPlannedExercise.planSets,
          planWeight: this.chosenPlannedExercise.planWeight,
          realSets: [],
          title: ''
        }
        console.log(data)

        this.setArr.forEach((s) => {
            s = {
              ...s,
              isDone: false,
              withoutChanges: true,
              repetitions: data.planReps,
              weight: data.planWeight,
              id: cuid()
            }
            // s.id = cuid()
            console.log(s)
          })
        console.log(this.setArr)
      }
    })
  }

}
