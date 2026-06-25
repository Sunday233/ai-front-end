export interface WorkbenchResourceMenu {
  resourceType:
    | 'object-type'
    | 'link-type'
    | 'action-type'
    | 'object-type-group';
  resourceName: string;
  resourceCount: number;
  menuKey: string;
  routePath: string;
  permissionCode?: string;
}

export interface WorkbenchObjectTypeCard {
  id: string;
  name: string;
  description: string;
  instanceCount: number;
  appCount: number;
  favorite: boolean;
  tags: Array<{
    label: string;
    count: number;
  }>;
}

export interface WorkbenchCreatePermissions {
  canCreateObjectType: boolean;
  canCreateLink: boolean;
  canCreateAction: boolean;
  canCreateObjectGroup: boolean;
  canManageAgent: boolean;
}
