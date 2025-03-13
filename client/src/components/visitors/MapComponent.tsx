import { useEffect, useRef } from 'react';
import { Filter } from 'lucide-react';
import { visitors, locationBreakdown } from '@/lib/mockData';

interface MapComponentProps {
  selectedVisitorId: string | null;
  onVisitorSelect: (visitorId: string) => void;
}

declare global {
  interface Window {
    L: any;
  }
}

const MapComponent = ({ selectedVisitorId, onVisitorSelect }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  
  useEffect(() => {
    // Initialize map
    if (mapRef.current && !leafletMap.current) {
      const L = window.L;
      
      // Create the map
      leafletMap.current = L.map(mapRef.current).setView([20, 0], 2);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap.current);
      
      // Add markers for each visitor
      visitors.forEach(visitor => {
        const marker = L.marker(visitor.coordinates)
          .addTo(leafletMap.current)
          .bindPopup(`
            <div class="p-2">
              <div class="font-medium">${visitor.name}</div>
              <div class="text-xs text-gray-500">${visitor.location}</div>
              <div class="text-xs mt-1">${visitor.activityStatus}</div>
            </div>
          `);
          
        marker.on('click', () => {
          onVisitorSelect(visitor.id);
        });
        
        markersRef.current.push({ id: visitor.id, marker });
      });
    }
    
    // Highlight selected visitor marker
    if (selectedVisitorId && leafletMap.current) {
      const selectedMarker = markersRef.current.find(m => m.id === selectedVisitorId);
      if (selectedMarker) {
        selectedMarker.marker.openPopup();
        
        // Pan to the marker
        const visitor = visitors.find(v => v.id === selectedVisitorId);
        if (visitor) {
          leafletMap.current.setView(visitor.coordinates, 5);
        }
      }
    }
    
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [selectedVisitorId, onVisitorSelect]);
  
  return (
    <div className="flex-grow flex flex-col h-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Visitor Locations</h1>
        <div className="flex space-x-2">
          <select className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>All time</option>
          </select>
          <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center">
            <Filter className="mr-1 h-4 w-4" />
            Filter
          </button>
        </div>
      </div>
      
      <div className="flex-grow bg-white rounded-lg shadow relative overflow-hidden">
        {/* Map Container */}
        <div ref={mapRef} className="w-full h-full"></div>
        
        {/* Map overlay elements */}
        <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md z-[1000]">
          <h3 className="text-sm font-medium mb-1">Visitors Overview</h3>
          <div className="space-y-1">
            {locationBreakdown.map((location, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span>{location.country}</span>
                <span className="font-medium">{location.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
