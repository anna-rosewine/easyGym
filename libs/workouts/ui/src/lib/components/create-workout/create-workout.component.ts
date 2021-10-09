import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { exerciseList, WorkoutStateFacade } from '@pet/workouts/feature';
import { Observable } from 'rxjs';
import { Exercise, Workout } from '@pet/shared/functions';
import { FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'pet-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.scss']
})
export class CreateWorkoutComponent implements OnInit {

  selectedItems: Exercise[] = [];
  // dropdownSettings = {};
  exercises: Observable<Exercise[]> | undefined;
  workoutForm = new FormGroup({
    title: new FormControl(''),
    exercises: new FormControl(''),
    weekType:  new FormControl(''),
    bodyPart: new FormControl(''),
  });
  exerciseList: Exercise[] | undefined;
  dropdownList: Exercise[] = [];
  dropdownSettings: IDropdownSettings;
  constructor(private router: Router, private workoutFacade: WorkoutStateFacade) {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'title',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: ListItem) {
    console.log(this.workoutForm.value.exercises,);
  }
  back(){
    this.router.navigate(['/home'])
  }

  createWorkout(){
    const newWorkout: Omit<Workout, "id"> = {
      exercises: this.workoutForm.value.exercises,
      name: this.workoutForm.value.title,
      weekType:  this.workoutForm.value.weekType
    }
    this.workoutFacade.createWorkout(newWorkout);
    this.workoutForm.patchValue({
      exercises: "",
      name: "",
      weekType: "",
    })
  }

  ngOnInit(): void {
    this.workoutFacade.getExerciseList()
    this.workoutFacade.exerciseList$.subscribe((data) => {
      if(data){
        this.exerciseList=data
        this.dropdownList=data
      }
    })
    // this.workoutFacade
    //   .selectExercise$(this.exerciseList[0].id)
    //   .subscribe((data) => {
    //     if (data) {
    //       this.exercise = data;
    //       // this.globalFacade.chooseCertainCompany(data);
    //     }
    //   });
  }

}
