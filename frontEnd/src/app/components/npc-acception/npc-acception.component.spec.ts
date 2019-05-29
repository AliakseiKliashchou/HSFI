import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcAcceptionComponent } from './npc-acception.component';

describe('NpcAcceptionComponent', () => {
  let component: NpcAcceptionComponent;
  let fixture: ComponentFixture<NpcAcceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpcAcceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpcAcceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
