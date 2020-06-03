import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardTestSolutionsComponent} from './dashboard-tests-solutions.component';

describe('DashboardTestSolutionsComponent', () => {
  let component: DashboardTestSolutionsComponent;
  let fixture: ComponentFixture<DashboardTestSolutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTestSolutionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTestSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
