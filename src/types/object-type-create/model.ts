export type DatasetSourceType = "手工" | "接入";
export type DatasetTableType = "表格";
export type FieldType = "Int" | "Float" | "Date" | "String";
export type DatasourceMode = "existing" | "new";
export type ActionType = "create" | "update" | "delete";

export interface DatasetRow {
  datasetId: string;
  name: string;
  path: string;
  sourceType: DatasetSourceType;
  tableType: DatasetTableType;
  selected?: boolean;
}

export interface DatasetColumn {
  fieldName: string;
  fieldType: FieldType;
  displayName: string;
}

export interface DatasetPreviewRow {
  empNo: string;
  birthDate: string;
  firstName: string;
  lastName: string;
  gender: string;
  hight: string;
}

export interface DatasetDetail {
  dataset: DatasetRow;
  version: string;
  updateTime: string;
  columns: DatasetColumn[];
  previewRows: DatasetPreviewRow[];
}

export interface ObjectGroupOption {
  id: string;
  name: string;
  count: number;
}

export interface MappingSourceField {
  name: string;
  type: FieldType;
  isPrimary?: boolean;
}

export interface MappingTargetAttribute {
  name: string;
  type: FieldType;
  countText: string;
  readonly: boolean;
  isPrimary?: boolean;
}

export interface AttributeMappingRow {
  id: string;
  sourceField: MappingSourceField;
  targetAttribute: MappingTargetAttribute;
  removable: boolean;
}

export interface ActionConfigRow {
  id: ActionType;
  title: string;
  description: string;
  selected: boolean;
}

export interface ExecutorOption {
  id: string;
  name: string;
}

export interface ObjectTypeCreateDraft {
  datasourceMode: DatasourceMode;
  selectedDataset: DatasetRow | null;
  datasets: DatasetRow[];
  datasetDetail: DatasetDetail;
  objectGroups: ObjectGroupOption[];
  mappingRows: AttributeMappingRow[];
  actionRows: ActionConfigRow[];
  executorType: "用户" | "用户组";
  executorOptions: ExecutorOption[];
  selectedExecutors: ExecutorOption[];
}
