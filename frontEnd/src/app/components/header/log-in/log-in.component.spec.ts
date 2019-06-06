import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatFormFieldModule, MatFormField, MatHint, MatFormFieldBase, MatError} from '@angular/material/form-field';
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LogInComponent } from './log-in.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import {Routes, RouterModule} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInComponent ],
      imports: [MatFormFieldModule, MatSnackBarModule,  ModalModule.forRoot(), HttpClientModule, RouterModule, RouterTestingModule,],
      schemas:      [ NO_ERRORS_SCHEMA ],
      providers: [BsModalService, BsModalRef,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
