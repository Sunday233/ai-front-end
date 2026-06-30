export type DatasourceMode = "existing" | "new";

export type AttributeType =
  | "int"
  | "float"
  | "string"
  | "boolean"
  | "datetime"
  | "date";

export interface DatasetOption {
  id: string;
  name: string;
  path: string;
  fields: DatasetField[];
}

export interface DatasetField {
  id: string;
  name: string;
  type: AttributeType;
  primary?: boolean;
}

export interface AttributeMappingRow {
  id: string;
  sourceField: DatasetField;
  attributeName: string;
  attributeType: AttributeType;
  titleKey: boolean;
  primaryKey: boolean;
  removable: boolean;
}

export interface ActionOption {
  id: string;
  actionType: "create" | "update" | "delete";
  name: string;
  description: string;
  executableUsers: string[];
  executableGroups: string[];
}

export interface ObjectTypeCreateDraft {
  datasourceMode: DatasourceMode;
  datasetName: string;
  datasetPath: string;
  existingDatasetId?: string;
  objectTypeIcon: string;
  objectTypeName: string;
  objectTypeEnglishName: string;
  description: string;
  objectGroupId?: string;
  objectTypeId: string;
  attributes: AttributeMappingRow[];
  actions: ActionOption[];
}
