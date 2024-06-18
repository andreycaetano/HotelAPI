-- CreateTable
CREATE TABLE "Conditions" (
    "id" TEXT NOT NULL,
    "condition" VARCHAR(255) NOT NULL,

    CONSTRAINT "Conditions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Conditions_condition_key" ON "Conditions"("condition");
