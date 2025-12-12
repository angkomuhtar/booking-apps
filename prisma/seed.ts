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

  const admin = await prisma.user.upsert({
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

  const venueAdmin = await prisma.user.upsert({
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

  const user = await prisma.user.upsert({
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

  console.log("✅ Created users:", {
    admin: admin.email,
    venueAdmin: venueAdmin.email,
    user: user.email,
  });

  const venue1 = await prisma.venue.create({
    data: {
      name: "Sport Center Jakarta",
      description: "Premium sports venue in the heart of Jakarta",
      address: "Jl. Sudirman No. 123",
      cityId: "3171",
      provinceId: "31",
    },
  });

  const venue2 = await prisma.venue.create({
    data: {
      name: "Bandung Sports Hall",
      description: "Modern sports facility with top-notch equipment",
      address: "Jl. Dago No. 456",
      cityId: "3273",
      provinceId: "32",
    },
  });

  console.log("✅ Created venues:", venue1.name, venue2.name);

  await prisma.venueAccess.create({
    data: {
      userId: venueAdmin.id,
      venueId: venue1.id,
    },
  });

  console.log("✅ Assigned venue admin to venue1");

  await prisma.court.createMany({
    data: [
      {
        name: "Court 1 - Badminton",
        type: "BADMINTON",
        pricePerHour: 100000,
        venueId: venue1.id,
        isActive: true,
      },
      {
        name: "Court 2 - Badminton",
        type: "BADMINTON",
        pricePerHour: 100000,
        venueId: venue1.id,
        isActive: true,
      },
      {
        name: "Court 3 - Padel",
        type: "PADEL",
        pricePerHour: 150000,
        venueId: venue1.id,
        isActive: true,
      },
      {
        name: "Court A - Badminton",
        type: "BADMINTON",
        pricePerHour: 90000,
        venueId: venue2.id,
        isActive: true,
      },
      {
        name: "Court B - Badminton",
        type: "BADMINTON",
        pricePerHour: 90000,
        venueId: venue2.id,
        isActive: true,
      },
      {
        name: "Court C - Padel",
        type: "PADEL",
        pricePerHour: 140000,
        venueId: venue2.id,
        isActive: true,
      },
    ],
  });

  console.log("✅ Created courts");

  const courts = await prisma.court.findMany();

  await prisma.booking.create({
    data: {
      userId: user.id,
      courtId: courts[0].id,
      date: new Date("2025-10-25"),
      startTime: "10:00",
      endTime: "12:00",
      duration: 2,
      totalPrice: 200000,
      status: "CONFIRMED",
      notes: "Please prepare the court before arrival",
    },
  });

  console.log("✅ Created sample booking");
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
