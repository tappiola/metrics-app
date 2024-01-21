import React, { useEffect } from "react";
import "./Reports.css";
import { useQuery } from "@tanstack/react-query";
import { fetchReports } from "../../api/actions";
import { useNavigate } from "react-router";
import Loader from "../../components/Loader";
import { Report } from "./Reports.types";
import CreateReport from "../../components/CreateReport";
import { Uri } from "../../constants";
import ReportCard from "../../components/ReportCard";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Reports = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["listReports"],
    queryFn: fetchReports,
  });

  useEffect(() => {
    // @ts-ignore
    if (error?.response?.status === 401) {
      navigate(Uri.Login);
    }
  }, [error, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage text={error.message} />;
  }

  return (
    <div className="reports">
      <h1>Reports</h1>
      <CreateReport />
      {data.map((report: Report) => (
        <ReportCard key={report.uuid} data={report} />
      ))}
    </div>
  );
};

export default Reports;
