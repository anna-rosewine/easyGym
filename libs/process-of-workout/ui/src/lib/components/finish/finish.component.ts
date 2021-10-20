import { Component, OnInit } from '@angular/core';
import { WorkoutStateFacade } from '@pet/workouts/feature';
import { ExecutedWorkout } from '@pet/shared/functions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pet-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  executedWorkout: ExecutedWorkout | undefined;
  workoutKey: string;

  constructor(private workoutFacade: WorkoutStateFacade, private route: ActivatedRoute, private router: Router) {
    this.workoutKey = this.route.snapshot.params.workout_key;

  }

  home(){
    this.router.navigate([''])
  }

  ngOnInit(): void {
    this.workoutFacade.currentExecutedWorkout$.subscribe((data) => {
      if(data){
        console.log(data)
        this.executedWorkout = data
      } else {
        this.workoutFacade.getExecutedWorkout(this.workoutKey)
      }
    })
  }

}
