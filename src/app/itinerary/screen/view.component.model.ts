export enum ViewComponentType {
  COLUMN = 'column',
  ROW = 'row',
  TEXT = 'text',
  IMAGE = 'image',
  DIAGRAM = 'diagram'
}

export interface ViewComponent {
  row?: ViewComponent[];
  column?: ViewComponent[];
  text?: string;
  image?: string;
  diagram?: string;
}
