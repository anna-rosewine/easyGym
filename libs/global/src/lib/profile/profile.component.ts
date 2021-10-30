import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutStateFacade } from '@pet/workouts/feature';
import { AuthFacade } from '@pet/auth/feature';
import { ExecutedWorkout } from '@pet/shared/functions';

@Component({
  selector: 'pet-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: string | undefined;
  usersExecutedWorkouts: ExecutedWorkout[] | undefined

  constructor(private router: Router, private workoutFacade: WorkoutStateFacade, private authFacade: AuthFacade) { }
  createExercise(){
    this.router.navigate(['workout/createExercise'])
  }

  createWorkout(){
    this.router.navigate(['workout/createWorkout'])
  }

  logout(){
    this.authFacade.logout();
    this.authFacade.logoutWasSuccessful$.subscribe((data) => {
      if(data){
        if(data===true){
          this.router.navigate(['/auth/login'])
        }
      }
    })
  }



  ngOnInit(): void {
    this.workoutFacade.getExecutedWorkoutList();
    this.authFacade.user$.subscribe((data) => {
      if(data){
        if(data.displayName && (data.displayName.length>1)){
          this.name = data.displayName
        } else {
          const split  = data.email.split('@');
          this.name = split[0];
        }
        this.workoutFacade.getPersonalizedExecutedWorkouts$(data.uid).subscribe((data1) => {
          if(data1){
            console.log(data1[0])
            this.usersExecutedWorkouts = data1
          }
        })
      }
    })

    this.workoutFacade.executedWorkoutList$.subscribe((data) => {
      if(data){
        console.log(data)
      }
    })

      this.authFacade.user$.subscribe((data) => {
        if(!data) {
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
