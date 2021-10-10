import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pet-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  show: string
  constructor() {
    this.show = 'exercise'
  }

  toShow(){
    this.show ==='exercise' ? this.show = "workout" :  this.show ="exercise"
  }

  ngOnInit(): void {
  }

}
