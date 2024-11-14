-- CreateTable
CREATE TABLE "Aritcle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "body" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aritcle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Aritcle" ADD CONSTRAINT "Aritcle_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
