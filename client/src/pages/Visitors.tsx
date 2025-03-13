import { useState } from 'react';
import VisitorsPanel from '@/components/pages/visitors/VisitorsPanel';
import MapPanel from '@/components/pages/visitors/MapPanel';
import { visitors } from '@/data/mockData';

const Visitors: React.FC = () => {
  const [activeVisitor, setActiveVisitor] = useState(visitors[0]);
  
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
