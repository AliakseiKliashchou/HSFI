import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchCardDeskComponent } from './scratch-card-desk.component';

describe('ScratchCardDeskComponent', () => {
  let component: ScratchCardDeskComponent;
  let fixture: ComponentFixture<ScratchCardDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScratchCardDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScratchCardDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
