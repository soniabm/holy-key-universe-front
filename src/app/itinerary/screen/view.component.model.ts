export enum ViewComponentType {
  COLUMN = 'column',
  ROW = 'row',
  TEXT = 'text',
  IMAGE = 'image'
}

export interface ViewComponent {
  row?: ViewComponent[];
  column?: ViewComponent[];
  text?: string;
  image?: string;
  diagram?: string;
}
