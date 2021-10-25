import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'pet-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'easy-gym';
  mobile: boolean

  constructor(private router: Router){
    this.router.navigate(['/profile'])
    if(window.innerWidth < 440){
      this.mobile = true
    } else {
      this.mobile = false
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(window.innerWidth < 440){
      this.mobile = true
    } else {
      this.mobile = false
    }
  }

  ngOnInit() {
    if(window.innerWidth < 440){
      this.mobile = true
    } else {
      this.mobile = false
    }
  }

}
