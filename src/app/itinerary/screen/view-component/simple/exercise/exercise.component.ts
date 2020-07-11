import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {Exercise, ModesType} from './exercise.model';
import {FormControl, FormGroup} from '@angular/forms';
import {ExerciseService} from './exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.less']
})
export class ExerciseComponent implements OnInit {
  @Input() exercise: Exercise;
  exerciseForm: FormGroup;
  exerciseSent = false;
  errorMessage = 'El ejercicio no se ha encontrado';
  words: string[];
  gapsNum = 0;
  gapsPosition = [];
  correctNumber = -1;

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
    this.exerciseForm = new FormGroup({
      response: new FormControl(),
    });
    if (this.isFillType()) {
      this.buildFillExercise();
    }
  }

  isFillType(): boolean {
    return this.exercise.mode === ModesType.FILL;
  }

  sendResponse() {
    const exerciseResponse = {
      exerciseCard: this.exercise.exerciseCard,
      mode: this.exercise.mode,
      response: this.exerciseForm.get('response').value
    };
    if (this.isFillType()) {
      const answers = [];
      this.correctNumber = 0;
      let i = 0;
      this.gapsPosition.forEach(position => {
        const response = this.exerciseForm.get((`response${position}`)).value;
        answers.push(response);
        if (this.exercise.additionalInfo.keys[i] === response) {
          this.correctNumber++;
        }
        i++;
      });
      exerciseResponse.response = answers;
    }
    this.exerciseService.sendResponseOpenAnswer(exerciseResponse).subscribe(() => {
      this.disableForm();
    }, () => {
      this.disableForm();
    });
  }

  disableForm(): void {
    this.exerciseForm.disable();
    this.exerciseSent = true;
  }

  buildFillExercise(): void {
    this.words = this.exercise.additionalInfo.text.split(' ');
    this.words.forEach((word, index) => {
      if (this.keyWord(word)) {
        const control = new FormControl('');
        this.exerciseForm.addControl(`response${index}`, control);
        this.gapsPosition.push(index);
        this.gapsNum++;
      }
    });
  }

  keyWord(word: string): boolean {
    const key = this.exercise.additionalInfo.keys.find(keyWord => keyWord === word);
    return !!key;
  }

}
