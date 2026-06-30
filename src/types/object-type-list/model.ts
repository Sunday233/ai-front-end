export type ObjectTypeStatus = "normal" | "draft" | "deprecated";

export type ObjectTypeVisibility = "visible" | "hidden";

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

export interface ObjectTypeListPermission {
  canCreate: boolean;
  canViewDetail: boolean;
}
