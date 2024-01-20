-- CreateEnum
CREATE TYPE "MetricType" AS ENUM ('STRING', 'NUMBER', 'BOOLEAN');

-- CreateTable
CREATE TABLE "Metric" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "MetricType" NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportMetric" (
    "uuid" TEXT NOT NULL,
    "metricId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ReportMetric_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Report" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "ReportMetric" ADD CONSTRAINT "ReportMetric_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportMetric" ADD CONSTRAINT "ReportMetric_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
