import axios from "axios";
import { NewReportData, SignInData, SignInResponse } from "./actions.types";
import { getAuthToken } from "../utils/localStorage";
import { API_URL } from "../constants";
import { Metric, Report } from "../pages/Reports/Reports.types";

const getAuthHeader = () => ({
  Authorization: `Bearer ${getAuthToken()}`,
});

export const login = async (data: SignInData) => {
  const res = await axios.post<SignInResponse>(`${API_URL}/auth/login`, data);

  return res.data;
};

export const fetchReports = async () => {
  const response = await axios.get<Report[]>(`${API_URL}/reports`, {
    headers: getAuthHeader(),
  });

  return response.data;
};

export const fetchMetrics = async () => {
  const response = await axios.get<Metric[]>(`${API_URL}/metrics`, {
    headers: getAuthHeader(),
  });

  return response.data;
};

export const createReport = async (reportData: NewReportData) => {
  const { formStatus, title, description, ...metrics } = reportData;

  const body = {
    title,
    description,
    data: Object.entries(metrics).map(([metricId, value]) => {
      return {
        metricId: metricId.replaceAll("_", "."),
        value: value.toString(),
      };
    }),
  };

  const response = await axios.post<Report>(`${API_URL}/reports`, body, {
    headers: getAuthHeader(),
  });

  return response.data;
};
