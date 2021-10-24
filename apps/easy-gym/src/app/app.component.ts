import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'pet-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'easy-gym';

  constructor(private router: Router){
    this.router.navigate(['/profile'])
    //private store: AngularFirestore, private db: AngularFireDatabase
    // this.todo = this.store.collection('todo').valueChanges({ idField: 'id' }) as Observable<{id: string}[]>;
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
