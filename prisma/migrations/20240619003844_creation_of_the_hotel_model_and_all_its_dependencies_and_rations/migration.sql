-- CreateTable
CREATE TABLE "Descriptions" (
    "id" TEXT NOT NULL,
    "destination" VARCHAR(255) NOT NULL,
    "accommodation" VARCHAR(255) NOT NULL,
    "activities" VARCHAR(255) NOT NULL,
    "commentId" VARCHAR(255) NOT NULL,

    CONSTRAINT "Descriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "photo" VARCHAR(255) NOT NULL,
    "comment" VARCHAR(255) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description_big" VARCHAR(255) NOT NULL,
    "description1" VARCHAR(255) NOT NULL,
    "description2" VARCHAR(255) NOT NULL,
    "description3" VARCHAR(255) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotelImages" (
    "id" TEXT NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "hotelId" TEXT NOT NULL,

    CONSTRAINT "HotelImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "movie" VARCHAR(255) NOT NULL,
    "promotion" BOOLEAN NOT NULL DEFAULT false,
    "cardId" TEXT NOT NULL,
    "descriptionId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "ratingid" TEXT NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ConditionsToHotel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FacilitiesToHotel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_HotelToSports" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConditionsToHotel_AB_unique" ON "_ConditionsToHotel"("A", "B");

-- CreateIndex
CREATE INDEX "_ConditionsToHotel_B_index" ON "_ConditionsToHotel"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FacilitiesToHotel_AB_unique" ON "_FacilitiesToHotel"("A", "B");

-- CreateIndex
CREATE INDEX "_FacilitiesToHotel_B_index" ON "_FacilitiesToHotel"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HotelToSports_AB_unique" ON "_HotelToSports"("A", "B");

-- CreateIndex
CREATE INDEX "_HotelToSports_B_index" ON "_HotelToSports"("B");

-- AddForeignKey
ALTER TABLE "Descriptions" ADD CONSTRAINT "Descriptions_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelImages" ADD CONSTRAINT "HotelImages_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_ratingid_fkey" FOREIGN KEY ("ratingid") REFERENCES "Ratings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "Descriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConditionsToHotel" ADD CONSTRAINT "_ConditionsToHotel_A_fkey" FOREIGN KEY ("A") REFERENCES "Conditions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConditionsToHotel" ADD CONSTRAINT "_ConditionsToHotel_B_fkey" FOREIGN KEY ("B") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilitiesToHotel" ADD CONSTRAINT "_FacilitiesToHotel_A_fkey" FOREIGN KEY ("A") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilitiesToHotel" ADD CONSTRAINT "_FacilitiesToHotel_B_fkey" FOREIGN KEY ("B") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HotelToSports" ADD CONSTRAINT "_HotelToSports_A_fkey" FOREIGN KEY ("A") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HotelToSports" ADD CONSTRAINT "_HotelToSports_B_fkey" FOREIGN KEY ("B") REFERENCES "Sports"("id") ON DELETE CASCADE ON UPDATE CASCADE;
