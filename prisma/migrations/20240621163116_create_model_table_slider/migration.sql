-- CreateTable
CREATE TABLE "Slider" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "information" VARCHAR(255) NOT NULL,
    "comment" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "image" VARCHAR NOT NULL,

    CONSTRAINT "Slider_pkey" PRIMARY KEY ("id")
);
