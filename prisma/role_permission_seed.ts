import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const permissions = [
  { code: "admin.access", name: "Access Admin Panel", group: "admin" },

  { code: "venues.create", name: "Create Venue", group: "venues" },
  { code: "venues.update", name: "Edit Venue", group: "venues" },
  { code: "venues.delete", name: "Delete Venue", group: "venues" },
  { code: "venues.view", name: "View Venue", group: "venues" },
  { code: "venues.view_all", name: "View All Venues", group: "venues" },

  { code: "courts.create", name: "Create Court", group: "courts" },
  { code: "courts.update", name: "Edit Court", group: "courts" },
  { code: "courts.delete", name: "Delete Court", group: "courts" },
  { code: "courts.view", name: "View Court", group: "courts" },

  { code: "bookings.view", name: "View Booking", group: "bookings" },
  { code: "bookings.create", name: "Create Booking", group: "bookings" },
  { code: "bookings.confirm", name: "Confirm Booking", group: "bookings" },
  { code: "bookings.cancel", name: "Cancel Booking", group: "bookings" },
  { code: "bookings.complete", name: "Complete Booking", group: "bookings" },

  { code: "users.view", name: "View Users", group: "users" },
  { code: "users.create", name: "Create User", group: "users" },
  { code: "users.update", name: "Edit User", group: "users" },
  { code: "users.delete", name: "Delete User", group: "users" },
  { code: "users.manage_roles", name: "Manage User Roles", group: "users" },

  { code: "roles.view", name: "View Roles", group: "roles" },
  { code: "roles.create", name: "Create Role", group: "roles" },
  { code: "roles.update", name: "Edit Role", group: "roles" },
  { code: "roles.delete", name: "Delete Role", group: "roles" },

  { code: "permissions.view", name: "View permissions", group: "permissions" },
  {
    code: "permissions.create",
    name: "Create Permission",
    group: "permissions",
  },
  { code: "permissions.update", name: "Edit Permission", group: "permissions" },
  {
    code: "permissions.delete",
    name: "Delete Permission",
    group: "permissions",
  },

  {
    code: "admin_requests.view",
    name: "View Admin Requests",
    group: "admin_requests",
  },
  {
    code: "admin_requests.approve",
    name: "Approve Admin Request",
    group: "admin_requests",
  },
  {
    code: "admin_requests.reject",
    name: "Reject Admin Request",
    group: "admin_requests",
  },

  { code: "reports.view", name: "View Reports", group: "reports" },
  { code: "reports.export", name: "Export Reports", group: "reports" },

  { code: "settings.view", name: "View Settings", group: "settings" },
  { code: "settings.update", name: "Edit Settings", group: "settings" },
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
      "admin.access",
      "venues.update",
      "venues.view",
      "courts.create",
      "courts.update",
      "courts.delete",
      "courts.view",
      "bookings.view",
      "bookings.confirm",
      "bookings.cancel",
      "bookings.complete",
      "users.view",
      "users.create",
      "users.update",
      "reports.view",
      "reports.export",
    ],
  },
  {
    name: "Cashier",
    description: "Handle bookings and payments",
    isSystem: true,
    permissions: [
      "admin.access",
      "venues.view",
      "courts.view",
      "bookings.view",
      "bookings.create",
      "bookings.confirm",
      "bookings.cancel",
      "bookings.complete",
    ],
  },
  {
    name: "User",
    description: "Regular user who can make bookings",
    isSystem: true,
    permissions: [],
  },
];

async function main() {
  console.log("🌱 Seeding roles and permissions...");

  console.log("🗑️ Clearing old data...");
  await prisma.rolePermission.deleteMany();
  await prisma.permission.deleteMany();

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

    console.log(
      `✅ Created role "${role.name}" with ${permissionCodes.length} permissions`
    );
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
