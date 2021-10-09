import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeWorkoutComponent } from './before-workout.component';

describe('BeforeWorkoutComponent', () => {
  let component: BeforeWorkoutComponent;
  let fixture: ComponentFixture<BeforeWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeforeWorkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
