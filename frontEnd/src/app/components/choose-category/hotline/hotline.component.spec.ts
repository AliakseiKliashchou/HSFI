import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HotlineComponent } from './hotline.component';
import { HttpClientModule } from '@angular/common/http';



describe('HotlineComponent', () => {
  let component: HotlineComponent;
  let fixture: ComponentFixture<HotlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotlineComponent ],
      schemas:      [ NO_ERRORS_SCHEMA ],
      imports: [HttpClientModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
