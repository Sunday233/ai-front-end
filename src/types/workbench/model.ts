export type WorkbenchCardColor = 'blue' | 'green';

export interface WorkbenchTag {
  name: string;
  count: number;
}

export interface WorkbenchCard {
  id: string;
  name: string;
  relationCaseCount: number;
  appCount: number;
  description: string;
  tags: WorkbenchTag[];
  color: WorkbenchCardColor;
}
