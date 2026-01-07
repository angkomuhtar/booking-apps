"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Icon } from "@iconify/react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url?: string;
    icon?: LucideIcon;
    roles?: string[];
    child?: { title: string; url: string }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => {
          if (!item.child) {
            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link
                    href={item?.url || "#"}
                    className='inline-flex items-center gap-2 w-full'>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          } else {
            return (
              <Collapsible key={index} className='group/collapsible'>
                <SidebarMenuItem>
                  <CollapsibleTrigger className='w-full' asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className='cursor-pointer'>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <Icon
                        icon='mdi:chevron-right'
                        className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90'
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.child?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
