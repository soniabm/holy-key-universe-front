import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExerciseComponent} from './exercise.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {ExerciseService} from './exercise.service';
import {ModesType} from './exercise.model';

describe('ExerciseComponent', () => {
  let component: ExerciseComponent;
  let fixture: ComponentFixture<ExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseComponent ],
      providers: [ ExerciseService, HttpClient, HttpHandler ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseComponent);
    component = fixture.componentInstance;
    component.exercise = { statement: '', mode: ModesType.OPENANSWER, exerciseCard: { card: '', index: 0, unit: ''} };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
