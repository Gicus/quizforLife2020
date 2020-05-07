import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTestsCreatedByMeComponent } from './dashboard-tests-created-by-me.component';

describe('DashboardTestsCreatedByMeComponent', () => {
  let component: DashboardTestsCreatedByMeComponent;
  let fixture: ComponentFixture<DashboardTestsCreatedByMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTestsCreatedByMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTestsCreatedByMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
