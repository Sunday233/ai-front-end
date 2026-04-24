import type {ObjectTypeItem} from './model';

export interface GetObjectTypeListParams {
  keyword?: string;
  page: number;
  pageSize: number;
}

export interface GetObjectTypeListResponse {
  list: ObjectTypeItem[];
  total: number;
}

export type DataSourceMode = 'new-schema' | 'new-table';

export type AttributeType = 'string' | 'date' | 'boolean' | 'number';

export interface SourceConfig {
  mode: DataSourceMode;
  dataSourceName: string;
  savePath: string;
}

export interface MetadataConfig {
  objectTypeName: string;
  alias: string;
  description: string;
  groups: string[];
}

export interface AttributeConfigItem {
  id: string;
  type: AttributeType;
  name: string;
  role?: 'primary' | 'label';
}

export interface AttributeConfig {
  primaryKey: string;
  labelKey: string;
  attributes: AttributeConfigItem[];
}

export interface ActionConfig {
  actions: string[];
  actorGroup: string;
}

export interface CreateObjectTypePayload {
  source: SourceConfig;
  metadata: MetadataConfig;
  attributes: AttributeConfig;
  actions: ActionConfig;
}

export interface CreateObjectTypeResponse {
  id: string;
}
