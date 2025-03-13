import { Menu, Search, SidebarOpen } from 'lucide-react';

interface MobileHeaderProps {
  onMenuToggle: () => void;
  toggleSidebar: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuToggle, toggleSidebar }) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="flex items-center justify-between p-4">
        <button 
          onClick={onMenuToggle}
          className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
          aria-label="Open menu"
        >
          <Menu className="text-2xl" />
        </button>
        <h1 className="font-bold text-xl">ChatDash</h1>
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md hidden md:block"
            aria-label="Toggle sidebar"
          >
            <SidebarOpen className="text-xl" />
          </button>
          <button 
            className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
            aria-label="Search"
          >
            <Search className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
