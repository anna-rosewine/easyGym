import { Component, OnInit } from '@angular/core';
import type { Exercise } from '@pet/shared/functions';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkoutStateFacade } from '@pet/workouts/feature';
import { AuthFacade } from '@pet/auth/feature';




@Component({
  selector: 'pet-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {
  exercises: Observable<Exercise[]> | undefined;
  exerciseForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    planReps: new FormControl(''),
    planSets: new FormControl(''),
    planWeight: new FormControl(''),
    weekType:  new FormControl(''),
  });
  userId: string | undefined;

  constructor(private workoutFacade: WorkoutStateFacade, private authFacade: AuthFacade, private location: Location, private router: Router) {
  }

  back(){
    this.location.back()
    this.router.navigate(['/home'])
  }

  createExercise(){
    console.log(this.exerciseForm.value.weekType)
    if(this.userId){
      const newExercise: Omit<Exercise, "id"> = {
        uid: this.userId,
        planSets: this.exerciseForm.value.planSets,
        description: this.exerciseForm.value.description,
        title: this.exerciseForm.value.title,
        planReps: this.exerciseForm.value.planReps,
        planWeight: this.exerciseForm.value.planWeight,
        weekType: this.exerciseForm.value.weekType
      }
      this.workoutFacade.createExercise(newExercise);
      this.exerciseForm.patchValue({
        title: "",
        description:"",
        planReps: "",
        planSets:"",
        planWeight: "",
        weekType: "",
      })
    }
  }

 ngOnInit():void{
    this.authFacade.user$.subscribe((data) => {
      if(data){
        this.userId = data.uid
      }
    })
  }
}
