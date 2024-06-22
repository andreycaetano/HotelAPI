-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "photo" VARCHAR NOT NULL,
    "role" VARCHAR NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);
