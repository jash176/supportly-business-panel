import { Link, useLocation } from "wouter";
import { 
  Inbox, 
  Users, 
  Map, 
  Settings, 
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MainSidebarProps {
  currentPath: string;
}

const MainSidebar = ({ currentPath }: MainSidebarProps) => {
  const [location, setLocation] = useLocation();
  
  const isActive = (path: string) => {
    const cleanPath = currentPath === '/' ? '/inbox' : currentPath;
    return cleanPath.startsWith(path);
  };
  
  return (
    <div className="flex flex-col w-16 md:w-20 bg-neutral-dark text-white shrink-0 h-full transition-all">
      <div className="flex justify-center p-4 border-b border-gray-700">
        <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
          <Inbox className="text-white h-5 w-5" />
        </div>
      </div>
      
      <nav className="flex flex-col items-center py-6 space-y-8 flex-grow">
        {/* Inbox */}
        <Link href="/inbox">
          <a className="group relative flex flex-col items-center">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
              isActive('/inbox') ? "bg-primary/10" : "bg-gray-800 hover:bg-gray-700"
            )}>
              <Inbox className={cn(
                "text-xl",
                isActive('/inbox') ? "text-primary" : "text-gray-300"
              )} />
            </div>
            <span className="text-xs mt-1 text-gray-300">Inbox</span>
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </a>
        </Link>
        
        {/* Contacts */}
        <Link href="/contacts">
          <a className="group relative flex flex-col items-center">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
              isActive('/contacts') ? "bg-primary/10" : "bg-gray-800 hover:bg-gray-700"
            )}>
              <Users className={cn(
                "text-xl",
                isActive('/contacts') ? "text-primary" : "text-gray-300"
              )} />
            </div>
            <span className="text-xs mt-1 text-gray-300">Contacts</span>
          </a>
        </Link>
        
        {/* Visitors */}
        <Link href="/visitors">
          <a className="group relative flex flex-col items-center">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
              isActive('/visitors') ? "bg-primary/10" : "bg-gray-800 hover:bg-gray-700"
            )}>
              <Map className={cn(
                "text-xl",
                isActive('/visitors') ? "text-primary" : "text-gray-300"
              )} />
            </div>
            <span className="text-xs mt-1 text-gray-300">Visitors</span>
          </a>
        </Link>
        
        {/* Settings */}
        <Link href="/settings">
          <a className="group relative flex flex-col items-center">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
              isActive('/settings') ? "bg-primary/10" : "bg-gray-800 hover:bg-gray-700"
            )}>
              <Settings className={cn(
                "text-xl",
                isActive('/settings') ? "text-primary" : "text-gray-300"
              )} />
            </div>
            <span className="text-xs mt-1 text-gray-300">Settings</span>
          </a>
        </Link>
        
        {/* Search (can expand to search component) */}
        <Link href="/search">
          <a className="group relative flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
              <Search className="text-xl text-gray-300" />
            </div>
            <span className="text-xs mt-1 text-gray-300">Search</span>
          </a>
        </Link>
      </nav>
      
      <div className="p-3 border-t border-gray-700 flex justify-center">
        <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User profile" 
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
