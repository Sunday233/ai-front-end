export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "待后端确认";

export interface ApiDocEntry {
  module: string;
  page: string;
  service: string;
  name: string;
  method: ApiMethod;
  path: string;
  paramsType: string;
  bodyType: string;
  responseType: string;
  params: string[];
  mock: string;
  mockFile: string;
  replacement: string;
  source: string;
}
