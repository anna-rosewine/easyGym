import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pet-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.scss']
})
export class ExercisePageComponent implements OnInit {

  constructor(private router: Router) { }

  back(){
    this.router.navigate(['/process/preWorkout'])
  }

  ngOnInit(): void {
  }

}
