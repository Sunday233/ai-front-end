export type ObjectTypeStatus = 'normal' | 'draft';

export type ObjectTypeVisibility = 'visible';

export interface ObjectTypeListItem {
  id: string;
  rid: string;
  icon: string;
  name: string;
  status: ObjectTypeStatus;
  visibility: ObjectTypeVisibility;
  updatedAt: string;
  operatorPermissions: string[];
}
