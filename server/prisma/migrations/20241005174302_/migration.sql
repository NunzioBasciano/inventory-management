/*
  Warnings:

  - You are about to drop the column `chengePercentage` on the `SalesSummary` table. All the data in the column will be lost.
  - You are about to drop the `PurchasesSummary` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "SalesSummary" DROP COLUMN "chengePercentage",
ADD COLUMN     "changePercentage" DOUBLE PRECISION;

-- DropTable
DROP TABLE "PurchasesSummary";

-- CreateTable
CREATE TABLE "PurchaseSummary" (
    "purchaseSummaryId" TEXT NOT NULL,
    "totalPurchased" DOUBLE PRECISION NOT NULL,
    "changePercentage" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseSummary_pkey" PRIMARY KEY ("purchaseSummaryId")
);
