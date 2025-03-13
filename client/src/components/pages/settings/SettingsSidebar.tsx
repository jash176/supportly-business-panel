import { useLocation, Link } from 'wouter';
import { User, Clock, Bell, Lock, Palette, Building, Users, Trash2 } from 'lucide-react';

interface SettingsSectionProps {
  title: string;
  items: {
    id: string;
    label: string;
    icon: React.ReactNode;
    path: string;
    isDanger?: boolean;
  }[];
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, items }) => {
  const [location] = useLocation();

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => {
          const isActive = location === item.path;
          const baseClasses = "flex items-center px-4 py-3 rounded-md";
          const activeClasses = "text-gray-900 bg-gray-100";
          const inactiveClasses = item.isDanger 
            ? "text-red-600 hover:bg-red-50" 
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900";
          
          return (
            <li key={item.id}>
              <Link href={item.path}>
                <a className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const SettingsSidebar: React.FC = () => {
  const accountSettings = [
    { 
      id: 'account-info', 
      label: 'Account Information', 
      icon: <User className="text-lg" />,
      path: '/settings'  // Default settings page
    },
    { 
      id: 'availability', 
      label: 'Availability', 
      icon: <Clock className="text-lg" />,
      path: '/settings/availability'
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: <Bell className="text-lg" />,
      path: '/settings/notifications'
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: <Lock className="text-lg" />,
      path: '/settings/security'
    },
    { 
      id: 'interface', 
      label: 'Interface', 
      icon: <Palette className="text-lg" />,
      path: '/settings/interface'
    }
  ];

  const workspaceSettings = [
    { 
      id: 'workspace-info', 
      label: 'Workspace Information', 
      icon: <Building className="text-lg" />,
      path: '/settings/workspace'
    },
    { 
      id: 'agents-teams', 
      label: 'Agents & Teams', 
      icon: <Users className="text-lg" />,
      path: '/settings/teams'
    },
    { 
      id: 'danger-zone', 
      label: 'Danger Zone', 
      icon: <Trash2 className="text-lg" />,
      path: '/settings/danger',
      isDanger: true
    }
  ];

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 flex-shrink-0 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>
      
      <div className="p-4">
        <SettingsSection title="Account Settings" items={accountSettings} />
        <SettingsSection title="Workspace Settings" items={workspaceSettings} />
      </div>
    </div>
  );
};

export default SettingsSidebar;
