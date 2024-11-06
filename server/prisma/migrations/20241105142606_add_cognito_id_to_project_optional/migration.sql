-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "cognitoId" TEXT;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_cognitoId_fkey" FOREIGN KEY ("cognitoId") REFERENCES "User"("cognitoId") ON DELETE SET NULL ON UPDATE CASCADE;
