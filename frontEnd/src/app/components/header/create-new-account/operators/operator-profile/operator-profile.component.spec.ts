import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { OperatorProfileComponent } from './operator-profile.component';

describe('OperatorProfileComponent', () => {
  let component: OperatorProfileComponent;
  let fixture: ComponentFixture<OperatorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorProfileComponent ],
      schemas:      [ NO_ERRORS_SCHEMA ],
      imports: [HttpClientModule, MatSnackBarModule]
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
