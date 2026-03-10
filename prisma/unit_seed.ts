import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding units...");

  const units = await prisma.unit.createMany({
    data: [
      { name: "Gram", symbol: "g" },
      { name: "Kilogram", symbol: "kg" },
      { name: "Mililiter", symbol: "ml" },
      { name: "Liter", symbol: "L" },
      { name: "Pieces", symbol: "pcs" },
      { name: "Botol", symbol: "btl" },
      { name: "Box", symbol: "box" },
      { name: "Dus", symbol: "dus" },
      { name: "Pack", symbol: "pack" },
      { name: "Karton", symbol: "krt" },
      { name: "Sak", symbol: "sak" },
      { name: "Kaleng", symbol: "klg" },
      { name: "Sachet", symbol: "sct" },
      { name: "Porsi", symbol: "porsi" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seeded units:", units.count);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding units:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
