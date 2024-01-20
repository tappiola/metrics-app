import React, { useEffect } from "react";
import "./Reports.css";
import { useQuery } from "@tanstack/react-query";
import { fetchReports } from "../../api/actions";
import { useNavigate } from "react-router";
import Loader from "../../components/Loader/Loader";
import Card from "../../components/Card";
import { Report } from "./Reports.types";
import CreateReport from "../../components/CreateReport/CreateReport";

const Reports = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["listReports"],
    queryFn: fetchReports,
  });

  useEffect(() => {
    // @ts-ignore
    if (error?.response?.status === 401) {
      navigate("/login");
    }
  }, [error, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="reports">
      <CreateReport />
      <h1>Reports</h1>
      <Card>
        {data.map(({ uuid, report }: Report) => (
          <div key={uuid}>
            <h2>{report.title}</h2>
            <h3>{report.description}</h3>
            <dl className="report-metrics">
              {report.data.map(({ metricId, value }) => (
                // TODO: Make better markup
                <div key={metricId}>
                  <dt key={metricId}>{metricId}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default Reports;
