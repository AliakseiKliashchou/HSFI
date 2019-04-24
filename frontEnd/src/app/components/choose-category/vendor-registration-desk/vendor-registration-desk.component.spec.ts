import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRegistrationDeskComponent } from './vendor-registration-desk.component';

describe('VendorRegistrationDeskComponent', () => {
  let component: VendorRegistrationDeskComponent;
  let fixture: ComponentFixture<VendorRegistrationDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorRegistrationDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorRegistrationDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
