import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { ExecutedExercise, ExecutedWorkout, Exercise, Workout } from '@pet/shared/functions';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, ObservedValueOf, of } from 'rxjs';
import firebase from 'firebase/compat';
import * as cuid from 'cuid';
import { from } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { DataSnapshot } from '@angular/fire/compat/database/interfaces';
import { getDatabase, ref, push, set } from "firebase/database";
import { DocumentChangeAction } from '@angular/fire/compat/firestore/interfaces';





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
  // Observable<Exercise[] | any[]>
  getExerciseList():Observable<ObservedValueOf<Observable<DocumentChangeAction<unknown>[]>>>{
    this.afs.collection('exercise').snapshotChanges().subscribe((data) => {
      console.log(data[0].payload.doc.data())
    })
    return from (this.afs.collection('exercise').snapshotChanges());
    // return this.db.list("exercise").valueChanges()
  }


  createExercise(newExercise:  Omit<Exercise, "id">): Observable<ObservedValueOf<Promise<DocumentReference<unknown>>>>{
      const newExerciseToService: Exercise = {
        ...newExercise,
        id: cuid()
      }
      // return  fromPromise(this.realTimeDbExercises.push(newExerciseToService).then())
    return  from(this.afs
      .collection("exercise")
      .add(newExerciseToService))
  }

  getWorkoutList():Observable<ObservedValueOf<Observable<DocumentChangeAction<unknown>[]>>>{
    // this.afs.collection('exercise').snapshotChanges().subscribe((data) => {
    //   console.log(data[0].payload.doc.data())
    // })
    return  from(this.afs.collection('workout').snapshotChanges())
    // return from (this.afs.collection('workout').snapshotChanges());
    // return this.db.list("workout").valueChanges()
  }

  createWorkout(newWorkout: Omit<Workout, "id">): Observable<DataSnapshot>{
    const newWorkoutToService: Workout = {
      ...newWorkout,
      id: cuid()
    }
    this.afs
      .collection("workout")
      .add(newWorkoutToService)
      .then(res => {console.log('yep')}, err => console.log(err));
    return  fromPromise(this.realTimeDbWorkouts.push(newWorkoutToService).get().then())
  }

  createExecutedExercise(executedExercise: ExecutedExercise){
    return  from(this.afs
      .collection("executedExercise")
      .add(executedExercise))
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
