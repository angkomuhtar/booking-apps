-- CreateTable
CREATE TABLE "facilitieys" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT DEFAULT 'material-symbols:add-row-above-rounded',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "facilitieys_pkey" PRIMARY KEY ("id")
);
