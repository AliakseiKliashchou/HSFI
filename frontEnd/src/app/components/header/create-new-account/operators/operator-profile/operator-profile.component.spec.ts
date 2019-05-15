import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorProfileComponent } from './operator-profile.component';

describe('OperatorProfileComponent', () => {
  let component: OperatorProfileComponent;
  let fixture: ComponentFixture<OperatorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});