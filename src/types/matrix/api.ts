import type {
  DatasetSummary,
  NavigationItem,
  ObjectTypeCard,
  ObjectTypeRow,
} from "./model";

export interface WorkbenchSummaryResponse {
  agentName: string;
  recentCards: ObjectTypeCard[];
  favoriteCards: ObjectTypeCard[];
  menus: NavigationItem[];
  canCreateObjectType: boolean;
  canCreateLink: boolean;
  canCreateAction: boolean;
}

export interface ObjectTypeListParams {
  keyword?: string;
  pageNo: number;
  pageSize: number;
}

export interface ObjectTypeListResponse {
  rows: ObjectTypeRow[];
  total: number;
}

export interface ObjectTypeListPermissionsResponse {
  canCreate: boolean;
  canViewDetail: boolean;
}

export interface DatasetListResponse {
  rows: DatasetSummary[];
  total: number;
}

export interface CreateObjectTypeResponse {
  id: string;
}
