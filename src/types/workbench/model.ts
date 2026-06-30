export interface WorkbenchMenuItem {
  key: string;
  name: string;
  count?: number;
  routePath: string;
  permissionCode?: string;
  iconType:
    | "workbench"
    | "object"
    | "link"
    | "action"
    | "group"
    | "manage"
    | "clean"
    | "knowledge";
}

export interface WorkbenchObjectGroup {
  id: string;
  name: string;
  count: number;
}

export interface WorkbenchObjectTypeCard {
  id: string;
  rid: string;
  name: string;
  instanceCount: number;
  appName: string;
  description: string;
  groups: WorkbenchObjectGroup[];
  favorite: boolean;
}

export interface WorkbenchCreatePermission {
  canCreateObjectType: boolean;
  canCreateLink: boolean;
  canCreateAction: boolean;
  canCreateObjectGroup: boolean;
  canManageAgent: boolean;
}

export interface WorkbenchSummary {
  workspaceId: string;
  workspaceName: string;
  agentId: string;
  agentName: string;
  recentObjectTypes: WorkbenchObjectTypeCard[];
  favoriteObjectTypes: WorkbenchObjectTypeCard[];
  resourceCounts: Record<string, number>;
  permissions: WorkbenchCreatePermission;
}
