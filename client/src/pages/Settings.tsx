import SettingsSidebar from '@/components/pages/settings/SettingsSidebar';
import SettingsContent from '@/components/pages/settings/SettingsContent';

const Settings: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col md:flex-row overflow-hidden h-full">
      <SettingsSidebar />
      <SettingsContent />
    </div>
  );
};

export default Settings;
