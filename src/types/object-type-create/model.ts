export type DatasetFieldType =
  | 'int'
  | 'float'
  | 'date'
  | 'string'
  | 'boolean'
  | 'datetime';

export interface DatasetColumn {
  fieldName: string;
  displayName: string;
  fieldType: DatasetFieldType;
  primary?: boolean;
}

export interface DatasetPreviewRow {
  emp_no: string;
  birth_date: string;
  first_name: string;
  last_name?: string;
  gender?: string;
  hight?: string;
}

export interface DatasetListItem {
  datasetId: string;
  name: string;
  path: string;
  sourceType: 'manual' | 'integration';
  tableType: 'table';
  columns: DatasetColumn[];
  previewRows: DatasetPreviewRow[];
}

export interface AttributeMappingRow {
  id: string;
  sourceField: {
    name: string;
    type: DatasetFieldType;
    primary: boolean;
  };
  targetAttribute: {
    name: string;
    type: DatasetFieldType;
    readonly: boolean;
  };
  removable: boolean;
}

export interface ActionPermissionRow {
  actionType: 'create' | 'update' | 'delete';
  title: string;
  description: string;
  selected: boolean;
  executableUsers: string[];
  executableGroups: string[];
}

export interface ObjectTypeCreateDraft {
  datasourceMode: 'existing' | 'new';
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
  actions: ActionPermissionRow[];
}
