export interface Exercise {
  statement: string;
  mode: ModesType;
  exerciseCard: ExerciseCard;
  additionalInfo?: {
    text: string;
    keys: string[]
  };
}

export enum ModesType {
  FILL = 'fill',
  OPENANSWER = 'openanswer',
}

interface ExerciseCard {
  card: string;
  unit: string;
  index?: number;
}
