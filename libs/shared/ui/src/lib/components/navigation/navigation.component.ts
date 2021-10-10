import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pet-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  startWorkout(){
    this.router.navigate(['process/chooseWorkout'])
  }

  goHome(){
    this.router.navigate(['/home'])

  }

  showList(){
    this.router.navigate(['workout/list'])
  }

  ngOnInit(): void {
  }

}
