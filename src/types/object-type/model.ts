export type ObjectTypeStatus = 'active' | 'building';

export type ObjectTypeVisibility = 'public' | 'private';

export interface ObjectTypeItem {
  id: string;
  name: string;
  status: ObjectTypeStatus;
  visibility: ObjectTypeVisibility;
  date: string;
}
