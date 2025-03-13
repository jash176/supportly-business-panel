import { useParams } from 'wouter';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import AccountSettings from '@/components/settings/AccountSettings';

const SettingsPage = () => {
  const params = useParams();
  const section = params.section || 'account';
  
  // Render the appropriate settings section based on the route parameter
  const renderSettingsContent = () => {
    switch (section) {
      case 'account':
        return <AccountSettings />;
      // Additional settings sections would be implemented here
      default:
        return (
          <div className="flex-grow overflow-y-auto p-6 bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
              <p className="text-gray-500">
                This settings section is under development.
              </p>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="h-full flex">
      <SettingsSidebar activeSection={section} />
      {renderSettingsContent()}
    </div>
  );
};

export default SettingsPage;
