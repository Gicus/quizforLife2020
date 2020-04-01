import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTestComponent } from './access-test.component';

describe('AccessTestComponent', () => {
  let component: AccessTestComponent;
  let fixture: ComponentFixture<AccessTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
