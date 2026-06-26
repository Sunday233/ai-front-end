export type WorkbenchResourceType =
  | "workbench"
  | "object-type"
  | "link-type"
  | "action-type"
  | "object-type-group"
  | "agent-management"
  | "data-cleaning"
  | "knowledge-base";

export interface WorkbenchResourceMenu {
  key: WorkbenchResourceType;
  name: string;
  count?: number;
  routePath: string;
  permissionCode?: string;
}

export interface ObjectTypeCardTag {
  id: string;
  label: string;
  count: number;
}

export interface WorkbenchObjectTypeCard {
  id: string;
  name: string;
  description?: string;
  instanceCount: number;
  appText: string;
  favorite: boolean;
  tags: ObjectTypeCardTag[];
}

export interface WorkbenchCreatePermissions {
  canCreateObjectType: boolean;
  canCreateLink: boolean;
  canCreateAction: boolean;
  canCreateObjectGroup: boolean;
  canManageAgent: boolean;
}

export interface WorkbenchCreateOption {
  key: "object-type" | "link-type" | "action-type" | "object-type-group";
  title: string;
  description: string;
  routePath: string;
  permissionKey: keyof WorkbenchCreatePermissions;
}

export interface WorkbenchSummary {
  workspaceId: string;
  workspaceName: string;
  agentId: string;
  agentName: string;
  menus: WorkbenchResourceMenu[];
  recentObjectTypes: WorkbenchObjectTypeCard[];
  favoriteObjectTypes: WorkbenchObjectTypeCard[];
  createOptions: WorkbenchCreateOption[];
  permissions: WorkbenchCreatePermissions;
}
