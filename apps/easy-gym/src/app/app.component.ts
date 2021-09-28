import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'pet-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'easy-gym';
  todo: Observable<{id: string}[]>;

  constructor(private store: AngularFirestore){
    this.todo = this.store.collection('todo').valueChanges({ idField: 'id' }) as Observable<{id: string}[]>;
  }
}
