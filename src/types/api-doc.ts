export interface ApiDocEntry {
  module: string;
  page: string;
  service: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
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
