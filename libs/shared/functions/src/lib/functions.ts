import { Location } from '@angular/common';
import { Exercise } from './interfaces';

export function back(){
  return Location.prototype.back()
}

export function sortExercises(exerciseList: Exercise[]):Exercise[]{
  return exerciseList.slice().sort((a, b) => {
    return a.title < b.title ? -1 : 1;
  })
}
