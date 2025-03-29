import { useEffect, useState, ComponentProps } from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  DollarSign,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  PanelLeftOpen,
  PanelRightOpen,
  PieChart,
  Plus,
  Settings,
  Settings2,
  SquareTerminal,
  CreditCard,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/nav-user";
import { SpaceSwitcher } from "@/components/sidebar/space-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ChartBar } from "lucide-react";
import { User, Palette, Bell, Monitor } from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      path: "/",
      icon: Home,
    },
    {
      title: "Transacciones",
      path: "/transactions",
      icon: DollarSign,
    },
    {
      title: "Tarjetas",
      path: "/cards",
      icon: CreditCard,
    },
    {
      title: "Estadísticas",
      path: "/charts",
      icon: ChartBar,
    },
    // {
    //   title: "Nueva transacción",
    //   path: "/new-transaction",
    //   icon: Plus,
    // },
    {
      title: "Settings",
      icon: Settings,
      items: [
        {
          title: "Profile",
          path: "/settings/profile",
          icon: User,
        },
        {
          title: "Account",
          path: "/settings/account",
          icon: Settings,
        },
        {
          title: "Appearance",
          path: "/settings/appearance",
          icon: Palette,
        },
        {
          title: "Notifications",
          path: "/settings/notifications",
          icon: Bell,
        },
        {
          title: "Display",
          path: "/settings/display",
          icon: Monitor,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SpaceSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
