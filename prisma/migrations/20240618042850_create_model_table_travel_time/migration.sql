-- CreateTable
CREATE TABLE "TravelTime" (
    "id" TEXT NOT NULL,
    "travel_time" VARCHAR(255) NOT NULL,

    CONSTRAINT "TravelTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TravelTime_travel_time_key" ON "TravelTime"("travel_time");
