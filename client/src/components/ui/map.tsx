import { useEffect, useRef } from 'react';
import { Visitor } from '@/data/mockData';

interface MapProps {
  visitors: Visitor[];
  onMarkerClick?: (visitor: Visitor) => void;
}

const WorldMap: React.FC<MapProps> = ({ visitors, onMarkerClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  // This is a simplified map component since we're not using a real map library
  // In a real application, you would integrate with Leaflet, Google Maps, or similar
  
  useEffect(() => {
    // This would be where we'd initialize the map in a real application
    const initializeMap = () => {
      if (!mapRef.current) return;
      
      // For demo purposes, we're just showing a static map with markers
      // In a real app, this would be a proper map initialization
    };
    
    initializeMap();
  }, []);
  
  return (
    <div ref={mapRef} className="h-full bg-gray-100 relative">
      {/* Simulated world map background */}
      <div className="w-full h-full bg-blue-50 opacity-50"></div>
      
      {/* Map markers */}
      {visitors.map((visitor) => (
        <div 
          key={visitor.id}
          className="absolute" 
          style={{ 
            // Calculate position based on lat/lng - this is simplified
            top: `${(90 + visitor.location.coordinates.lat) / 1.8}%`,
            left: `${(180 + visitor.location.coordinates.lng) / 3.6}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onClick={() => onMarkerClick && onMarkerClick(visitor)}
        >
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-ping opacity-75 absolute"></div>
          <div className="w-4 h-4 bg-indigo-500 rounded-full relative">
            <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-md text-xs hidden group-hover:block">
              {visitor.name} - {visitor.location.city}, {visitor.location.country}
            </div>
          </div>
        </div>
      ))}
      
      {/* Info tooltip */}
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-md shadow-md">
        <h4 className="font-semibold text-sm mb-2">Visitor Statistics</h4>
        <ul className="text-xs space-y-1">
          <li className="flex justify-between">
            <span>North America</span>
            <span className="font-medium">42%</span>
          </li>
          <li className="flex justify-between">
            <span>Europe</span>
            <span className="font-medium">28%</span>
          </li>
          <li className="flex justify-between">
            <span>Asia</span>
            <span className="font-medium">18%</span>
          </li>
          <li className="flex justify-between">
            <span>Other</span>
            <span className="font-medium">12%</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WorldMap;
