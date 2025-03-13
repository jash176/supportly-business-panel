import { Link, useLocation } from 'wouter';
import { Home, Users, MapPin, Settings, Search } from 'lucide-react';

const MainSidebar = () => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    // Handle root path as inbox
    if (path === '/inbox' && (location === '/' || location === '/inbox')) {
      return true;
    }
    return location === path;
  };

  return (
    <div className="hidden md:flex flex-col bg-gray-800 w-20 lg:w-64 text-white transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-center lg:justify-start p-4 h-16 border-b border-gray-700">
        <div className="text-2xl text-primary lg:mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg>
        </div>
        <h1 className="hidden lg:block font-bold text-xl">ChatDash</h1>
      </div>
      
      <nav className="flex-1 mt-4">
        <ul>
          <li className="mb-2">
            <Link href="/inbox">
              <a className={`flex items-center px-4 py-3 ${isActive('/inbox') 
                ? 'text-white bg-gray-700 border-l-4 border-indigo-500' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                <Home className="text-xl lg:mr-3" />
                <span className="hidden lg:block">Inbox</span>
              </a>
            </Link>
          </li>
          
          <li className="mb-2">
            <Link href="/contacts">
              <a className={`flex items-center px-4 py-3 ${isActive('/contacts') 
                ? 'text-white bg-gray-700 border-l-4 border-indigo-500' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                <Users className="text-xl lg:mr-3" />
                <span className="hidden lg:block">Contacts</span>
              </a>
            </Link>
          </li>
          
          <li className="mb-2">
            <Link href="/visitors">
              <a className={`flex items-center px-4 py-3 ${isActive('/visitors') 
                ? 'text-white bg-gray-700 border-l-4 border-indigo-500' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                <MapPin className="text-xl lg:mr-3" />
                <span className="hidden lg:block">Visitors</span>
              </a>
            </Link>
          </li>
          
          <li className="mb-2">
            <Link href="/settings">
              <a className={`flex items-center px-4 py-3 ${isActive('/settings') 
                ? 'text-white bg-gray-700 border-l-4 border-indigo-500' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                <Settings className="text-xl lg:mr-3" />
                <span className="hidden lg:block">Settings</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
          <Search className="text-xl lg:mr-3" />
          <span className="hidden lg:block">Search</span>
        </button>
      </div>
    </div>
  );
};

export default MainSidebar;
