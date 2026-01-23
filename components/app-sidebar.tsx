"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Building2,
  Calendar,
  Users,
  Settings,
  GalleryVerticalEnd,
  Computer,
  InspectionPanel,
  FileBox,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: {
    name: string;
    email: string;
    id: string;
    role: string;
    avatar?: string | undefined;
    [key: string]: unknown;
  };
};
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const navItems = React.useMemo(() => {
    const allItems = [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
        roles: ["Super Admin", "Venue Admin"],
      },
      {
        title: "Cashier",
        url: "/admin/cashier",
        icon: Computer,
        roles: ["Super Admin", "Venue Admin", "Cashier"],
      },
      {
        title: "Venues",
        url: "/admin/venues",
        icon: Building2,
        roles: ["Super Admin", "Venue Admin"],
      },
      {
        title: "Courts",
        url: "/admin/courts",
        icon: InspectionPanel,
        roles: ["Super Admin", "Venue Admin"],
      },
      {
        title: "Products",
        url: "/admin/products",
        icon: FileBox,
        roles: ["Super Admin", "Venue Admin"],
      },
      {
        title: "Bookings",
        url: "/admin/orders",
        icon: Calendar,
        roles: ["Super Admin", "Venue Admin", "Cashier"],
      },
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
        roles: ["Super Admin"],
      },
      {
        title: "Settings",
        icon: Settings,
        roles: ["Super Admin", "Venue Admin"],
        child: [
          {
            title: "Roles",
            url: "/admin/settings/roles",
            roles: ["Super Admin"],
          },
          {
            title: "Permissions",
            url: "/admin/settings/permissions",
            roles: ["Super Admin"],
          },
        ],
      },
    ];

    if (!user?.role) return [];

    return allItems.filter((item) => item.roles.includes(user.role));
  }, [user?.role]);

  const teams = [
    {
      name: "Ayo Booking",
      logo: GalleryVerticalEnd,
      plan: user?.role,
    },
  ];

  return (
    <Sidebar collapsible='icon' {...props} className='bg-white'>
      <SidebarHeader>
        {" "}
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user || { name: "User", email: "user@email.com" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
