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
import { DataSnapshot } from '@angular/fire/compat/database/interfaces';
import { getDatabase, ref, push, set } from "firebase/database";





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
    this.realTimeDbWorkouts.valueChanges().subscribe((data) => {
      console.log(data.keys(), data.reverse())
    })

    // const db1 = getDatabase();
    // const postListRef = ref(db1, 'workout');
    // const newPostRef = push(postListRef);
    // set(newPostRef, {
    //   id: 1
    // });

    this.realTimeDbWorkouts.snapshotChanges().subscribe((data) => {
      // data.map((i) => {console.log(i.key)})
    })
    this.realTimeDbWorkouts.stateChanges().subscribe((data) => {
      // console.log(data.key)
    })
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

  getWorkoutList():Observable<Workout[] | any[] >{
    return this.db.list("workout").valueChanges()
  }

  createWorkout(newWorkout: Omit<Workout, "id">): Observable<DataSnapshot>{
    const newWorkoutToService: Workout = {
      ...newWorkout,
      id: cuid()
    }
    return  fromPromise(this.realTimeDbWorkouts.push(newWorkoutToService).get().then())
  }

  createExecutedWorkout(newWorkout: ExecutedWorkout): Observable<string>{
    return  fromPromise(this.db.list(`workout`).push(newWorkout).get().then())
  }

  getListOfExecutedWorkout( ):Observable<{type: string, key: string} | ExecutedWorkout[] | any[]>{
    return this.realTimeDbExecutedWorkouts.snapshotChanges()
  }

  updateExecutedWorkout(newWorkout: ExecutedWorkout): Observable<void>{

    return  fromPromise(this.realTimeDbExecutedWorkouts.update('-MleW8HCzreZP9EktDd1', newWorkout).then())
  }

}
