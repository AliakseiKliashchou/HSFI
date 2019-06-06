import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InspectionDeskComponent } from './inspection-desk.component';
import { HotlineComponent } from '../../choose-category/hotline/hotline.component';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('InspectionDeskComponent', () => {
  let component: InspectionDeskComponent;
  let fixture: ComponentFixture<InspectionDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionDeskComponent ],
      schemas:      [ NO_ERRORS_SCHEMA ],
      imports: [HttpClientModule, RouterModule, RouterTestingModule,  ModalModule.forRoot(), MatSnackBarModule   ],
      providers: [BsModalService, BsModalRef,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
