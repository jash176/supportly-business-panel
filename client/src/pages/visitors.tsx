import { useState } from 'react';
import VisitorsList from '@/components/visitors/VisitorsList';
import MapComponent from '@/components/visitors/MapComponent';
import VisitorStats from '@/components/visitors/VisitorStats';

const VisitorsPage = () => {
  const [selectedVisitorId, setSelectedVisitorId] = useState<string | null>(null);
  
  return (
    <div className="h-full flex">
      <VisitorsList 
        selectedVisitorId={selectedVisitorId}
        onVisitorSelect={setSelectedVisitorId}
      />
      
      <div className="flex-grow flex flex-col">
        <MapComponent 
          selectedVisitorId={selectedVisitorId}
          onVisitorSelect={setSelectedVisitorId}
        />
        <VisitorStats />
      </div>
    </div>
  );
};

export default VisitorsPage;
