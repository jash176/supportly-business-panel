import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import SettingsSidebar from '@/components/pages/settings/SettingsSidebar';
import SettingsContent from '@/components/pages/settings/SettingsContent';

type ViewState = 'sidebar' | 'content';

const Settings: React.FC = () => {
  const [location] = useLocation();
  const [mobileView, setMobileView] = useState<ViewState>('sidebar');
  
  // Switch to content view when a settings option is selected on mobile
  useEffect(() => {
    if (window.innerWidth < 768 && location !== '/settings') {
      setMobileView('content');
    }
  }, [location]);

  // Handle back button press on mobile
  const handleBackToSidebar = () => {
    setMobileView('sidebar');
  };

  // Reset view state when resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileView('sidebar');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-1 flex-col md:flex-row overflow-hidden h-full">
      {/* Settings sidebar - always visible on desktop, conditionally on mobile */}
      <div className={`${mobileView === 'sidebar' ? 'block' : 'hidden'} md:block md:w-64 md:flex-none`}>
        <SettingsSidebar />
      </div>
      
      {/* Settings content - always visible on desktop, conditionally on mobile */}
      <div className={`${mobileView === 'content' ? 'block' : 'hidden md:block'} flex-1 relative`}>
        {/* Mobile back button */}
        <button 
          onClick={handleBackToSidebar}
          className="md:hidden absolute top-4 left-4 z-10 bg-white rounded-full p-1 shadow-md"
          aria-label="Back to settings"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        <SettingsContent />
      </div>
    </div>
  );
};

export default Settings;
