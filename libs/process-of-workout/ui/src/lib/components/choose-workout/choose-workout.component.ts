import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutStateFacade } from '@pet/workouts/feature';
import { Workout } from '@pet/shared/functions';

@Component({
  selector: 'pet-choose-workout',
  templateUrl: './choose-workout.component.html',
  styleUrls: ['./choose-workout.component.scss']
})
export class ChooseWorkoutComponent implements OnInit {
  workoutList: Workout[] | undefined;
  chosenWorkoutId: string | undefined;
  message: string | undefined;
  constructor(private router: Router, private workoutFacade: WorkoutStateFacade) { }
  chooseWorkout(){
    if(this.chosenWorkoutId){
      this.message = undefined
      this.router.navigate([`/process/preWorkout/${this.chosenWorkoutId}`])
    } else {
      this.message = 'Без выбранной тренировки ты не сможешь продолжить'
    }
  }

  choose(workout: Workout){
    this.chosenWorkoutId = workout.id
    this.workoutFacade.selectWorkout$(this.chosenWorkoutId).subscribe((data) => {
      if(data){
        this.workoutFacade.setChosenWorkout(data)
      }
    })
  }

  back(){
    this.router.navigate(['/home'])
  }

  ngOnInit(): void {
    this.workoutFacade.getWorkoutList()
    this.workoutFacade.workoutList$.subscribe((data) => {
      if(data){
        this.workoutList = data
      }
      }
    )
  }

}
