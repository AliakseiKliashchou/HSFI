import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionDeskComponent } from './inspection-desk.component';

describe('InspectionDeskComponent', () => {
  let component: InspectionDeskComponent;
  let fixture: ComponentFixture<InspectionDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionDeskComponent ]
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
