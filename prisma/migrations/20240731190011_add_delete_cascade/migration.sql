/*
  Warnings:

  - You are about to drop the column `createdAt` on the `NotToDo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "NotToDo" DROP CONSTRAINT "NotToDo_todoId_fkey";

-- DropForeignKey
ALTER TABLE "ToDo" DROP CONSTRAINT "ToDo_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserData" DROP CONSTRAINT "UserData_userId_fkey";

-- AlterTable
ALTER TABLE "NotToDo" DROP COLUMN "createdAt";

-- AddForeignKey
ALTER TABLE "UserData" ADD CONSTRAINT "UserData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToDo" ADD CONSTRAINT "ToDo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotToDo" ADD CONSTRAINT "NotToDo_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "ToDo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
