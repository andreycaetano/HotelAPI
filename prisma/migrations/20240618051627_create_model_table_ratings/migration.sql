-- CreateTable
CREATE TABLE "Ratings" (
    "id" TEXT NOT NULL,
    "rating" VARCHAR(255) NOT NULL,

    CONSTRAINT "Ratings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ratings_rating_key" ON "Ratings"("rating");
