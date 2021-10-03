import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pet-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) { }
  createExercise(){
    console.log('create exercise')
    this.router.navigate(['workout/createExercise'])
  }

  createWorkout(){
    console.log('create exercise')
    this.router.navigate(['workout/createExercise'])
  }
  ngOnInit(): void {
  }

}
