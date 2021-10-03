import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'pet-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'easy-gym';
  todo: Observable<{id: string}[]>;

  constructor(private store: AngularFirestore, private db: AngularFireDatabase){
    this.todo = this.store.collection('todo').valueChanges({ idField: 'id' }) as Observable<{id: string}[]>;
  }

  //Example of setting database information
  // saveData(text: string){
  //   const ref = this.db.list("exercise");
  //
  //   ref.push(text).then((data) => {
  //     console.log(data);
  //   }).catch((err) => {
  //     console.error(err)
  //   })
  // }
}
