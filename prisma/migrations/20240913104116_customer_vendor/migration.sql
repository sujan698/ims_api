-- CreateTable
CREATE TABLE "customer_vendors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "email" TEXT,
    "phone" VARCHAR(15),
    "street" TEXT,
    "city" TEXT,
    "district" TEXT,
    "province" TEXT,
    "isVendor" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_vendors_pkey" PRIMARY KEY ("id")
);
