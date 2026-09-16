"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import AppNavbar from "./AppNavbar";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030912] text-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-[250px]">
        <AppNavbar
          onMenuClick={() => setSidebarOpen((open) => !open)}
          sidebarOpen={sidebarOpen}
        />

        <main className="min-h-[calc(100vh-58px)]">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
