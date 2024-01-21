import { MetricType } from "../pages/Reports/Reports.types";

export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
}

export interface NewReportData {
  [key: string]: MetricType | string;
}
