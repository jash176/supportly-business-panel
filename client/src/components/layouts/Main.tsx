import { useState, useEffect } from 'react';
import MainSidebar from '../navigation/MainSidebar';
import MobileHeader from '../navigation/MobileHeader';
import MobileSidebar from '../navigation/MobileSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Desktop Sidebar */}
      <MainSidebar />
      
      {/* Mobile Header */}
      <MobileHeader onMenuToggle={toggleMobileMenu} />
      
      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden pt-16 md:pt-0">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
