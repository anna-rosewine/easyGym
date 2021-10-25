import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesctopComponent } from './desctop.component';

describe('DesctopComponent', () => {
  let component: DesctopComponent;
  let fixture: ComponentFixture<DesctopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesctopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesctopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
