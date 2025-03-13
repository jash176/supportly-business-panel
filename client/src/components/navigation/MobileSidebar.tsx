import { Link, useLocation } from 'wouter';
import { X, Home, Users, MapPin, Settings } from 'lucide-react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    // Handle root path as inbox
    if (path === '/inbox' && (location === '/' || location === '/inbox')) {
      return true;
    }
    return location === path;
  };

  return (
    <div className={`fixed inset-0 z-20 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="bg-gray-800 w-64 h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="font-bold text-xl text-white">ChatDash</h1>
          <button 
            onClick={onClose}
            className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md"
            aria-label="Close menu"
          >
            <X className="text-2xl" />
          </button>
        </div>
        
        <nav className="mt-4">
          <ul>
            <li className="mb-2">
              <Link href="/inbox">
                <a className={`flex items-center px-4 py-3 ${isActive('/inbox') 
                  ? 'text-white bg-gray-700 border-l-4 border-indigo-500' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <Home className="text-xl mr-3" />
                  <span>Inbox</span>
                </a>
              </Link>
            </li>
            
            <li className="mb-2">
              <Link href="/contacts">
                <a className={`flex items-center px-4 py-3 ${isActive('/contacts') 
                  ? 'text-white bg-gray-700 border-l-4 border-indigo-500' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <Users className="text-xl mr-3" />
                  <span>Contacts</span>
                </a>
              </Link>
            </li>
            
            <li className="mb-2">
              <Link href="/visitors">
                <a className={`flex items-center px-4 py-3 ${isActive('/visitors') 
                  ? 'text-white bg-gray-700 border-l-4 border-indigo-500' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <MapPin className="text-xl mr-3" />
                  <span>Visitors</span>
                </a>
              </Link>
            </li>
            
            <li className="mb-2">
              <Link href="/settings">
                <a className={`flex items-center px-4 py-3 ${isActive('/settings') 
                  ? 'text-white bg-gray-700 border-l-4 border-indigo-500' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <Settings className="text-xl mr-3" />
                  <span>Settings</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div 
        onClick={onClose}
        className="bg-black opacity-50 absolute inset-0 -z-10"
        aria-hidden="true"
      ></div>
    </div>
  );
};

export default MobileSidebar;
