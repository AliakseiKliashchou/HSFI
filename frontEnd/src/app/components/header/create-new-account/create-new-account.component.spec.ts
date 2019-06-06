import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatButtonModule, MatCheckboxModule, MatMenu, MatMenuModule, MatIconModule, MatInput, MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';
import { CreateNewAccountComponent } from './create-new-account.component';
import {Routes, RouterModule} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateNewAccountComponent', () => {
  let component: CreateNewAccountComponent;
  let fixture: ComponentFixture<CreateNewAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewAccountComponent ],
      imports: [MatMenuModule, RouterModule, RouterTestingModule,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
