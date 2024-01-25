-- DropForeignKey
ALTER TABLE "ReportMetric" DROP CONSTRAINT "ReportMetric_reportId_fkey";

-- AddForeignKey
ALTER TABLE "ReportMetric" ADD CONSTRAINT "ReportMetric_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
