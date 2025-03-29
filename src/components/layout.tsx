import { useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppNavbar } from "./navbar/app-navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col px-4 pt-4">
          <AppNavbar />
          <main className="flex-1 pt-4">{children}</main>
        </div>
        <Toaster position="bottom-right" />
      </div>
    </SidebarProvider>
  );
}
