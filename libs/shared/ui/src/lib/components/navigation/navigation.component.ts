import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pet-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() activeBar: string | undefined
  activeList: boolean | undefined;
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
    if(this.activeBar === 'list'){
      this.activeList = true
    } else {
      this.activeList = undefined
    }
  }

}
