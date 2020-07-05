import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ViewComponent} from '../../view.component.model';
import {ViewComponentUtils} from '../../view.component.utils';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit, OnChanges {
  @Input() viewComponent: ViewComponent;
  viewComponentType: string;

  constructor() {
  }

  ngOnInit(): void {
    this.getType();
  }

  getType() {
    this.viewComponentType = ViewComponentUtils.getType(this.viewComponent);
  }

  isComposite(viewComponent: ViewComponent): boolean {
    return ViewComponentUtils.isComposite(viewComponent);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.viewComponent.firstChange) {
      this.getType();
    }
  }

}
