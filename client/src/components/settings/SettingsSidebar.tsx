import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';

interface SettingsSidebarProps {
  activeSection: string;
}

const SettingsSidebar = ({ activeSection }: SettingsSidebarProps) => {
  const isActive = (section: string) => activeSection === section;
  
  return (
    <div className="w-64 border-r border-gray-200 flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Settings</h2>
        <p className="text-sm text-gray-500">Manage your account and workspace</p>
      </div>
      
      <div className="overflow-y-auto flex-grow scrollbar-hide p-2">
        {/* Account Settings */}
        <div className="mb-2">
          <div className="px-4 py-2 text-sm font-medium text-gray-700">Account Settings</div>
          
          <div className="space-y-1">
            <Link href="/settings/account">
              <a className={cn(
                "settings-nav-item block px-4 py-2 text-sm rounded-r-md",
                isActive('account') 
                  ? "active bg-blue-50 text-primary border-l-2 border-primary" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}>
                Account Information
              </a>
            </Link>
            <Link href="/settings/availability">
              <a className={cn(
                "settings-nav-item block px-4 py-2 text-sm rounded-r-md",
                isActive('availability') 
                  ? "active bg-blue-50 text-primary border-l-2 border-primary" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}>
                Availability
              </a>
            </Link>
            <Link href="/settings/notifications">
              <a className={cn(
                "settings-nav-item block px-4 py-2 text-sm rounded-r-md",
                isActive('notifications') 
                  ? "active bg-blue-50 text-primary border-l-2 border-primary" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}>
                Notifications
              </a>
            </Link>
            <Link href="/settings/security">
              <a className={cn(
                "settings-nav-item block px-4 py-2 text-sm rounded-r-md",
                isActive('security') 
                  ? "active bg-blue-50 text-primary border-l-2 border-primary" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}>
                Security
              </a>
            </Link>
            <Link href="/settings/interface">
              <a className={cn(
                "settings-nav-item block px-4 py-2 text-sm rounded-r-md",
                isActive('interface') 
                  ? "active bg-blue-50 text-primary border-l-2 border-primary" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}>
                Interface
              </a>
            </Link>
          </div>
        </div>
        
        {/* Workspace Settings */}
        <div className="mb-2">
          <div className="px-4 py-2 text-sm font-medium text-gray-700">Workspace Settings</div>
          
          <div className="space-y-1">
            <Link href="/settings/workspace">
              <a className={cn(
                "settings-nav-item block px-4 py-2 text-sm rounded-r-md",
                isActive('workspace') 
                  ? "active bg-blue-50 text-primary border-l-2 border-primary" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}>
                Workspace Information
              </a>
            </Link>
            <Link href="/settings/agents">
              <a className={cn(
                "settings-nav-item block px-4 py-2 text-sm rounded-r-md",
                isActive('agents') 
                  ? "active bg-blue-50 text-primary border-l-2 border-primary" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}>
                Agents & Teams
              </a>
            </Link>
            <Link href="/settings/danger">
              <a className={cn(
                "settings-nav-item block px-4 py-2 text-sm rounded-r-md",
                isActive('danger') 
                  ? "active bg-red-50 text-red-600 border-l-2 border-red-600" 
                  : "text-red-600 hover:bg-red-50"
              )}>
                Danger Zone
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
