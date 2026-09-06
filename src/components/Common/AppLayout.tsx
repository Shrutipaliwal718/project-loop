import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import AppNavbar from "./AppNavbar";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#030912] text-white">
      <Sidebar />

      <div className="lg:pl-[250px]">
        <AppNavbar />

        <main className="min-h-[calc(100vh-58px)]">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
