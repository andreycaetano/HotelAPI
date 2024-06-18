-- CreateTable
CREATE TABLE "Sports" (
    "id" TEXT NOT NULL,
    "sport" VARCHAR(255) NOT NULL,

    CONSTRAINT "Sports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sports_sport_key" ON "Sports"("sport");
