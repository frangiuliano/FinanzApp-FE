import { ChevronRight, type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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

interface NavItem {
  title: string;
  path?: string;
  icon?: LucideIcon;
  items?: NavItem[];
}

export function NavMain({ items }: { items: NavItem[] }) {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menú</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.items) {
            return (
              <Collapsible key={item.title}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="w-full justify-between group">
                    <div className="flex items-center">
                      {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                      {item.title}
                    </div>
                    <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {item.items.map((subItem) => (
                    <Link key={subItem.path} to={subItem.path || "#"}>
                      <SidebarMenuButton
                        className={`pl-8 ${
                          pathname === subItem.path
                            ? "bg-accent text-accent-foreground"
                            : ""
                        }`}
                      >
                        {subItem.icon && (
                          <subItem.icon className="h-4 w-4 mr-2" />
                        )}
                        {subItem.title}
                      </SidebarMenuButton>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );
          }

          return (
            <Link key={item.path} to={item.path || "#"}>
              <SidebarMenuButton
                className={`${
                  pathname === item.path
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                {item.title}
              </SidebarMenuButton>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
