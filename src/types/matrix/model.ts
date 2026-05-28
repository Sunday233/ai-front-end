export type ResourceType =
  | "workbench"
  | "objectType"
  | "linkType"
  | "actionType"
  | "objectTypeGroup"
  | "agentManage"
  | "dataClean"
  | "knowledge";

export interface NavigationItem {
  key: ResourceType;
  label: string;
  count?: number;
  route?: string;
}

export interface ObjectTypeCard {
  id: string;
  name: string;
  instanceCount: number;
  usageLabel: string;
  description?: string;
  tags: Array<{
    label: string;
    count?: number;
  }>;
  favorite?: boolean;
}

export type ObjectTypeStatus = "normal" | "draft";

export interface ObjectTypeRow {
  id: string;
  rid: string;
  name: string;
  status: ObjectTypeStatus;
  visibility: "visible" | "hidden";
  updatedAt: string;
  operatorPermissions: string[];
}

export interface DatasetSummary {
  id: string;
  name: string;
  path: string;
  mode: "manual" | "access";
  type: "table";
  version: string;
  updatedAt: string;
  fields: DatasetField[];
}

export interface DatasetField {
  name: string;
  type: "Int" | "Float" | "Date" | "String" | "Boolean";
  isPrimary?: boolean;
}

export interface AttributeConfig {
  id: string;
  type: DatasetField["type"];
  fieldName: string;
  attributeName: string;
  isPrimary?: boolean;
}

export interface ActionConfig {
  id: string;
  title: string;
  description: string;
  selected: boolean;
}

export interface CreateObjectTypePayload {
  datasetId: string;
  objectTypeName: string;
  objectTypeId: string;
  description?: string;
  attributes: AttributeConfig[];
  actions: string[];
}
