import axios from "axios";
import { ReportData, SignInData } from "./actions.types";
import { getAuthToken } from "../utils/localStorage";

const getAuthHeader = () => ({
  Authorization: `Bearer ${getAuthToken()}`,
});

export const login = async (data: SignInData) => {
  const res = await axios.post("http://localhost:3001/auth/login", data);
  return res.data;
};

export const fetchReports = async () => {
  const response = await axios.get("http://localhost:3001/reports", {
    headers: {
      ...getAuthHeader(),
    },
  });
  return response.data;
};

export const fetchMetrics = async () => {
  const response = await axios.get("http://localhost:3001/metrics", {
    headers: {
      ...getAuthHeader(),
    },
  });
  return response.data;
};

export const createReport = async (reportData: ReportData) => {
  const { formStatus, title, description, ...metrics } = reportData;

  const body = {
    title,
    description,
    data: Object.entries(metrics).map(([metricId, value]) => ({
      metricId,
      value: value.toString(),
    })),
  };

  const response = await axios.post("http://localhost:3001/reports", body, {
    headers: {
      ...getAuthHeader(),
    },
  });
  return response.data;
};
