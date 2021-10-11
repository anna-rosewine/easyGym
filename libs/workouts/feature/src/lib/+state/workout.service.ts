import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { ExecutedWorkout, Exercise, Workout } from '@pet/shared/functions';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/compat';
import * as cuid from 'cuid';
import { from } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';




@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private realTimeDbExercises: AngularFireList<unknown>;
  private realTimeDbWorkouts: AngularFireList<unknown>;
  private realTimeDbExecutedWorkouts:  AngularFireList<unknown>;

  constructor( private db: AngularFireDatabase, private afs: AngularFirestore) {
    this.realTimeDbExercises =this.db.list("exercise");
    this.realTimeDbWorkouts =this.db.list("workout");
    this.realTimeDbExecutedWorkouts =this.db.list("executedWorkout");
  }

  // getExerciseList():Observable<Exercise[]>{
  //
  // }

  getExerciseList():Observable<Exercise[] | any[]>{
    return this.db.list("exercise").valueChanges()
  }


  createExercise(newExercise:  Omit<Exercise, "id">): Observable<void>{
      const newExerciseToService: Exercise = {
        ...newExercise,
        id: cuid()
      }
      return  fromPromise(this.realTimeDbExercises.push(newExerciseToService).then())
  }

  getWorkoutList():Observable<Workout[] | any[]>{
    return this.db.list("workout").valueChanges()
  }

  createWorkout(newWorkout: Omit<Workout, "id">): Observable<void>{
    const newWorkoutToService: Workout = {
      ...newWorkout,
      id: cuid()
    }
    return  fromPromise(this.realTimeDbWorkouts.push(newWorkoutToService).then())
  }

  createExecutedWorkout(newWorkout: ExecutedWorkout): Observable<void>{
    return  fromPromise(this.realTimeDbWorkouts.push(newWorkout).then())
  }

  getExecutedWorkout(newWorkout: ExecutedWorkout): Observable<void>{
    return  fromPromise(this.realTimeDbWorkouts.push(newWorkout).then())
  }

  updateExecutedWorkout(newWorkout: ExecutedWorkout): Observable<void>{
    return  fromPromise(this.realTimeDbWorkouts.push(newWorkout).then())
  }

}
