import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutStateFacade } from '@pet/workouts/feature';
import { ExecutedExercise, Exercise, SetForUI, sortExercises, Workout } from '@pet/shared/functions';
import * as cuid from 'cuid';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';




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
  editedNumber: number | undefined;
  nextExerciseId: string | undefined;
  chosenExerciseOrder: number | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private afs: AngularFirestore, private workoutFacade: WorkoutStateFacade) {
    this.workoutId = this.route.snapshot.params.workout_id;
    this.exerciseId = this.route.snapshot.params.exercise_id;

  }

  nextExercise() :void{
    if(this.executedExercise){
      this.executedExercise.realSets = this.setArr
      from(this.afs
        .collection("executedExercise")
        .add(this.executedExercise))
    }
    this.router.navigate([`/process/${this.workoutId}/`])
  }

  back(){
    this.router.navigate([`/process/preWorkout/${this.workoutId}`])
  }

  changeSet(set: SetForUI, mes: string){
    const enum message  {
      increaseReps = "increaseReps",
      decreaseReps = "decreaseReps",
      increaseWeight = "increaseWeight",
      decreaseWeight = "decreaseWeight",
    }
    switch (mes) {
      case message.increaseReps:
        if(set.repetitions)
        ++set.repetitions;
        break;
      case message.decreaseReps:
        if(set.repetitions)
          --set.repetitions;
        break;
      case message.increaseWeight:
        if(set.weight)
          ++set.weight;
        break;
      case message.decreaseWeight:
        if(set.weight)
          ++set.weight;
        break;
    }
  }

  check(num: number){
    if(num===0){
      this.editedNumber =1
    }
    console.log(this.editedNumber)
  }



  changeMode(set: SetForUI, mes: string){
    const enum message  {
      onEditRepMode = 'onEditRepMode',
      onEditWeightMode = 'onEditWeightMode',
      offEditRepMode = 'offEditRepMode',
      offEditWeightMode = 'offEditWeightMode',
    }

    console.log(this.editedNumber)
    switch (mes) {
      case message.onEditRepMode:
        this.editedNumber=set.repetitions
        set.editMode = true;
        break;
      case message.offEditRepMode:
        set.repetitions=this.editedNumber
        set.editMode = false;
        this.editedNumber = undefined
        break;
      case message.onEditWeightMode:
        set.editMode = true;
        break;
      case message.offEditWeightMode:
        set.editMode = false;
        break;
      default:
        break;
    }
  }



  markSetAsDone(set: SetForUI, e?: Event){
      set.isDone = !set.isDone
      console.log(this.setArr)
  }

  downloadNextExercise(){
    if(this.chosenPlannedExercise&&this.chosenPlannedExercise.order&&this.chosenWorkout){
      this.chosenExerciseOrder = this.chosenPlannedExercise.order;
        // const nextExercise = this.chosenWorkout.exercises.find((e) => e.order=== this.chosenPlannedExercise.order+1)
      this.nextExerciseId = this.chosenWorkout.exercises[1].id

    }
  }

  ngOnInit(): void {
    this.workoutFacade.getWorkoutList()
    this.workoutFacade.getExerciseList();
    this.workoutFacade.selectWorkout$(this.workoutId).subscribe((data) => {
      if(data){
        this.chosenWorkout=data
        this.chosenWorkout = {
          ...this.chosenWorkout,
          exercises: sortExercises(this.chosenWorkout.exercises)
        }

        this.nextExerciseId = this.chosenWorkout.exercises[1].id
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
        const plannedSet: SetForUI = {
          isDone: false,
          withoutChanges: true,
          repetitions: data.planReps,
          weight: data.planWeight,
          id: cuid(),
          // editWeightMode: false,
          editMode: false
        }
        const sameArr: SetForUI[] = []
        if(this.setArr.length<1){
          for (let i = 0; i < this.executedExercise.planSets; i++){
            sameArr.push(plannedSet)
          }
          sameArr.forEach((s) => {
             s = {
              ...s,
              id: cuid()
            }
           this.setArr.push(s)
          })
          console.log(this.setArr)
        }
      }
    })
  }

}
