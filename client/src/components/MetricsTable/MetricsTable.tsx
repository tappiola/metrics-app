import "./MetricTable.css";
import { MetricData } from "../../pages/Reports/Reports.types";

const MetricsTable = ({ data }: { data: MetricData[] }) => {
  const normalizeValue = (value: string) => {
    switch (value) {
      case "true": {
        return "Yes";
      }

      case "false": {
        return "No";
      }

      default:
        return value;
    }
  };

  return (
    <div className="metrics-table">
      <table>
        <thead>
          <tr>
            {data.map(({ metricId }) => (
              <th key={metricId}>{metricId}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.map(({ value }, i) => (
              <td key={i}>{normalizeValue(value)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MetricsTable;
