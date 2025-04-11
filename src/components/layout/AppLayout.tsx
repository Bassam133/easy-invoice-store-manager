
import { ReactNode, useState } from "react";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <SideNav collapsed={collapsed} onToggle={toggleSidebar} />
      
      <div className={`flex-1 transition-all duration-300 ${collapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        <TopNav onMenuClick={toggleSidebar} />
        
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
