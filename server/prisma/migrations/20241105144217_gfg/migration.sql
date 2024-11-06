/*
  Warnings:

  - Made the column `cognitoId` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_cognitoId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "cognitoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_cognitoId_fkey" FOREIGN KEY ("cognitoId") REFERENCES "User"("cognitoId") ON DELETE RESTRICT ON UPDATE CASCADE;
