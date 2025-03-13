import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import MainSidebar from '../navigation/MainSidebar';
import MobileHeader from '../navigation/MobileHeader';
import MobileSidebar from '../navigation/MobileSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        // Show sidebar by default on larger screens
        if (window.innerWidth >= 1024) {
          setSidebarVisible(true);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Desktop Sidebar */}
      <MainSidebar isVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
      
      {/* Mobile Header */}
      <MobileHeader onMenuToggle={toggleMobileMenu} toggleSidebar={toggleSidebar} />
      
      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Sidebar Toggle Button for larger screens when sidebar is hidden */}
      {!sidebarVisible && (
        <button 
          onClick={toggleSidebar}
          className="hidden md:flex fixed left-4 top-4 z-20 items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
          aria-label="Show sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      )}
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col md:flex-row overflow-hidden pt-16 md:pt-0 ${!sidebarVisible ? 'md:ml-0' : ''} transition-all duration-300 ease-in-out`}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
