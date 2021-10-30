import { Location } from '@angular/common';
import { ExecutedExercise, ExecutedWorkout, Exercise, Workout } from './interfaces';


export function back(){
  return Location.prototype.back()
}

export function sortExercises(exerciseList: Exercise[]):Exercise[]{
  return exerciseList.slice().sort((a, b) => {
    if(a.order && b.order){
      return a.order < b.order ? -1 : 1;
    } else {
      return a.title < b.title ? -1 : 1;

    }
  })
}

export function personalizedExercises(exercises: Exercise[], userId: string){
  const newList : Exercise[] = []
  exercises.forEach((e) => {
      if(e.uid === userId || e.uid === '1'){
        newList.push(e)
      }
  })
  return newList;
}

export function personalizedWorkouts(exercises:Workout[] , userId: string){
  const newList : Workout[]  = []
  exercises.forEach((e) => {
    if(e.uid === userId || e.uid === '1'){
      newList.push(e)
    }
  })
  return newList;
}


export function personalizedExecutedWorkouts(exercises: ExecutedWorkout[], userId: string){
  const newList :ExecutedWorkout[] = []
  exercises.forEach((e) => {
    if(e.uid === userId || e.uid === '1'){
      newList.push(e)
    }
  })
  return newList;
}

