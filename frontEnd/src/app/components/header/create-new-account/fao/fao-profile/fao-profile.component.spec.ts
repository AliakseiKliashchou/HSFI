import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaoProfileComponent } from './fao-profile.component';

describe('FaoProfileComponent', () => {
  let component: FaoProfileComponent;
  let fixture: ComponentFixture<FaoProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaoProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
