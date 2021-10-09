import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutStateFacade } from '@pet/workouts/feature';

@Component({
  selector: 'pet-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private workoutFacade: WorkoutStateFacade) { }
  createExercise(){
    console.log('create exercise')
    this.router.navigate(['workout/createExercise'])
  }

  createWorkout(){
    console.log('create exercise')
    this.router.navigate(['workout/createWorkout'])
  }
  ngOnInit(): void {
    this.workoutFacade.getExerciseList();
    this.workoutFacade.exerciseList$.subscribe((data) => {
      if(data){
        console.log(data)
      }
    })
  }

}
