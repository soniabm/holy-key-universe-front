import {Component, Input, OnInit} from '@angular/core';
import {ViewComponent, ViewComponentType} from '../../view.component.model';
import {ViewComponentUtils} from '../../view.component.utils';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.less']
})
export class SimpleComponent implements OnInit {
  @Input() viewComponent: ViewComponent;

  constructor() { }

  ngOnInit(): void {
  }

  getType(): string {
    return ViewComponentUtils.getType(this.viewComponent);
  }

  isText(): boolean {
    return this.getType() === ViewComponentType.TEXT;
  }

  isImage(): boolean {
    return this.getType() === ViewComponentType.IMAGE;
  }

  isDiagram(): boolean {
    return this.getType() === ViewComponentType.DIAGRAM;
  }

  isExercise(): boolean {
    return this.getType() === ViewComponentType.EXERCISE;
  }

  isDynamic(): boolean {
    return this.getType() === ViewComponentType.DYNAMIC;
  }

}
