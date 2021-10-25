import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutStateFacade } from '@pet/workouts/feature';
import { AuthFacade } from '../../../../auth/feature/src';

@Component({
  selector: 'pet-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: string | undefined;

  constructor(private router: Router, private workoutFacade: WorkoutStateFacade, private authFacade: AuthFacade) { }
  createExercise(){
    this.router.navigate(['workout/createExercise'])
  }

  createWorkout(){
    this.router.navigate(['workout/createWorkout'])
  }

  logout(){
    this.authFacade.logout();
  }



  ngOnInit(): void {
    this.authFacade.user$.subscribe((data) => {
      if(data){
        const split  = data.email.split('@');
        this.name = split[0];
      }
    })
    this.authFacade.logout$.subscribe((data) => {
      if(data){
        if(data===true){
          this.router.navigate(['/auth/login'])
        }
      }
    })
    this.workoutFacade.exerciseList$.subscribe((data) => {
      if(data){
        // console.log(data)
      } else {
        this.workoutFacade.getExerciseList();
      }
    })
  }

}
