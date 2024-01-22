import "./ReportCard.css";
import Card from "../Card";
import React from "react";
import { Report } from "../../pages/Reports/Reports.types";
import MetricsTable from "../MetricsTable";
const ReportCard = ({
  data: {
    uuid,
    report: { title, description, data },
  },
}: {
  data: Report;
}) => {
  return (
    <Card key={uuid}>
      <h2>{title}</h2>
      <p>{description}</p>
      <dl className="report-metrics">
        <MetricsTable data={data} />
      </dl>
    </Card>
  );
};

export default ReportCard;
