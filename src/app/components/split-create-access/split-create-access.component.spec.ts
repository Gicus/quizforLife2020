import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitCreateAccessComponent } from './split-create-access.component';

describe('SplitCreateAccessComponent', () => {
  let component: SplitCreateAccessComponent;
  let fixture: ComponentFixture<SplitCreateAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitCreateAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitCreateAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
