import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.floorType.createMany({
    data: [
      { name: "Wood" },
      { name: "Synthetic" },
      { name: "Concrete" },
      { name: "Grass" },
    ],
  });

  console.log("✅ Created floor types");

  await prisma.courtType.createMany({
    data: [
      { name: "PADEL" },
      { name: "BADMINTON" },
      { name: "TENNIS" },
      { name: "MINISOCCER" },
      { name: "FUTSAL" },
    ],
  });
  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
