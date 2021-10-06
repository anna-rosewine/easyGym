import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import type { Exercise } from '@pet/shared/functions';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc } from "firebase/firestore";
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';




@Component({
  selector: 'pet-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {
  exercises: Observable<Exercise[]> | undefined;
  exerciseForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    planReps: new FormControl(''),
    planSets: new FormControl(''),
    planWeight: new FormControl(''),
  });
  constructor(private db: AngularFireDatabase, private afs: AngularFirestore,private location: Location) {
    console.log(this.db.list<Exercise[]>("exercise").snapshotChanges())
  }

  back(){
    this.location.back()
  }

  createExercise(){
    const newExercise: Omit<Exercise, "id"> = {
      planSets: this.exerciseForm.value.planSets,
      description: this.exerciseForm.value.description,
      title: this.exerciseForm.value.title,
      planReps: this.exerciseForm.value.planReps,
      planWeight: this.exerciseForm.value.planWeight
    }
    const ref = this.db.list("exercise");
    const realTimeDb = this.db.object("exercise");
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
    this.db.object("exercise").valueChanges().subscribe((data) => {
     console.log(data)
   })
  }

}
