export interface Metric {
  metricId: string;
  value: string | number | boolean;
}
export interface Report {
  id?: string;
  title?: string;
  description?: string;
  data: Metric[];
}
