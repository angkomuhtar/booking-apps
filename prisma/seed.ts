import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const superAdminRole = await prisma.role.findUnique({
    where: { name: "Super Admin" },
  });
  const venueAdminRole = await prisma.role.findUnique({
    where: { name: "Venue Admin" },
  });
  const userRole = await prisma.role.findUnique({
    where: { name: "User" },
  });

  if (!superAdminRole || !venueAdminRole || !userRole) {
    console.log("❌ Please run role_permission_seed.ts first!");
    console.log("   npx ts-node prisma/role_permission_seed.ts");
    process.exit(1);
  }

  const adminPassword = await bcrypt.hash("admin123", 10);
  const venueAdminPassword = await bcrypt.hash("venueadmin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  await prisma.user.upsert({
    where: { email: "admin@email.com" },
    update: {},
    create: {
      email: "admin@email.com",
      name: "Super Admin",
      password: adminPassword,
      roleId: superAdminRole.id,
      accessAllVenues: true,
      phone: "081234567890",
    },
  });

  await prisma.user.upsert({
    where: { email: "venueadmin@email.com" },
    update: {},
    create: {
      email: "venueadmin@email.com",
      name: "Venue Admin",
      password: venueAdminPassword,
      roleId: venueAdminRole.id,
      accessAllVenues: false,
      phone: "081234567899",
    },
  });

  await prisma.user.upsert({
    where: { email: "user@email.com" },
    update: {},
    create: {
      email: "user@email.com",
      name: "John Doe",
      password: userPassword,
      roleId: userRole.id,
      phone: "081234567891",
    },
  });

  //   console.log("✅ Created users:", {
  //     admin: admin.email,
  //     venueAdmin: venueAdmin.email,
  //     user: user.email,
  //   });

  //   const venue1 = await prisma.venue.create({
  //     data: {
  //       name: "Sport Center Jakarta",
  //       description: "Premium sports venue in the heart of Jakarta",
  //       address: "Jl. Sudirman No. 123",
  //       cityId: "3171",
  //       provinceId: "31",
  //     },
  //   });

  //   const venue2 = await prisma.venue.create({
  //     data: {
  //       name: "Bandung Sports Hall",
  //       description: "Modern sports facility with top-notch equipment",
  //       address: "Jl. Dago No. 456",
  //       cityId: "3273",
  //       provinceId: "32",
  //     },
  //   });

  //   console.log("✅ Created venues:", venue1.name, venue2.name);

  //   await prisma.venueAccess.create({
  //     data: {
  //       userId: venueAdmin.id,
  //       venueId: venue1.id,
  //     },
  //   });

  //   console.log("✅ Assigned venue admin to venue1");
  //   const floorTypes = await prisma.floorType.findMany();
  //   const courtTypes = await prisma.courtType.findMany();

  //   console.log("✅ Created court types");

  //   await prisma.court.createMany({
  //     data: [
  //       {
  //         name: "Court 1 - Badminton",
  //         type: courtTypes[1].id,
  //         floor: floorTypes[1].id,
  //         pricePerHour: 100000,
  //         venueId: venue1.id,
  //         isActive: true,
  //       },
  //       {
  //         name: "Court 2 - Badminton",
  //         type: courtTypes[1].id,
  //         floor: floorTypes[0].id,
  //         pricePerHour: 100000,
  //         venueId: venue1.id,
  //         isActive: true,
  //       },
  //       {
  //         name: "Court 3 - Padel",
  //         type: courtTypes[0].id,
  //         floor: floorTypes[0].id,
  //         pricePerHour: 150000,
  //         venueId: venue1.id,
  //         isActive: true,
  //       },
  //       {
  //         name: "Court A - Badminton",
  //         type: courtTypes[1].id,
  //         floor: floorTypes[1].id,
  //         pricePerHour: 90000,
  //         venueId: venue2.id,
  //         isActive: true,
  //       },
  //       {
  //         name: "Court B - Badminton",
  //         type: courtTypes[1].id,
  //         floor: floorTypes[1].id,
  //         pricePerHour: 90000,
  //         venueId: venue2.id,
  //         isActive: true,
  //       },
  //       {
  //         name: "Court C - Padel",
  //         type: courtTypes[0].id,
  //         floor: floorTypes[0].id,
  //         pricePerHour: 140000,
  //         venueId: venue2.id,
  //         isActive: true,
  //       },
  //     ],
  //   });

  //   console.log("✅ Created courts");

  //   const courts = await prisma.court.findMany();

  //   const order = await prisma.order.create({
  //     data: {
  //       userId: user.id,
  //       venueId: venue1.id,
  //       orderNumber: `ORD-${Date.now()}`,
  //       subtotal: 200000,
  //       discount: 0,
  //       totalPrice: 200000,
  //       status: "COMPLETED",
  //       notes: "Please prepare the court before arrival",
  //       items: {
  //         create: {
  //           itemType: "COURT_BOOKING",
  //           itemId: courts[0].id,
  //           name: courts[0].name,
  //           price: 100000,
  //           quantity: 1,
  //           date: new Date("2025-10-25"),
  //           startTime: "10:00",
  //           endTime: "12:00",
  //           duration: 120,
  //         },
  //       },
  //     },
  //   });

  // console.log("✅ Created sample order:", order.orderNumber);
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
