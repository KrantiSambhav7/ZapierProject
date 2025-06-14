/*
  Warnings:

  - You are about to drop the column `triggerId` on the `Trigger` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[availableTriggerId]` on the table `Trigger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `availableTriggerId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_triggerId_fkey";

-- DropIndex
DROP INDEX "Trigger_triggerId_key";

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "triggerId",
ADD COLUMN     "availableTriggerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_availableTriggerId_key" ON "Trigger"("availableTriggerId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_availableTriggerId_fkey" FOREIGN KEY ("availableTriggerId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
