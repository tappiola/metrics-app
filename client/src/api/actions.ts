import axios from "axios";
import { ReportData, SignInData } from "./actions.types";
import { getAuthToken } from "../utils/localStorage";
import { API_URL } from "../constants";

const getAuthHeader = () => ({
  Authorization: `Bearer ${getAuthToken()}`,
});

export const login = async (data: SignInData) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);

  return res.data;
};

export const fetchReports = async () => {
  const response = await axios.get(`${API_URL}/reports`, {
    headers: getAuthHeader(),
  });

  return response.data;
};

export const fetchMetrics = async () => {
  const response = await axios.get(`${API_URL}/metrics`, {
    headers: getAuthHeader(),
  });

  return response.data;
};

export const createReport = async (reportData: ReportData) => {
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

  const response = await axios.post(`${API_URL}/reports`, body, {
    headers: getAuthHeader(),
  });

  return response.data;
};
