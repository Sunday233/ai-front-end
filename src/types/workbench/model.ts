export type WorkbenchCardColor = 'blue' | 'green';

export interface WorkbenchCard {
  id: string;
  name: string;
  relationCaseCount: number;
  appCount: number;
  description: string;
  tags: string[];
  color: WorkbenchCardColor;
}
