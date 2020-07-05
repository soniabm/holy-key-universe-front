import { ViewComponentType, ViewComponent } from './view.component.model';

export class ViewComponentUtils {
  static isComposite(viewComponent: ViewComponent) {
    const key = Object.keys(viewComponent);
    return key[0] === ViewComponentType.COLUMN || key[0] === ViewComponentType.ROW;
  }

  static getType(viewComponent: ViewComponent): string {
    const key = Object.keys(viewComponent);
    return key[0];
  }
}
