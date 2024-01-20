import { MetricType } from "../pages/Reports/Reports.types";

export interface SignInData {
  email: string;
  password: string;
}

export interface ReportData {
  [key: string]: MetricType | string;
}
