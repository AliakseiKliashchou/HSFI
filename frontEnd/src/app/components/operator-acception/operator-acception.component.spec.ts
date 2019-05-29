import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorAcceptionComponent } from './operator-acception.component';

describe('OperatorAcceptionComponent', () => {
  let component: OperatorAcceptionComponent;
  let fixture: ComponentFixture<OperatorAcceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorAcceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorAcceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
