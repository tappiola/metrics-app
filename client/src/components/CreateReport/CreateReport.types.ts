import { MetricType } from "../../pages/Reports/Reports.types";

export interface Metric {
  id: string;
  description: string;
  type: MetricType;
}

export interface MetricOption {
  label: string;
  value: string;
  type: MetricType;
}
