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
  }
}
