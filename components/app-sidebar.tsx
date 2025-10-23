"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Building2,
  Calendar,
  Users,
  Settings,
  GalleryVerticalEnd,
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
        roles: ["SUPER_ADMIN", "VENUE_ADMIN"],
      },
      {
        title: "Venues",
        url: "/admin/venues",
        icon: Building2,
        roles: ["SUPER_ADMIN", "VENUE_ADMIN"],
      },
      {
        title: "Bookings",
        url: "/admin/bookings",
        icon: Calendar,
        roles: ["SUPER_ADMIN", "VENUE_ADMIN"],
      },
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
        roles: ["SUPER_ADMIN"],
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
        roles: ["SUPER_ADMIN", "VENUE_ADMIN"],
      },
    ];

    if (!user?.role) return [];

    return allItems.filter((item) => item.roles.includes(user.role));
  }, [user?.role]);

  const teams = [
    {
      name: "Ayo Booking",
      logo: GalleryVerticalEnd,
      plan: user?.role === "SUPER_ADMIN" ? "Super Admin" : "Venue Admin",
    },
  ];

  console.log("user from Nav", user);

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
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
