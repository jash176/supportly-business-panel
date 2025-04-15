import { useState, useEffect } from 'react';
import VisitorsPanel from '@/components/pages/visitors/VisitorsPanel';
import MapPanel from '@/components/pages/visitors/MapPanel';
import MobileAppDownload from '@/components/MobileAppDownload';
import { visitors } from '@/data/mockData';

const Visitors: React.FC = () => {
  const [activeVisitor, setActiveVisitor] = useState(visitors[0]);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  if (isMobile && location.pathname !== '/settings') {
    return <MobileAppDownload />;
  }
  
  return (
    <div className="flex flex-1 flex-col md:flex-row overflow-hidden h-full">
      <VisitorsPanel 
        visitors={visitors}
        activeVisitor={activeVisitor}
        onVisitorSelect={setActiveVisitor}
      />
      <MapPanel 
        visitors={visitors}
        activeVisitor={activeVisitor}
        onVisitorSelect={setActiveVisitor}
      />
    </div>
  );
};

export default Visitors;
