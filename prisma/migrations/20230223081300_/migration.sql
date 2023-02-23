-- CreateTable
CREATE TABLE "Items" (
    "user_id" INTEGER NOT NULL DEFAULT 1,
    "name" VARCHAR NOT NULL,
    "imagePath" VARCHAR NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("user_id")
);
