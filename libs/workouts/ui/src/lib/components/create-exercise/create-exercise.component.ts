import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Exercise } from '../../../../../../shared/functions/src/lib/interfaces';


@Component({
  selector: 'pet-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {

  constructor(private db: AngularFireDatabase) {
  }

  createExercise(){
    const newExercise: Exercise = {
      description: 'descr', id: 1, name: 'hyperextention', sets: [], workoutId: 1

    }
    const ref = this.db.list("exercise");
    ref.push(newExercise).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.error(err)
    })
  }

  ngOnInit(): void {
  }

}
