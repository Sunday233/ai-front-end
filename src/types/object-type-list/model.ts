export type ObjectTypeStatus = "正常" | "草稿";
export type ObjectTypeVisibility = "可见";

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

export interface ObjectTypeListPermissions {
  canCreate: boolean;
  canViewDetail: boolean;
}
