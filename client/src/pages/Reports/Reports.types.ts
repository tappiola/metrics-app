export interface Report {
  uuid: string;
  report: {
    title: string;
    description: string;
    created: string;
    updated: string;
    userId: string;
    data: MetricData[];
  };
}

export interface MetricData {
  metricId: string;
  value: string;
}

export enum MetricType {
  Boolean = "BOOLEAN",
  Number = "NUMBER",
  String = "STRING",
}
export interface Metric {
  id: string;
  description: string;
  type: MetricType;
}
