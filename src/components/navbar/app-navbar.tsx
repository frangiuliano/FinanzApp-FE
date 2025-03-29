import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "../ui/separator";

export function AppNavbar() {
  const { toggleSidebar, open } = useSidebar();
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-4">
      <TooltipProvider delayDuration={300} skipDelayDuration={200}>
        <Tooltip>
          <TooltipTrigger>
            {open ? (
              <PanelRightOpen
                onClick={toggleSidebar}
                className="cursor-pointer h-4 w-4 hover:text-accent-foreground"
              />
            ) : (
              <PanelLeftOpen
                onClick={toggleSidebar}
                className="cursor-pointer h-4 w-4 hover:text-accent-foreground"
              />
            )}
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10}>
            <p>{open ? "Cerrar menú" : "Abrir menú"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="vertical" />

      <Breadcrumb>
        <BreadcrumbList>
          {pathname === "/" ? (
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            segments.map((segment, index) => (
              <BreadcrumbItem key={segment}>
                {index > 0 && <BreadcrumbSeparator />}
                {index === segments.length - 1 ? (
                  <BreadcrumbPage className="capitalize">
                    {segment.replace(/-/g, " ")}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={`/${segments.slice(0, index + 1).join("/")}`}
                    className="capitalize"
                  >
                    {segment.replace(/-/g, " ")}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            ))
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
