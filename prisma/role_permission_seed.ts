import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const permissions = [
  { code: "venue.create", name: "Create Venue", group: "venue" },
  { code: "venue.edit", name: "Edit Venue", group: "venue" },
  { code: "venue.delete", name: "Delete Venue", group: "venue" },
  { code: "venue.view", name: "View Venue", group: "venue" },
  { code: "venue.view_all", name: "View All Venues", group: "venue" },

  { code: "court.create", name: "Create Court", group: "court" },
  { code: "court.edit", name: "Edit Court", group: "court" },
  { code: "court.delete", name: "Delete Court", group: "court" },
  { code: "court.view", name: "View Court", group: "court" },

  { code: "booking.view", name: "View Booking", group: "booking" },
  { code: "booking.create", name: "Create Booking", group: "booking" },
  { code: "booking.confirm", name: "Confirm Booking", group: "booking" },
  { code: "booking.cancel", name: "Cancel Booking", group: "booking" },
  { code: "booking.complete", name: "Complete Booking", group: "booking" },

  { code: "user.view", name: "View Users", group: "user" },
  { code: "user.create", name: "Create User", group: "user" },
  { code: "user.edit", name: "Edit User", group: "user" },
  { code: "user.delete", name: "Delete User", group: "user" },
  { code: "user.manage_roles", name: "Manage User Roles", group: "user" },

  { code: "role.view", name: "View Roles", group: "role" },
  { code: "role.create", name: "Create Role", group: "role" },
  { code: "role.edit", name: "Edit Role", group: "role" },
  { code: "role.delete", name: "Delete Role", group: "role" },

  { code: "admin_request.view", name: "View Admin Requests", group: "admin_request" },
  { code: "admin_request.approve", name: "Approve Admin Request", group: "admin_request" },
  { code: "admin_request.reject", name: "Reject Admin Request", group: "admin_request" },

  { code: "report.view", name: "View Reports", group: "report" },
  { code: "report.export", name: "Export Reports", group: "report" },

  { code: "settings.view", name: "View Settings", group: "settings" },
  { code: "settings.edit", name: "Edit Settings", group: "settings" },
];

const roles = [
  {
    name: "Super Admin",
    description: "Full access to all features and all venues",
    isSystem: true,
    permissions: permissions.map((p) => p.code),
  },
  {
    name: "Venue Admin",
    description: "Manage own venue, courts, bookings, and staff",
    isSystem: true,
    permissions: [
      "venue.edit",
      "venue.view",
      "court.create",
      "court.edit",
      "court.delete",
      "court.view",
      "booking.view",
      "booking.confirm",
      "booking.cancel",
      "booking.complete",
      "user.view",
      "user.create",
      "user.edit",
      "report.view",
      "report.export",
    ],
  },
  {
    name: "Cashier",
    description: "Handle bookings and payments",
    isSystem: true,
    permissions: [
      "venue.view",
      "court.view",
      "booking.view",
      "booking.create",
      "booking.confirm",
      "booking.cancel",
      "booking.complete",
    ],
  },
  {
    name: "User",
    description: "Regular user who can make bookings",
    isSystem: true,
    permissions: [
      "venue.view",
      "court.view",
      "booking.view",
      "booking.create",
      "booking.cancel",
    ],
  },
];

async function main() {
  console.log("🌱 Seeding roles and permissions...");

  console.log("📝 Creating permissions...");
  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { code: permission.code },
      update: { name: permission.name, group: permission.group },
      create: permission,
    });
  }
  console.log(`✅ Created ${permissions.length} permissions`);

  console.log("👥 Creating roles...");
  for (const role of roles) {
    const { permissions: permissionCodes, ...roleData } = role;

    const createdRole = await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: roleData,
    });

    await prisma.rolePermission.deleteMany({
      where: { roleId: createdRole.id },
    });

    const permissionRecords = await prisma.permission.findMany({
      where: { code: { in: permissionCodes } },
    });

    for (const permission of permissionRecords) {
      await prisma.rolePermission.create({
        data: {
          roleId: createdRole.id,
          permissionId: permission.id,
        },
      });
    }

    console.log(`✅ Created role "${role.name}" with ${permissionCodes.length} permissions`);
  }

  console.log("🎉 Roles and permissions seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding roles and permissions:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
