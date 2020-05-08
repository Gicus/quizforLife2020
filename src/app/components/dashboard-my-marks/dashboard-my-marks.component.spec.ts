import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardMyMarksComponent} from './dashboard-my-marks.component';

describe('DashboardMyTestsComponent', () => {
  let component: DashboardMyMarksComponent;
  let fixture: ComponentFixture<DashboardMyMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMyMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMyMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
