/*
  Warnings:

  - You are about to drop the column `authorId` on the `Aritcle` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `Aritcle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Aritcle" DROP CONSTRAINT "Aritcle_authorId_fkey";

-- AlterTable
ALTER TABLE "Aritcle" DROP COLUMN "authorId",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Aritcle" ADD CONSTRAINT "Aritcle_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
