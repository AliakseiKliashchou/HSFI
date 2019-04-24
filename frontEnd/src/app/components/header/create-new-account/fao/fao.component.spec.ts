import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaoComponent } from './fao.component';

describe('FaoComponent', () => {
  let component: FaoComponent;
  let fixture: ComponentFixture<FaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
