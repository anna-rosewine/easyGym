import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import type { Exercise } from '@pet/shared/functions';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from "firebase/firestore";
import { Observable } from 'rxjs';




@Component({
  selector: 'pet-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {
  exercises: Observable<Exercise[]> | undefined;

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore,private location: Location) {


  }

  back(){
    this.location.back()
  }

  createExercise(){
    const newExercise: Exercise = {
      description: 'descr', id: 1, name: 'hyperextention', sets: [], workoutId: 1
    }
    const ref = this.db.list("exercise");
    console.log(this.db.list<Exercise[]>("exercise").snapshotChanges())
    ref.push(newExercise).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.error(err)
    })
  }

 ngOnInit():void{
   this.afs.collection<Exercise>('exercise').valueChanges().subscribe((data) => {
     console.log(data)
   })
   console.log(this.exercises)
  }

}
