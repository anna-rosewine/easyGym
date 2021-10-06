import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Exercise } from '@pet/shared/functions';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/compat';
import ThenableReference = firebase.database.ThenableReference;


@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor(private http: HttpClient,private db: AngularFireDatabase, private afs: AngularFirestore) {}

  // getExerciseList():Observable<Exercise[]>{
  //
  // }

  createExercise(newExercise:  Omit<Exercise, "id">): Observable<number>{
    const ref = this.db.list("exercise");
    const newExerciseToService: Exercise = {
      ...newExercise,
      id: String(Math.floor(Math.random()*1000))
    }
    // console.log(this.db.list<Exercise[]>("exercise").snapshotChanges())
    ref.push(newExerciseToService).then((data) => {
      console.log(data);
      return of(1);
    }).catch((err) => {
      console.error(err)
      return err
    })
  }
}
