import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcProfileComponent } from './npc-profile.component';

describe('NpcProfileComponent', () => {
  let component: NpcProfileComponent;
  let fixture: ComponentFixture<NpcProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpcProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpcProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
