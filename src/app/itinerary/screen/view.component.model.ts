import {Exercise} from './view-component/simple/exercise/exercise.model';

export enum ViewComponentType {
  COLUMN = 'column',
  ROW = 'row',
  TEXT = 'text',
  IMAGE = 'image',
  DIAGRAM = 'diagram',
  EXERCISE = 'exercise',
}

export interface ViewComponent {
  row?: ViewComponent[];
  column?: ViewComponent[];
  text?: string;
  image?: string;
  diagram?: string;
  exercise?: Exercise;
}
