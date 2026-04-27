import type {WorkbenchCard} from './model';

export interface GetWorkbenchListParams {
  keyword?: string;
  branch?: string;
}

export interface GetWorkbenchListResponse {
  recent: WorkbenchCard[];
  favorites: WorkbenchCard[];
  recentTotal: number;
  favoriteTotal: number;
}
