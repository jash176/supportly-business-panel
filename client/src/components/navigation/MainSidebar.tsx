import { Link, useLocation } from 'wouter';
import { Home, Users, MapPin, Settings, Search, ChevronLeft, Menu } from 'lucide-react';
import UserProfileButton from './UserProfileButton';

interface MainSidebarProps {
  isVisible: boolean;
  toggleSidebar: () => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ isVisible, toggleSidebar }) => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    // Handle root path as inbox
    if (path === '/inbox' && (location === '/' || location === '/inbox')) {
      return true;
    }
    
    // Handle settings paths
    if (path === '/settings' && location.startsWith('/settings')) {
      return true;
    }
    
    return location === path;
  };

  return (
    <div className={`hidden md:flex flex-col bg-purple-900 text-white transition-all duration-300 ease-in-out h-screen z-30 
      ${isVisible ? 'w-20 lg:w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
      <div className="flex items-center justify-between p-4 h-16 border-b border-purple-800 bg-purple-950">
        <div className="flex items-center">
          <div className="text-2xl lg:mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/>
              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
            </svg>
          </div>
          <h1 className="hidden lg:block font-bold text-xl text-purple-100">Supportly</h1>
        </div>
        <button 
          onClick={toggleSidebar}
          className="text-purple-400 hover:text-purple-200"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      
      <nav className="flex-1 mt-4 overflow-y-auto">
        <ul>
          <li className="mb-2">
            <Link href="/inbox">
              <a className={`flex items-center px-4 py-3 ${isActive('/inbox') 
                ? 'text-white bg-purple-800 border-l-4 border-purple-400' 
                : 'text-purple-200 hover:bg-purple-800 hover:text-white'}`}>
                <Home className="text-xl lg:mr-3 text-purple-300" />
                <span className="hidden lg:block">Inbox</span>
              </a>
            </Link>
          </li>
          
          <li className="mb-2">
            <Link href="/contacts">
              <a className={`flex items-center px-4 py-3 ${isActive('/contacts') 
                ? 'text-white bg-purple-800 border-l-4 border-purple-400' 
                : 'text-purple-200 hover:bg-purple-800 hover:text-white'}`}>
                <Users className="text-xl lg:mr-3 text-purple-300" />
                <span className="hidden lg:block">Contacts</span>
              </a>
            </Link>
          </li>
          
          <li className="mb-2">
            <Link href="/visitors">
              <a className={`flex items-center px-4 py-3 ${isActive('/visitors') 
                ? 'text-white bg-purple-800 border-l-4 border-purple-400' 
                : 'text-purple-200 hover:bg-purple-800 hover:text-white'}`}>
                <MapPin className="text-xl lg:mr-3 text-purple-300" />
                <span className="hidden lg:block">Visitors</span>
              </a>
            </Link>
          </li>
          
          <li className="mb-2">
            <Link href="/settings">
              <a className={`flex items-center px-4 py-3 ${isActive('/settings') 
                ? 'text-white bg-purple-800 border-l-4 border-purple-400' 
                : 'text-purple-200 hover:bg-purple-800 hover:text-white'}`}>
                <Settings className="text-xl lg:mr-3 text-purple-300" />
                <span className="hidden lg:block">Settings</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-purple-800 space-y-2">
        <button className="flex items-center w-full px-4 py-2 text-purple-200 hover:bg-purple-800 hover:text-white rounded-md">
          <Search className="text-xl lg:mr-3 text-purple-300" />
          <span className="hidden lg:block">Search</span>
        </button>
        <UserProfileButton />
      </div>
    </div>
  );
};

export default MainSidebar;
