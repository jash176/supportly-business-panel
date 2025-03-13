import React from 'react';
import MainSidebar from "@/components/MainSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

const AppLayout = ({ children, currentPath }: AppLayoutProps) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <MainSidebar currentPath={currentPath} />
      <main className="flex-grow overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
